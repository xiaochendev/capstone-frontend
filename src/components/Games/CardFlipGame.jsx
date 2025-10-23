import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../utilities/apiService.mjs'; 
import { useAuth } from '../../context/authContext/authContext'; // for token or guestID
import style from './Game.module.css';


// const CARD_PAIRS = 6;           // num of pairs in the game
const EMOJI_PAIRS = ['👽', '🤡', '👻', '👿', '🍎', '🍌', '🍇', '🍓', '🍍', '🥝'];
const CARD_PAIRS = EMOJI_PAIRS.length;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create pairs of cards numbered 1 to CARD_PAIRS, shuffle them
function createCards() {
  const cards = [];
  // for (let i = 1; i <= CARD_PAIRS; i++) {
  //   // id: unique identifier
  //   // pairId: to match with its twin
  //   // flipped: is face-up?
  //   // matched: is it already matched?
  //   cards.push({ id: i * 2 - 1, pairId: i, flipped: false, matched: false });
  //   cards.push({ id: i * 2, pairId: i, flipped: false, matched: false });
  // }
    EMOJI_PAIRS.forEach((emoji, index) => {
    cards.push({ id: index * 2, pairId: index, emoji, flipped: false, matched: false });
    cards.push({ id: index * 2 + 1, pairId: index, emoji, flipped: false, matched: false });
    });
    return shuffleArray(cards);
}

export default function CardFlipGame() {
  const [cards, setCards] = useState(createCards());        // tracks: The cards and their statuses
  const [flippedCards, setFlippedCards] = useState([]);     // currently flipped cards (up to 2 at once)
  const [matchedCount, setMatchedCount] = useState(0);      // Match progress.
  const [startTime, setStartTime] = useState(null);         // timer info     null: no game has started yet
  const [elapsedTime, setElapsedTime] = useState(0);                        //   0: no time has passed yet
  const [gameStarted, setGameStarted] = useState(false);    // gameStarted/Ended status
  const [gameEnded, setGameEnded] = useState(false);
  const timeRef = useRef(null);                             // store the timer interval ID (returned by setInterval()
  const nav = useNavigate();
  const { user } = useAuth();                               // get token or guest info and user info

  // console.log("User from auth context:", user);

  // check if user is guest
  const isGuest = user?.isGuest === true;

  const gameName = 'Card Flip Game';
  const gameType = 'memory';
  const gameDescription = 'Rules: Cards remained fliped when matching, Win till all cards matched';


  // cards matching logic
  useEffect(() => {
    // once two cards are flipped
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      // if pairId match
      if (first.pairId === second.pairId) {
        // mark both matched
        setCards(prev =>                      // current cards array before the update by using functional form of setState, prev refers to previous(current) val of state 
          prev.map(card =>
            // find cards that matched and fliped ones and marked em as matched
            card.pairId === first.pairId ? { ...card, matched: true } : card
          )
        );
        setMatchedCount(prev => prev + 1);
        setFlippedCards([]);
      } else {
        // else, flip back after 1 sec
        setTimeout(() => {
          setCards(prev =>          
            prev.map(card =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);


  // timer logic
  useEffect(()=> {
    // timer starts on first card flip
    if (gameStarted && startTime) {
      // update every second using setInterval()
        timeRef.current = setInterval(()=> {
          setElapsedTime(() => 
            Math.floor( (Date.now() - startTime) / 1000 ));
        }, 1000);
    }
    // timer stop cleanly, clear references
    return () => clearInterval(timeRef.current);
  }, [gameStarted, startTime]);


   // Game ends logic
  useEffect(() => {
    // when all pairs are matched
    if (matchedCount === CARD_PAIRS) {
      // game ends
      setGameEnded(true);

      // Set final elapsed time
      const finalTime = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(finalTime);
      
      // timer stops
      clearInterval(timeRef.current);
      
      // result is submitted
      submitResult(finalTime);
    }
  }, [matchedCount]);


  function handleCardClick(card) {
    // ONLY flip up to 2 cards at once
    if (flippedCards.length < 2 && !card.flipped && !card.matched) {

      // start timer on first interaction
      if(!gameStarted) {
        setStartTime(Date.now());
        setGameStarted(true);
      }

      // updates cards states
      setCards(prev =>
        prev.map(c => (c.id === card.id ? { ...c, flipped: true } : c))
      );

      // updates flippedCards states
      setFlippedCards(prev => [...prev, { ...card, flipped: true }]);
    }
  }

 
  async function submitResult(timeToComplete, isCompleted=true) {
    try {
      // First, fetch the game ID from backend by name (you can cache this somewhere instead)
      const gameRes = await apiService.getGameByName(gameName);
      const gameId = gameRes._id;
      
      // choose correct user ID: ._id for registered users, .id for guests
      const userId = user?._id || user?.id;

      // console.log("Submitting game session for userId:", userId);

      if (!userId) {
        throw new Error("No userId found for submitting game session");
      }

      // POST to backend gameSession w game stats
      await apiService.submitGameSession({
        userId,
        gameId,
        // score: matchedCount, // or any scoring logic
        timeToComplete,
        isCompleted,
      });
      alert('Game result submitted!');
    } catch (err) { 
      console.error('Failed to submit game result', err);
    }
  }

  // handler for when guest want to register
  function handleRegisterClick(){
    // Navigate to /auth/login with query param to show register form by default
    nav('/auth/login?mode=register');
  }

  return ( 
    <div >
      <h2>{gameName}</h2> 
      <p>{gameDescription}</p> 
      <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 80px)', gap: '10px', justifyContent: 'center' }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            style={{
              width: 80,
              height: 80,
              backgroundColor: card.flipped || card.matched ? '#fff' : '#333',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2rem',
              color: card.flipped || card.matched ? '#000' : '#333',
              cursor: 'pointer',
              border: card.matched ? '2px solid green' : '1px solid #000',
            }}
          >
            {/* {card.flipped || card.matched ? card.pairId : ''} */}
            {card.flipped || card.matched ? card.emoji : ''}
          </div>
        ))}
      </div>

      {gameEnded ? (
        <div>
          <p> 🚀 Game completed in {elapsedTime}s</p>
          <button className={style.btn}
            onClick={() => {
            clearInterval(timeRef.current);
            setCards(createCards());
            setMatchedCount(0);
            setFlippedCards([]);
            setGameStarted(false);
            setGameEnded(false);
            setElapsedTime(0);
            setStartTime(null);
          }}>
            🔁 Play Again
          </button>
        </div>
      ): 
      ( 
        <div>
          <p><strong>🕛 Time: {elapsedTime} s</strong></p>
            <button className={style.btn} 
              onClick={() => {
              if (gameStarted && !gameEnded) {
                const timeToComplete = (Date.now() - startTime) / 1000;
                submitResult(timeToComplete, false);
              }
              // Reset game state
              setCards(createCards());
              setMatchedCount(0);
              setFlippedCards([]);
              setGameStarted(false);
              setGameEnded(false);
              setElapsedTime(0);
              setStartTime(null);
            }}>
              ❌ Quit Game
            </button>
        </div>
        )
      }
      {isGuest && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>You are playing as a GUEST!!! Save before losing it?</strong></p>
          <button className={style.btn} onClick={handleRegisterClick}>Register Now</button>
        </div>
      )}

    </div>
  );
}
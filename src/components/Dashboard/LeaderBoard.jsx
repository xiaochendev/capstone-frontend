import { useEffect, useState } from "react";
import apiService from "../../utilities/apiService.mjs";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiService.getGlobalLeaderboard()
      .then(setLeaderboard)
      .catch(err => {
        console.error("Failed to fetch leaderboard:", err);
        setError("Could not load leaderboard.");
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="leaderboard">
      <h3>🏆 Top 10 </h3>
      <ol>
        {leaderboard.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.username}</strong> - ⏱ {entry.time}s - {entry.gameName}
          </li>
        ))}
      </ol>
    </div>
  );
}

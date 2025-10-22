import axios from "axios";
axios.defaults.withCredentials = true; // ✅ must include this in requests that send or expect cookies, *important for cookies to persist across origins
// import { Cookies } from "react-cookie";
// const cookies = new Cookies();


let baseURL = "http://localhost:3000";

// getUser using token from cookies
async function getUser() {
  const res = await axios.get(`${baseURL}/auth`);
  return res.data;
}

// async function startAsGuest() {
//   let res = await axios.post(`${baseURL}/auth/guest`);
//   // const { token, user } = res.data;
  
//   // ✅ Save and set the token for authMiddleware to validate
//   cookies.set('token', res.data.token, {
//     path:'/',
//     maxAge: 86400000,    // 1 day in sec
//     sameSite: 'strict',
//     secure: false,      // false in devlopment
//   })   

//   return res.data     // return token and user
//   // return user;      // return user
// }

async function getGameByName(name) {
  const res = await axios.get(`${baseURL}/games`, {
    params: { name },
  });

  if (!res.data || res.data.length === 0) {
    throw new Error(`Game with name "${name}" not found`);
  }

  return res.data[0]; // return the first match
}

async function submitGameSession({userId, gameId, timeToComplete, isCompleted=false}) {
    // POST to /games/:gameId/submit
    const res = await axios.post(`${baseURL}/games/${gameId}/submit`, {
      userId,
      // score,
      timeToComplete,
      isCompleted,
    });
    return res.data;
}

async function getUserDashboard() {
  const res = await axios.get(`${baseURL}/dashboard`);
  return res.data.stats;      // return an array of stats
}

const handleUpgrade = async () => {
  const res = await axios.post(`${baseURL}/auth/upgrade`, {
    username, email, password
  });

  return res.data
}



export default { getUser, getGameByName, submitGameSession, getGameByName, getUserDashboard, handleUpgrade};

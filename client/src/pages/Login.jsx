import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  function handleCreateRoom() {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/create-room`, { username })
      .then((response) => console.log(response));
  }

  function handleJoinRoom() {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/join-room`, { username, roomId })
      .then((response) => console.log(response));
  }

  return (
    <div>
      <input id="username" onChange={(e) => setUsername(e.target.value)} />
      <input id="roomId" onChange={(e) => setRoomId(e.target.value)} />
      <button onClick={handleJoinRoom}>Join Room</button>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
}

export default Login;

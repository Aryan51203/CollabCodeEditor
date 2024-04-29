import { useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

function App() {
  useEffect(() => {
    socket.on("connection", (msg) => {
      console.log(msg);
    });
  }, []);

  return (
    <>
      {/* <Main /> */}
      {/* <Sock /> */}
    </>
  );
}

export default App;

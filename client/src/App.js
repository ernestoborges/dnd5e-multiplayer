import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "./components/Login";
import {Main} from "./components/Main"

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3333');

function App() {
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main socket={socket} />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;

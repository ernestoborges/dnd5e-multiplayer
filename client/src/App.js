import './App.css';
import { useEffect, useState } from 'react';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3333');

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])


  const handdleSendMessage = (e) => {
    e.preventDefault();
    console.log({userName: "Me", message})
    socket.emit("message", {
      text: message,
      name: "User",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id
    })
    setMessage("")
  }

  useEffect(() => {
    socket.on("messageResponse", data => setMessages([...messages, data]))
    console.log(messages)
  }, [socket, messages])

  return (
    <div className="App">
      <main>
        <section className="live-chat-section">
          <article>
            <header>Live Chat</header>
            <section className="chat-body">
              {messages.map(chat => 
                <p>{chat.text}</p>
              )}
            </section>
            <form className="chat-type-bar" onSubmit={handdleSendMessage}>
              <input
                type="text"
                placeholder="Write message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button>Send</button>
            </form>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;

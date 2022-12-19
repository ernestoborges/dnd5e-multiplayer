import { useEffect, useState } from 'react';

export function Main({socket}){
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const handdleSendMessage = (e) => {
        e.preventDefault();
        console.log({userName: "Me", message})
        socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id
        })
        setMessage("")
    }

    useEffect(() => {
        socket.on("messageResponse", data => setMessages([...messages, data]))
        console.log(messages)
    }, [socket, messages])

    return <main>
        <section className="live-chat-section">
        <article>
            <header>Live Chat</header>
            <section className="chat-body">
                {messages.map(chat => 
                    <p>{`${chat.name}: ${chat.text}`}</p>
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
}
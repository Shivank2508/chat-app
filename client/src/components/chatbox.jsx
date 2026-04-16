import { useEffect, useState, useContext } from "react";
import { getSocket } from "../socket/socket";
import { AuthContext } from "../context/authContext";

function ChatBox({ receiver }) {
    const { authData } = useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const socket = getSocket();

    const userId = authData?._id;
    const receiverId = receiver?._id;
    // ✅ join + receive message
    useEffect(() => {
        if (!socket || !userId) return;
        socket.emit("join", userId);
        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => socket.off("receive_message");
    }, [socket, userId]);
    // ✅ send message
    const sendMessage = () => {
        if (!socket) return;
        const msgData = {
            sender: userId,
            receiver: receiverId,
            message
        };
        socket.emit("send_message", msgData);
        setMessages((prev) => [...prev, msgData]);
        setMessage("");
    };
    if (!receiver) {
        return <div style={{ padding: "20px" }}>Select a user to start chat</div>;
    }
    return (
        <div style={{ padding: "20px", flex: 1 }}>
            <h3>Chat with {receiver.name}</h3>
            {/* messages */}
            <div style={{ height: "300px", overflowY: "auto" }}>
                {messages.map((m, i) => (
                    <p
                        key={i}
                        style={{
                            textAlign: m.sender === userId ? "right" : "left",
                        }}
                    >
                        {m.message}
                    </p>
                ))}
            </div>
            {/* input */}
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatBox;
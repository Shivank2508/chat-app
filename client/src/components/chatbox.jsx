import { useEffect, useState, useContext } from "react";
import { getSocket } from "../socket/socket";
import { AuthContext } from "../context/authContext";
import { prevChat } from "../service/chatservice";

function ChatBox({ receiver }) {
    const { authData } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socket = getSocket();
    const userId = authData?._id;
    const receiverId = receiver?._id;

    async function fecthPreviouschat() {
        try {
            const res = await prevChat(userId, receiverId)
            setMessages(res.messages)
        } catch (err) {
            console.log(err)
        }
    }
    // ✅ join + receive message
    useEffect(() => {
        if (userId && receiverId) {
            fecthPreviouschat()
        }
        if (!socket || !userId) return;
        socket.emit("join", userId);
        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => socket.off("receive_message");
    }, [socket, userId, receiverId]);
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
        <div
            style={{
                padding: "20px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                background: "#f4f6f9",
                borderRadius: "12px",
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: "10px 15px",
                    background: "#0d6efd",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: "600",
                    marginBottom: "10px",
                }}
            >
                Chat with {receiver.name}
            </div>

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {messages.map((m, i) => {
                    const isMe = m.sender === userId;

                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: isMe ? "flex-end" : "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "60%",
                                    padding: "10px 14px",
                                    borderRadius: "16px",
                                    background: isMe ? "#0d6efd" : "#e9ecef",
                                    color: isMe ? "#fff" : "#000",
                                    fontSize: "14px",
                                    lineHeight: "1.4",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                }}
                            >
                                {m.message}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                }}
            >
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        outline: "none",
                    }}
                />

                <button
                    onClick={sendMessage}
                    style={{
                        padding: "10px 18px",
                        borderRadius: "20px",
                        border: "none",
                        background: "#0d6efd",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "500",
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBox;
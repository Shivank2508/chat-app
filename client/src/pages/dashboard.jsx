import { useState } from "react";
import Sidebar from "../components/sidebar";
import ChatBox from "../components/chatbox";

const DashBoard = () => {

    const [receiver, setReceiver] = useState(null);

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* LEFT SIDE - USERS */}
            <Sidebar setReceiver={setReceiver} />

            {/* RIGHT SIDE - CHAT */}
            <ChatBox receiver={receiver} />

        </div>
    );
};

export default DashBoard;  
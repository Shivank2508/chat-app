import axios from "axios";

const Api = "http://localhost:8001/api"


export const prevChat = async (user1, user2) => {
    const res = await axios.get(
        `${Api}/prechat/previouschat/${user1}/${user2}`
    )
    return res.data
}
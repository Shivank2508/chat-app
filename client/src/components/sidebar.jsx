import React, { useEffect, useState } from "react";
import { usersApi } from "../service/authservice";


const Sidebar = ({ setReceiver }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function callApi() {
            try {
                const res = await usersApi();
                setUsers(res.users); // ✅ fix this also (see below)
            } catch (err) {
                console.log(err);
            }
        }
        callApi();
    }, []);

    function handleClick(user) {
        setReceiver(user, "users"); // ✅ important
    }

    return (
        <div className="" style={{ maxWidth: "450px" }}>
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white text-center">
                    <h5 className="mb-0">Users</h5>
                </div>

                <ul className="list-group list-group-flush">
                    {users?.map((item) => (
                        <li
                            key={item._id}
                            className="list-group-item d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick(item)}
                        >
                            <div className="d-flex align-items-center gap-2">

                                {/* Avatar */}
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        backgroundColor: "#ffc107",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.name?.charAt(0)?.toUpperCase()}
                                </div>

                                {/* Name */}
                                <span>{item.name}</span>
                            </div>

                            <span className="text-muted">→</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
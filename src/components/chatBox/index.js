import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ChatBox() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const CurrentUser = useSelector((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/messages/unread/${CurrentUser.idUser}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setUnreadCount(res.data.unreadCount);
      } catch (err) {
        console.error("Error fetching unread count", err);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000); // refresh every 5s  
    return () => clearInterval(interval);
  }, [CurrentUser.idUser]);

  useEffect(() => {
    const fetchUsersWithUnread = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/messages/users-with-unread/${CurrentUser.idUser}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users with unread count", err);
      }
    };
    fetchUsersWithUnread();
    const interval = setInterval(fetchUsersWithUnread, 10000); 
    return () => clearInterval(interval);
  }, [CurrentUser.idUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUsers(res.data.result.filter(u => u.user_id !== CurrentUser.idUser));
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [CurrentUser.idUser]);

 
  useEffect(() => {
    const fetchConversation = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/messages/conversation/${CurrentUser.idUser}/${selectedUser.user_id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching conversation", err);
      }
    };
    fetchConversation();
  }, [selectedUser, CurrentUser.idUser]);


  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedUser) return;

    const newMsg = {
      senderId: CurrentUser.idUser,
      receiverId: selectedUser.user_id,
      message: messageText.trim(),
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/messages`,
        newMsg,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setMessages((prev) => [...prev, res.data]); 
      setMessageText("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  
  const filteredUsers = users.filter(u =>
    u.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#!"
        id="chatDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        💬 Chat
      </a>
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 8px",
            fontSize: "12px",
          }}
        >
          {unreadCount}
        </span>
      )}
      <div
        className="dropdown-menu dropdown-menu-end p-3"
        style={{ width: "300px" }}
        aria-labelledby="chatDropdown"
      >
        {!selectedUser ? (
          <>
            <h6 className="dropdown-header">Chats</h6>

         
            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

        
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <button
                    key={u.user_id}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    onClick={() => setSelectedUser(u)}
                  >
                    <div>
                      {u.user_name} <br />
                      <small className="text-muted">{u.email}</small>
                    </div>

                    {u.unread_count > 0 && (
                      <span
                        style={{
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "12px",
                        }}
                      >
                        {u.unread_count}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <div className="text-muted px-2">No users found</div>
              )}

            </div>
          </>
        ) : (
          <>
         
            <div className="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
              <strong>{selectedUser.user_name}</strong>
              <button
                className="btn btn-sm btn-light"
                onClick={() => {
                  setSelectedUser(null);
                  setMessages([]);
                }}
              >
                ← Back
              </button>
            </div>

           
            <div className="overflow-auto mb-2" style={{ maxHeight: "200px" }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded mb-1 ${msg.sender_id === CurrentUser.idUser
                      ? "bg-primary text-white text-end"
                      : "bg-light text-start"
                    }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

           
            <div className="d-flex">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Type..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="btn btn-sm btn-primary ms-1"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default ChatBox;

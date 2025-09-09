import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ChatBox() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const CurrentUser = useSelector((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch unread count
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
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, [CurrentUser.idUser]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data.result.filter((u) => u.user_id !== CurrentUser.idUser));
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [CurrentUser.idUser]);

  // Fetch conversation
  useEffect(() => {
    const fetchConversation = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/messages/conversation/${CurrentUser.idUser}/${selectedUser.user_id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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

  const filteredUsers = users.filter(
    (u) =>
      u.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mobile click: navigate to /message
  if (isMobile) {
    return (
      <li className="nav-item position-relative">
        <Link to="/message" className="nav-link">
          💬 Chat
          {unreadCount > 0 && (
            <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
              {unreadCount}
            </span>
          )}
        </Link>
      </li>
    );
  }

  // Desktop dropdown
  return (
    <li className="nav-item dropdown position-relative">
      <a
        className="nav-link dropdown-toggle"
        href="#!"
        id="chatDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        💬 Chat
        {unreadCount > 0 && (
          <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
            {unreadCount}
          </span>
        )}
      </a>
      <div
        className="dropdown-menu dropdown-menu-end p-3"
        style={{ minWidth: "250px", maxWidth: "90vw" }}
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
            <div style={{ maxHeight: "40vh", overflowY: "auto" }}>
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
                      <span className="badge bg-danger">{u.unread_count}</span>
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
            <div className="overflow-auto mb-2" style={{ maxHeight: "40vh" }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded mb-1 ${
                    msg.sender_id === CurrentUser.idUser
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

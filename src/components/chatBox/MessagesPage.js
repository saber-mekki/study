import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import "./MessagesPage.css"; 

function MessagesPage() {
  const { t } = useTranslation();
  const CurrentUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


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

  return (
    <div className="messages-page d-flex flex-column flex-md-row">
      <div className="users-list border-end p-2">
        <h5>Chats</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="users-container">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <div
                key={u.user_id}
                className={`user-item p-2 mb-1 rounded ${
                  selectedUser?.user_id === u.user_id ? "bg-primary text-white" : "bg-light"
                }`}
                onClick={() => setSelectedUser(u)}
              >
                <div className="d-flex justify-content-between">
                  <span>{u.user_name}</span>
                  {u.unread_count > 0 && (
                    <span className="badge bg-danger">{u.unread_count}</span>
                  )}
                </div>
                <small className="text-muted">{u.email}</small>
              </div>
            ))
          ) : (
            <div className="text-muted px-2">No users found</div>
          )}
        </div>
      </div>

      <div className="chat-window flex-grow-1 d-flex flex-column p-2">
        {selectedUser ? (
          <>
            <div className="chat-header border-bottom pb-2 mb-2 d-flex justify-content-between align-items-center">
              <strong>{selectedUser.user_name}</strong>
              <button
                className="btn btn-sm btn-light"
                onClick={() => {
                  setSelectedUser(null);
                  setMessages([]);
                }}
              >
                ← {t("Back")}
              </button>
            </div>
            <div className="chat-messages flex-grow-1 overflow-auto mb-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded mb-1 w-75 ${
                    msg.sender_id === CurrentUser.idUser
                      ? "bg-primary text-white ms-auto text-end"
                      : "bg-light"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="chat-input d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="btn btn-primary ms-2" onClick={handleSendMessage}>
                 {t("Send")}
              </button>
            </div>
          </>
        ) : (
          <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
             {t("Select a user to start chatting ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;

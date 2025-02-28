import { useState, useEffect } from "react";
import { FaArrowLeft, FaPaperPlane, FaPlus } from "react-icons/fa6";
import { manavatar } from "../Utils/images";

const MessageSection = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [newChatUsers, setNewChatUsers] = useState([]);
  const [showNewChat, setShowNewChat] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    fetch("http://localhost:3000/chats", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error("Error fetching chats:", err));

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.userId);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  useEffect(() => {
    if (showNewChat) {
      fetch("http://localhost:3000/users?role=teacher,admin")
        .then((res) => res.json())
        .then(setNewChatUsers)
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [showNewChat]);

  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:3000/chats/${selectedChat.id}/messages`);
        const data = await res.json();
        setSelectedChat((prev) => (prev ? { ...prev, messages: data } : null));
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, [selectedChat]);

  const handleChatSelect = (chat) => {
    setSelectedChat({ ...chat, messages: [] });
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    const token = localStorage.getItem("token");
    const newMessage = { message: messageInput, chat_id: selectedChat.id, sender_id: userId };

    setSelectedChat((prev) => prev ? { ...prev, messages: [...prev.messages, newMessage] } : prev);
    setMessageInput("");

    try {
      const res = await fetch(`http://localhost:3000/chats/${selectedChat.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) {
        console.error("Error sending message:", await res.json());
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const startNewChat = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/newchats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user2: user.User_ID }),
      });

      const newChat = await res.json();
      if (!chats.some((chat) => chat.id === newChat.id)) {
        setChats([...chats, newChat]);
      }

      setShowNewChat(false);
      handleChatSelect(newChat);
    } catch (err) {
      console.error("Error starting new chat:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Chats</h2>
        <button onClick={() => setShowNewChat(true)} className="text-blue-500">
          <FaPlus size={20} />
        </button>
      </div>

      {showNewChat && (
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Start New Chat</h3>
          <ul>
            {newChatUsers.map((user) => (
              <li
                key={user.User_ID}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => startNewChat(user)}
              >
                {user.Username}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedChat ? (
        <div className="flex flex-col h-[70vh]">
          <div className="flex items-center p-3 shadow-md bg-white">
            <button
              className="text-blue-500 mr-3"
              onClick={() => {
                setSelectedChat(null);
              }}
            >
              <FaArrowLeft size={20} />
            </button>
            <img
              src={selectedChat.profilePic || manavatar}
              alt={selectedChat.participant_name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold">{selectedChat.participant_name}</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {selectedChat.messages?.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender_id === userId ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`p-3 max-w-xs rounded-lg ${msg.sender_id === userId ? "bg-blue-500 text-white" : "bg-white border"}`}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white shadow-md flex items-center">
            <textarea
              className="flex-1 p-2 border rounded-md resize-none focus:outline-none"
              rows={1}
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white p-2 rounded-md flex items-center">
              <FaPaperPlane className="mr-1" /> Send
            </button>
          </div>
        </div>
      ) : (
        <div className="divide-y">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => handleChatSelect(chat)} className="flex items-center p-3 cursor-pointer hover:bg-gray-100">
              <img src={manavatar} alt={chat.participant_name} className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="font-semibold">{chat.participant_name}</div>
                <div className="text-sm text-gray-500 truncate max-w-xs">{chat.last_message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageSection;

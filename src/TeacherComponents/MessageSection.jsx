import { useState } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa6";
import { manavatar } from "../Utils/images"; // Default avatar

const chats = [
  {
    id: 1,
    name: "John Doe",
    messages: [
      { sender: "John Doe", text: "Hey, how's it going?" },
      { sender: "You", text: "I'm good! How about you?" },
      { sender: "John Doe", text: "Doing well, thanks!" },
    ],
    profilePic: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    messages: [
      { sender: "Jane Smith", text: "Let's meet tomorrow." },
      { sender: "You", text: "Sure, what time?" },
      { sender: "Jane Smith", text: "Around 10 AM." },
    ],
    profilePic: "https://via.placeholder.com/40",
  },
];

export default function MessageSection() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;

    selectedChat.messages.push({ sender: "You", text: messageInput });
    setMessageInput(""); // Clear input after sending
  };

  if (selectedChat) {
    return (
      <div className="flex flex-col h-[70vh] ">
        {/* Top Header */}
        <div className="flex items-center p-3 shadow-md bg-white">
          <button className="text-blue-500 mr-3" onClick={() => setSelectedChat(null)}>
            <FaArrowLeft size={20} />
          </button>
          <img
            src={selectedChat.profilePic || manavatar}
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold">{selectedChat.name}</span>
        </div>

        {/* Chat Area (70% screen height) */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {selectedChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`p-3 max-w-xs rounded-lg ${
                  msg.sender === "You" ? "bg-blue-500 text-white" : "bg-white border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-3 bg-white shadow-md flex items-center">
          <textarea
            className="flex-1 p-2 border rounded-md resize-none focus:outline-none"
            rows={1}
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md flex items-center"
          >
            <FaPaperPlane className="mr-1" /> Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Chats</h2>
      <div className="divide-y">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
          >
            <img
              src={chat.profilePic || manavatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="font-semibold">{chat.name}</div>
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {chat.messages[chat.messages.length - 1].text}
              </div>
            </div>
            <div className="text-xs text-gray-400">Just now</div>
          </div>
        ))}
      </div>
    </div>
  );
}

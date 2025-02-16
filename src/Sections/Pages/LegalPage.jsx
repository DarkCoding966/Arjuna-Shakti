import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const LegalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "YOUR_GEMINI_API_KEY"; 

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "User", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { text: `You are a lawyer helping women with legal issues. Answer professionally: ${input}` },
        }),
      });
      
      const data = await response.json();
      const botReply = data?.candidates?.[0]?.output || "I'm sorry, I couldn't understand that.";
      setMessages([...newMessages, { role: "Lawyer", text: botReply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { role: "Lawyer", text: "There was an error processing your request." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Legal Chatbot (For Women)
        </Typography>
        <div style={{ maxHeight: 300, overflowY: "auto", paddingBottom: 10 }}>
          {messages.map((msg, index) => (
            <Typography key={index} sx={{ textAlign: msg.role === "User" ? "right" : "left", mt: 1, p: 1, bgcolor: msg.role === "User" ? "#e3f2fd" : "#f3e5f5", borderRadius: 2 }}>
              <strong>{msg.role}:</strong> {msg.text}
            </Typography>
          ))}
        </div>
        <TextField
          fullWidth
          variant="outlined"
          label="Ask your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          sx={{ mt: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Ask Lawyer"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LegalChatbot;

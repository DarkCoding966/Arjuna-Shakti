import { useState, useEffect, useRef } from "react";
import { TextField, Divider, Typography, CircularProgress, Box, IconButton, Button } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const LegalChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const API_KEY = "AIzaSyChz49v4j96SIOqL3_kAbWi6RJgTyuzIfI";

  const handleVerify = async (userQuery) => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a legal advocate in India. Guide a woman regarding her issue according to the Constitution of India: ${userQuery}`;
      const result = await model.generateContent([prompt]);

      // Extract text response
      const botReply = result?.response?.text() || "I'm sorry, I couldn't understand that.";

      // Format the response (Replace new lines with `<br>` for HTML rendering)
      const formattedReply = botReply
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to HTML bold
        .replace(/\n/g, "<br>"); // Replace new lines with HTML line breaks

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "Lawyer", text: formattedReply },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "Lawyer", text: "There was an error processing your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prevMessages) => [...prevMessages, { role: "User", text: input }]);
    handleVerify(input);
    setInput("");
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "94vh" }}>
      <Typography
        variant="h5"
        sx={{ textAlign: "left", p: 2, color: "white", fontFamily: "'Poppins', sans-serif", fontWeight: 600, letterSpacing: "1px" }}
      >
        EmpowerHer: Legal Help
      </Typography>
      <Divider sx={{ border: 2, mb: 2, width: "90%" }} />

      <Box ref={chatContainerRef} sx={{ flexGrow: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", maxHeight: "60vh", pr: 20 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.role === "User" ? "flex-end" : "flex-start",
              bgcolor: msg.role === "User" ? "#42a5f5" : "#f8bbd0",
              color: msg.role === "User" ? "white" : "black",
              p: 1.8,
              my: 1,
              borderRadius: "15px",
              maxWidth: "75%",
              boxShadow: 2,
            }}
          >
            <strong>{msg.role}:</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: msg.text }} />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2, border: "2px solid white", bgcolor: "#212121", width: "94%" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          InputProps={{ sx: { color: "white", "& fieldset": { borderColor: "white" } } }}
        />
        <IconButton onClick={sendMessage} disabled={loading} sx={{ ml: 1, bgcolor: "#3f51b5", color: "white", borderRadius: 1 }}>
          {loading ? <CircularProgress size={24} color="white" /> : <SendIcon />}
        </IconButton>
      </Box>

      <Button onClick={clearChat} variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ mt: 2, alignSelf: "center", width: "150px" }}>
        Clear Chat
      </Button>
    </Box>
  );
};

export default LegalChatbot;




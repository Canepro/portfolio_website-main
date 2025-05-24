import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: ${props => props.isOpen ? '450px' : '60px'};
  background: ${({ theme }) => theme.colors.background2};
  border: 2px solid ${({ theme }) => theme.colors.accent1};
  border-radius: 15px;
  transition: all 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ChatHeader = styled.div`
  background: ${({ theme }) => theme.colors.accent1};
  color: ${({ theme }) => theme.colors.background1};
  padding: 15px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  height: 320px;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 15px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser 
    ? ({ theme }) => theme.colors.button 
    : ({ theme }) => theme.colors.background1};
  color: ${props => props.isUser 
    ? ({ theme }) => theme.colors.primary1 
    : ({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.4;
`;

const ChatInput = styled.div`
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.accent1}33;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.accent1}66;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background1};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent1};
  }
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.primary1};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your portfolio assistant. Ask me about Vincent's skills, projects, or experience!", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple response logic (you can replace with OpenAI API later)
  const getResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('skill') || msg.includes('technology')) {
      return "Vincent specializes in React, Next.js, Node.js, Python, and modern web development. He's also experienced with 3D graphics, AI integration, and full-stack development!";
    } else if (msg.includes('project') || msg.includes('work')) {
      return "Vincent has worked on various projects including portfolio websites, e-commerce platforms, and AI-powered applications. Check out his project showcase for detailed examples!";
    } else if (msg.includes('contact') || msg.includes('hire')) {
      return "You can reach Vincent through the contact form below, or connect with him on LinkedIn. He's always open to discussing new opportunities!";
    } else if (msg.includes('experience')) {
      return "Vincent has several years of experience in full-stack development, with a focus on modern JavaScript frameworks and emerging technologies like AI and 3D graphics.";
    } else {
      return "That's an interesting question! Feel free to ask me about Vincent's skills, projects, experience, or how to get in touch with him.";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate thinking delay
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: getResponse(inputValue), 
        isUser: false 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer isOpen={isOpen}>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        <span>💬 Portfolio Assistant</span>
        <span>{isOpen ? '−' : '+'}</span>
      </ChatHeader>
      
      {isOpen && (
        <>
          <ChatMessages>
            {messages.map(message => (
              <Message key={message.id} isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <ChatInput>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </ChatInput>
        </>
      )}
    </ChatContainer>
  );
};

export default ChatBot;

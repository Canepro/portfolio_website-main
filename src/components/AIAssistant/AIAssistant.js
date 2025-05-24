import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { FaRobot, FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaTimes, FaUser } from 'react-icons/fa';

// Styled Components
const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  
  @media ${({ theme }) => theme.breakpoints?.sm || 'screen and (max-width: 640px)'} {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
`;

const ChatbotButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
      : 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)'
  };
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows?.xl || '0 20px 25px -5px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ChatWindow = styled(motion.div)`
  width: 350px;
  height: 500px;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(15, 23, 42, 0.95)'
      : 'rgba(255, 255, 255, 0.95)'
  };
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.2)'
      : 'rgba(15, 23, 42, 0.1)'
  };
  box-shadow: ${({ theme }) => theme.shadows?.xl || '0 20px 25px -5px rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.breakpoints?.sm || 'screen and (max-width: 640px)'} {
    width: 100%;
    height: 70vh;
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
      : 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)'
  };
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme, isDark }) => 
      isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(15, 23, 42, 0.2)'
    };
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  max-width: 90%;
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  flex-direction: ${({ isUser }) => isUser ? 'row-reverse' : 'row'};
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ isUser, theme, isDark }) => 
    isUser 
      ? (isDark ? '#6366f1' : '#4f46e5')
      : (isDark ? '#8b5cf6' : '#7c3aed')
  };
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

const MessageBubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: ${({ isUser }) => 
    isUser 
      ? '16px 16px 4px 16px'
      : '16px 16px 16px 4px'
  };
  background: ${({ isUser, theme, isDark }) => 
    isUser 
      ? (isDark ? '#6366f1' : '#4f46e5')
      : (isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(15, 23, 42, 0.05)')
  };
  color: ${({ isUser, theme, isDark }) => 
    isUser 
      ? 'white'
      : (isDark ? theme.colors?.text?.primary : theme.colors?.text?.primary)
  };
  font-size: 0.875rem;
  line-height: 1.4;
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.1)'
      : 'rgba(15, 23, 42, 0.1)'
  };
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.2)'
      : 'rgba(15, 23, 42, 0.1)'
  };
  border-radius: 8px;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(30, 41, 59, 0.5)'
      : 'rgba(248, 250, 252, 0.8)'
  };
  color: ${({ theme, isDark }) => 
    isDark ? theme.colors?.text?.primary : theme.colors?.text?.primary
  };
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary || '#6366f1'};
  }

  &::placeholder {
    color: ${({ theme, isDark }) => 
      isDark 
        ? 'rgba(148, 163, 184, 0.5)'
        : 'rgba(15, 23, 42, 0.4)'
    };
  }
`;

const ActionButton = styled(motion.button)`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme, variant, isDark }) => {
    if (variant === 'voice') {
      return isDark ? '#ef4444' : '#dc2626';
    }
    return isDark ? '#6366f1' : '#4f46e5';
  }};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(148, 163, 184, 0.7)'
      : 'rgba(15, 23, 42, 0.6)'
  };
  font-size: 0.875rem;
  font-style: italic;
`;

const Dot = styled(motion.div)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors?.primary || '#6366f1'};
`;

// Portfolio data for AI responses
const portfolioData = {
  name: "Vincent Mogah",
  title: "DevOps Engineer",
  experience: "5+ years",
  skills: [
    "Microsoft Azure", "AWS", "Docker", "Kubernetes", "Terraform",
    "React.js", "Next.js", "JavaScript", "TypeScript", "Node.js",
    "Python", "CI/CD", "Git", "Linux", "Monitoring"
  ],
  projects: [
    "Personal Portfolio - Modern Next.js portfolio with 3D animations",
    "E-Commerce Platform - Full-stack React e-commerce application",
    "WebRTC Chat App - Real-time video chat application",
    "Unichat - Realtime chat application with Firebase"
  ],
  contact: {
    email: "vincent@example.com",
    linkedin: "https://www.linkedin.com/in/vincent-mogah/",
    github: "https://github.com/Canepro"
  }
};

// AI Response Generator (simplified - in production, use OpenAI API)
const generateAIResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    return `I have expertise in ${portfolioData.skills.slice(0, 5).join(', ')} and many more technologies. My strongest areas are cloud platforms (Azure, AWS) and modern web development with React/Next.js.`;
  }
  
  if (lowerMessage.includes('project')) {
    return `Here are some of my featured projects:\n\n${portfolioData.projects.map((project, index) => `${index + 1}. ${project}`).join('\n')}`;
  }
  
  if (lowerMessage.includes('experience')) {
    return `I have ${portfolioData.experience} of experience as a ${portfolioData.title}, specializing in cloud infrastructure, DevOps automation, and full-stack development.`;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
    return `You can reach me through:\n- LinkedIn: ${portfolioData.contact.linkedin}\n- GitHub: ${portfolioData.contact.github}\n- Or use the contact form on this website!`;
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello! I'm Vincent's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?`;
  }
  
  return `Thanks for your message! I can help you learn about Vincent's skills, projects, experience, or how to contact him. What specific information are you looking for?`;
};

const AIAssistant = () => {
  const { theme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Vincent's AI assistant. I can help you learn about his skills, projects, and experience. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    // Voice recognition would be implemented here
    setIsListening(!isListening);
    
    if (!isListening) {
      // Start voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInputValue("This is a voice message example");
      }, 3000);
    }
  };

  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const dotVariants = {
    animate: {
      y: [-2, -8, -2],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            theme={theme}
            isDark={isDark}
          >
            <ChatHeader theme={theme} isDark={isDark}>
              <HeaderTitle>
                <FaRobot />
                Vincent's AI Assistant
              </HeaderTitle>
              <CloseButton onClick={() => setIsOpen(false)}>
                <FaTimes />
              </CloseButton>
            </ChatHeader>

            <ChatMessages theme={theme} isDark={isDark}>
              {messages.map((message) => (
                <Message
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  isUser={message.isUser}
                >
                  <MessageAvatar isUser={message.isUser} theme={theme} isDark={isDark}>
                    {message.isUser ? <FaUser /> : <FaRobot />}
                  </MessageAvatar>
                  <MessageBubble isUser={message.isUser} theme={theme} isDark={isDark}>
                    {message.text.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </MessageBubble>
                </Message>
              ))}
              
              {isTyping && (
                <TypingIndicator
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  theme={theme}
                  isDark={isDark}
                >
                  AI is typing
                  <Dot variants={dotVariants} animate="animate" theme={theme} />
                  <Dot variants={dotVariants} animate="animate" theme={theme} style={{ animationDelay: '0.2s' }} />
                  <Dot variants={dotVariants} animate="animate" theme={theme} style={{ animationDelay: '0.4s' }} />
                </TypingIndicator>
              )}
              <div ref={messagesEndRef} />
            </ChatMessages>

            <ChatInput theme={theme} isDark={isDark}>
              <InputField
                type="text"
                placeholder="Ask about Vincent's skills, projects, or experience..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                theme={theme}
                isDark={isDark}
              />
              <ActionButton
                variant="voice"
                onClick={toggleVoiceRecording}
                theme={theme}
                isDark={isDark}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </ActionButton>
              <ActionButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                theme={theme}
                isDark={isDark}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane />
              </ActionButton>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>

      <ChatbotButton
        onClick={() => setIsOpen(!isOpen)}
        theme={theme}
        isDark={isDark}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </ChatbotButton>
    </ChatbotContainer>
  );
};

export default AIAssistant;

import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
`;

const ContactTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 50px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, ${({ theme }) => theme.colors.button});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContactForm = styled.form`
  display: grid;
  gap: 25px;
  background: ${({ theme }) => theme.colors.background2};
  padding: 40px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.accent1}33;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background1};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent1};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent1}22;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text}66;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid ${({ theme }) => theme.colors.accent1}33;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background1};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent1};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent1}22;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text}66;
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent1}, ${({ theme }) => theme.colors.button});
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const StatusMessage = styled.div`
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  background: ${props => props.type === 'success' 
    ? ({ theme }) => theme.colors.accent1 + '22'
    : ({ theme }) => theme.colors.button + '22'};
  color: ${props => props.type === 'success' 
    ? ({ theme }) => theme.colors.accent1
    : ({ theme }) => theme.colors.button};
  border: 1px solid ${props => props.type === 'success' 
    ? ({ theme }) => theme.colors.accent1 + '66'
    : ({ theme }) => theme.colors.button + '66'};
`;

const ModernContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactTitle>Get In Touch</ContactTitle>
      
      <ContactForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Your Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="message">Your Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or idea..."
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </SubmitButton>
        
        {status && (
          <StatusMessage type={status.type}>
            {status.message}
          </StatusMessage>
        )}
      </ContactForm>
    </ContactContainer>
  );
};

export default ModernContact;

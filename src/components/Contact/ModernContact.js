import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

// Styled Components
const ContactSection = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
  };
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme, isDark }) => 
      isDark 
        ? 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
        : 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
    };
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ContactHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme, isDark }) => 
    isDark ? theme.colors.text.secondary : theme.colors.text.secondary
  };
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FormContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media ${({ theme }) => theme.breakpoints.md} {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  padding: 2rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${({ theme, isDark }) => 
    isDark ? theme.glass.background : 'rgba(255, 255, 255, 0.1)'
  };
  border: ${({ theme, isDark }) => 
    isDark ? theme.glass.border : '1px solid rgba(255, 255, 255, 0.2)'
  };
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme, isDark }) => 
      isDark 
        ? '0 20px 40px rgba(0, 0, 0, 0.3)'
        : '0 20px 40px rgba(31, 38, 135, 0.2)'
    };
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
`;

const InfoContent = styled.div`
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme, isDark }) => 
      isDark ? theme.colors.text.primary : theme.colors.text.primary
    };
    margin-bottom: 0.25rem;
  }

  p {
    color: ${({ theme, isDark }) => 
      isDark ? theme.colors.text.secondary : theme.colors.text.secondary
    };
    font-size: 0.875rem;
  }
`;

const Form = styled(motion.form)`
  background: ${({ theme, isDark }) => 
    isDark ? theme.glass.background : 'rgba(255, 255, 255, 0.1)'
  };
  border: ${({ theme, isDark }) => 
    isDark ? theme.glass.border : '1px solid rgba(255, 255, 255, 0.2)'
  };
  border-radius: 24px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme, isDark }) => 
    isDark 
      ? '0 25px 50px rgba(0, 0, 0, 0.3)'
      : '0 25px 50px rgba(31, 38, 135, 0.1)'
  };

  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 2rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media ${({ theme }) => theme.breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled(motion.div)`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid ${({ theme, isDark, hasError }) => 
    hasError 
      ? '#ef4444'
      : isDark 
        ? 'rgba(148, 163, 184, 0.2)' 
        : 'rgba(15, 23, 42, 0.1)'
  };
  border-radius: 12px;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(15, 23, 42, 0.5)'
      : 'rgba(255, 255, 255, 0.5)'
  };
  color: ${({ theme, isDark }) => 
    isDark ? theme.colors.text.primary : theme.colors.text.primary
  };
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: ${({ theme, isDark }) => 
      isDark ? theme.colors.text.secondary : theme.colors.text.secondary
    };
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem 1.5rem;
  border: 2px solid ${({ theme, isDark, hasError }) => 
    hasError 
      ? '#ef4444'
      : isDark 
        ? 'rgba(148, 163, 184, 0.2)' 
        : 'rgba(15, 23, 42, 0.1)'
  };
  border-radius: 12px;
  background: ${({ theme, isDark }) => 
    isDark 
      ? 'rgba(15, 23, 42, 0.5)'
      : 'rgba(255, 255, 255, 0.5)'
  };
  color: ${({ theme, isDark }) => 
    isDark ? theme.colors.text.primary : theme.colors.text.primary
  };
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  resize: vertical;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme, isDark }) => 
      isDark ? theme.colors.text.secondary : theme.colors.text.secondary
    };
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const ErrorMessage = styled(motion.span)`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.gradient.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const ModernContact = () => {
  const { theme, isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success notification
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f8fafc' : '#1e293b',
          border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
        },
      });
      
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f8fafc' : '#1e293b',
          border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      content: 'hello@yourname.com',
    },
    {
      icon: '📱',
      title: 'Phone',
      content: '+1 (555) 123-4567',
    },
    {
      icon: '📍',
      title: 'Location',
      content: 'San Francisco, CA',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      content: 'linkedin.com/in/yourname',
    },
  ];

  return (
    <ContactSection theme={theme} isDark={isDark}>
      <Container>
        <ContactHeader
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title variants={itemVariants} theme={theme}>
            Let's Work Together
          </Title>
          <Subtitle variants={itemVariants} theme={theme} isDark={isDark}>
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your ideas to life.
          </Subtitle>
        </ContactHeader>

        <FormContainer
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactInfo variants={itemVariants}>
            {contactInfo.map((item, index) => (
              <InfoItem
                key={index}
                variants={itemVariants}
                theme={theme}
                isDark={isDark}
                whileHover={{ scale: 1.02 }}
              >
                <InfoIcon theme={theme}>
                  {item.icon}
                </InfoIcon>
                <InfoContent theme={theme} isDark={isDark}>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </InfoContent>
              </InfoItem>
            ))}
          </ContactInfo>

          <Form
            variants={itemVariants}
            theme={theme}
            isDark={isDark}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGrid>
              <FormGroup variants={itemVariants}>
                <Input
                  {...register('firstName', { required: 'First name is required' })}
                  placeholder="First Name"
                  theme={theme}
                  isDark={isDark}
                  hasError={errors.firstName}
                />
                {errors.firstName && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.firstName.message}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup variants={itemVariants}>
                <Input
                  {...register('lastName', { required: 'Last name is required' })}
                  placeholder="Last Name"
                  theme={theme}
                  isDark={isDark}
                  hasError={errors.lastName}
                />
                {errors.lastName && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.lastName.message}
                  </ErrorMessage>
                )}
              </FormGroup>
            </FormGrid>

            <FormGroup variants={itemVariants}>
              <Input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="Email Address"
                theme={theme}
                isDark={isDark}
                hasError={errors.email}
              />
              {errors.email && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Input
                {...register('subject', { required: 'Subject is required' })}
                placeholder="Subject"
                theme={theme}
                isDark={isDark}
                hasError={errors.subject}
              />
              {errors.subject && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.subject.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <TextArea
                {...register('message', { 
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters long'
                  }
                })}
                placeholder="Your Message"
                theme={theme}
                isDark={isDark}
                hasError={errors.message}
              />
              {errors.message && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              theme={theme}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Container>
      
      <Toaster />
    </ContactSection>
  );
};

export default ModernContact;

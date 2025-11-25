"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Send, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return createPortal(children, document.body);
};

const MessageButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const toggleForm = () => {
    if (submissionStatus.loading) return;
    setIsOpen(!isOpen);
    if (submissionStatus.success || submissionStatus.error) {
      setSubmissionStatus({ loading: false, success: false, error: null });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ loading: true, success: false, error: null });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormData({ name: '', email: '', message: '' });
      setSubmissionStatus({ loading: false, success: true, error: null });
      
      setTimeout(() => {
        setSubmissionStatus({ loading: false, success: false, error: null });
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      setSubmissionStatus({ 
        loading: false, 
        success: false, 
        error: 'Submission failed. Please try again.' 
      });
    }
  };

  const inputStyles = "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200 backdrop-blur-sm";

  return (
    <>
      <motion.button
        onClick={toggleForm}
        className="p-2 text-gray-400 hover:text-white transition-colors rounded-full relative z-50"
        whileTap={{ 
          scale: 0.9,
         }}
         whileHover={{ 
          x: [0,-5,0],
          y: [0,5,0]
         }}
         transition={{ duration: 0.5 }}
      >
        <Send className="w-5 h-5" />
      </motion.button>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleForm}
              />
              
              <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none h-dvh">
                <motion.div 
                  className="w-full max-w-md pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                >
                  <div className="relative w-full bg-[#060010] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
                    {/* Background Pattern */}
                    <div 
                      className="absolute inset-0 opacity-30 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(88, 204, 254, 0.1) 1px, transparent 1px)',
                        backgroundSize: '4px 4px'
                      }}
                    />

                    {/* Close button */}
                    <button
                      className={`absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 z-50 ${submissionStatus.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={toggleForm}
                      disabled={submissionStatus.loading}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
                      <Mail className="w-5 h-5 text-primary" />
                      Send me a message
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={inputStyles}
                          required
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={inputStyles}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">
                          Message
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="4"
                          className={`${inputStyles} resize-none`}
                          required
                          placeholder="How can I help you?"
                        />
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={submissionStatus.loading}
                        className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        whileTap={{ scale: 0.98 }}
                      >
                        {submissionStatus.loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                    
                    <AnimatePresence>
                      {submissionStatus.success && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#060010] flex flex-col items-center justify-center z-20"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                          >
                            <Send className="w-8 h-8 text-primary" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                          <p className="text-gray-400">I'll get back to you soon.</p>
                        </motion.div>
                      )}

                      {submissionStatus.error && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center"
                        >
                          {submissionStatus.error}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default MessageButton;

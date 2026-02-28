import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { db } from '../../services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import systemPrompt from '../../../ai-instructions.txt?raw';

// Initialize Google Generative AI (requires VITE_GEMINI_API_KEY in .env)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const AIChat = () => {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const messagesEndRef = useRef(null);

    // Load chat history from Firebase on mount
    useEffect(() => {
        const loadChatHistory = async () => {
            if (!user?.uid) return;
            setIsInitializing(true);
            try {
                const chatRef = doc(db, 'chats', user.uid);
                const docSnap = await getDoc(chatRef);
                if (docSnap.exists() && docSnap.data().messages) {
                    setMessages(docSnap.data().messages);
                } else {
                    // Initial greeting if no history
                    const welcomeMsg = {
                        role: 'assistant',
                        content: 'Hello! I am your Aarogya Path Healthcare Assistant. How can I help you today with your health or cost estimation questions?'
                    };
                    setMessages([welcomeMsg]);
                    await setDoc(chatRef, { messages: [welcomeMsg] });
                }
            } catch (error) {
                console.error("Error loading chat history:", error);
            } finally {
                setIsInitializing(false);
            }
        };

        loadChatHistory();
    }, [user?.uid]);

    // Save messages to Firebase whenever they change significantly (new message added)
    const saveChatHistory = async (updatedMessages) => {
        if (!user?.uid) return;
        try {
            const chatRef = doc(db, 'chats', user.uid);
            await setDoc(chatRef, { messages: updatedMessages }, { merge: true });
        } catch (error) {
            console.error("Error saving chat:", error);
        }
    };

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);


    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !genAI) return;

        const userText = input.trim();
        const userMessage = { role: 'user', content: userText };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setIsTyping(true);
        saveChatHistory(newMessages);

        try {
            const model = genAI.getGenerativeModel({
                model: "gemma-3-27b-it",
            });

            // Build history from all previous user/assistant exchanges
            // Filter to only real user/assistant messages (skip welcome or error messages that have no pair)
            // Gemini requires history to START with 'user' and alternate user/model
            const validMessages = messages.filter(m => m.role === 'user' || m.role === 'assistant');

            // Find the first user message to start history from
            const firstUserIdx = validMessages.findIndex(m => m.role === 'user');

            let apiHistory = [];
            if (firstUserIdx !== -1) {
                apiHistory = validMessages.slice(firstUserIdx).map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }],
                }));
            }

            // Always prepend system prompt to the actual message being sent
            // This ensures the AI always has context about its role
            const isFirstUserMessage = !validMessages.some(m => m.role === 'user');
            const promptToSend = isFirstUserMessage
                ? `[System Instructions]\n${systemPrompt}\n[End System Instructions]\n\nUser: ${userText}`
                : userText;

            const chat = model.startChat({ history: apiHistory });
            const result = await chat.sendMessage(promptToSend);
            const aiResponseText = result.response.text();

            const assistantMessage = { role: 'assistant', content: aiResponseText };
            const finalMessages = [...newMessages, assistantMessage];
            setMessages(finalMessages);
            saveChatHistory(finalMessages);

        } catch (error) {
            console.error("AI API Error:", error);
            const errorText = error?.message || String(error);
            const errorMessage = { role: 'assistant', content: `Sorry, I encountered an error: ${errorText}` };
            const finalMessages = [...newMessages, errorMessage];
            setMessages(finalMessages);
            saveChatHistory(finalMessages);
        } finally {
            setIsTyping(false);
        }
    };

    const handleClearChat = async () => {
        if (!user?.uid) return;
        if (window.confirm("Are you sure you want to clear your chat history?")) {
            const welcomeMsg = { role: 'assistant', content: 'Chat history cleared. How can I help you today?' };
            setMessages([welcomeMsg]);
            await setDoc(doc(db, 'chats', user.uid), { messages: [welcomeMsg] });
        }
    };

    if (isInitializing) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-primary-teal" size={48} />
            </div>
        );
    }

    if (!apiKey) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center mt-20">
                <div className="card-premium p-10 bg-health-warning/10 border-health-warning">
                    <h2 className="text-2xl font-bold text-health-warning mb-4">API Key Missing</h2>
                    <p className="text-health-text-secondary mb-6">
                        To use the AI Chat feature, please set the <code className="bg-white p-1 rounded">VITE_GEMINI_API_KEY</code> environment variable in your <code className="bg-white p-1 rounded">.env</code> file.
                        You can get a Gemini API key from Google AI Studio.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-80px)] mt-16 flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-primary-navy flex items-center gap-3">
                        <Bot className="text-primary-teal" size={32} />
                        Aarogya Health AI
                    </h1>
                    <p className="text-health-text-secondary text-sm">Powered by Gemma 3</p>
                </div>
                <button
                    onClick={handleClearChat}
                    className="flex items-center gap-2 text-sm text-health-text-muted hover:text-health-danger transition-colors bg-white px-4 py-2 rounded-lg border border-health-border shadow-sm"
                >
                    <RefreshCw size={14} /> Clear History
                </button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl border border-health-border flex flex-col overflow-hidden relative">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-health-bg/30">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`max-w-[80%] rounded-2xl p-4 shadow-sm flex gap-4 ${msg.role === 'user'
                                    ? 'bg-primary-teal text-white rounded-br-sm'
                                    : 'bg-white border border-health-border text-primary-navy rounded-bl-sm'
                                    }`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="mt-1 shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-primary-teal/10 flex items-center justify-center">
                                            <Bot size={18} className="text-primary-teal" />
                                        </div>
                                    </div>
                                )}
                                <div className="leading-relaxed whitespace-pre-wrap text-[15px]">
                                    {msg.content}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="mt-1 shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                                            {user?.photoURL ? (
                                                <img src={user.photoURL} alt="user" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={18} className="text-white" />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="bg-white border border-health-border rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary-teal/10 flex items-center justify-center shrink-0">
                                    <Bot size={18} className="text-primary-teal" />
                                </div>
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-health-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 rounded-full bg-health-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 rounded-full bg-health-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </motion.div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-health-border shrink-0">
                    <form onSubmit={handleSend} className="relative flex items-end gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                            placeholder="Ask about health concerns, costs, or procedures..."
                            className="w-full bg-health-bg border border-health-border rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-primary-teal focus:ring-1 focus:ring-primary-teal resize-none text-[15px]"
                            rows="1"
                            style={{ minHeight: '52px', maxHeight: '150px' }}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 bottom-2 p-2 bg-primary-teal text-white rounded-lg hover:bg-[#098A8A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <Send size={18} className={isTyping ? "opacity-0" : "opacity-100"} />
                            {isTyping && <Loader2 size={18} className="absolute animate-spin" />}
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-health-text-muted mt-2">
                        AI can make mistakes. For serious health issues, please consult a real doctor.
                    </p>
                </div>
            </div >
        </div >
    );
};

export default AIChat;

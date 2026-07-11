'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Headset, Send, X, Paperclip, Phone, Bot, User, Check, AlertCircle, RefreshCw, Smile, ArrowRight, CornerDownLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: Date;
}

const PRESET_QUESTIONS_AI = [
  "Viettel Cloud Server có ưu điểm gì? 🚀",
  "Trung tâm dữ liệu Hòa Lạc III đạt chuẩn nào? 🏢",
  "Tư vấn tuân thủ Nghị định 13 về bảo vệ dữ liệu 🛡️",
  "Làm sao để đăng ký dùng thử GPU Cloud? 🧠"
];

const PRESET_QUESTIONS_CONSULTANT = [
  "Yêu cầu báo giá Cloud Server mới nhất 💰",
  "Đăng ký tham quan trực tiếp Data Center 🏢",
  "Muốn nhận cuộc gọi tư vấn lại sau 5 phút 📞",
  "Hỏi chương trình khuyến mãi tháng này 🎁"
];

export default function ChatbotWidgets() {
  const [activeTab, setActiveTab] = useState<'ai' | 'consultant' | null>(null);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      id: 'ai-init',
      sender: 'bot',
      text: "Xin chào! Tôi là **ViDa** - Trợ lý AI từ Viettel IDC. Tôi sẵn sàng hỗ trợ bạn về Cloud, Data Center & Bảo mật 24/7. Bạn cần tôi giúp gì hôm nay?",
      timestamp: new Date()
    }
  ]);
  const [consultantMessages, setConsultantMessages] = useState<Message[]>([
    {
      id: 'cons-init',
      sender: 'agent',
      text: "Dạ Minh Thư xin chào anh/chị! Em là chuyên viên tư vấn giải pháp hạ tầng số tại Viettel IDC. Rất vui được kết nối hỗ trợ anh/chị ạ! 🥰\n\nAnh/chị cần em hỗ trợ tư vấn báo giá dịch vụ hay đăng ký trải nghiệm thực tế hạ tầng của Viettel IDC hôm nay thế ạ?",
      timestamp: new Date()
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCallbackSuccess, setShowCallbackSuccess] = useState(false);
  const [isAiHovered, setIsAiHovered] = useState(false);
  const [isConsultantHovered, setIsConsultantHovered] = useState(false);
  
  // Ref for auto scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdCounter = useRef(0);

  const generateId = () => {
    msgIdCounter.current += 1;
    return `msg-${msgIdCounter.current}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab) {
      scrollToBottom();
    }
  }, [activeTab, aiMessages, consultantMessages, isTyping]);

  // Clean simple markdown text formatter to avoid react-markdown overhead/bugs
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Process bold markers (**text**)
      let content: React.ReactNode = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      if (line.trim().startsWith('- ')) {
        const rest = line.substring(2);
        content = (
          <li key={idx} className="list-disc ml-4 mt-1">
            {renderBoldText(rest)}
          </li>
        );
      } else if (line.trim().startsWith('* ')) {
        const rest = line.substring(2);
        content = (
          <li key={idx} className="list-disc ml-4 mt-1">
            {renderBoldText(rest)}
          </li>
        );
      } else {
        content = <p key={idx} className="leading-relaxed mb-1">{renderBoldText(line)}</p>;
      }
      return content;
    });
  };

  const renderBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-black">{part}</strong>;
      }
      return part;
    });
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const currentTab = activeTab;
    if (!currentTab) return;

    const userMsg: Message = {
      id: generateId(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    if (currentTab === 'ai') {
      setAiMessages(prev => [...prev, userMsg]);
    } else {
      setConsultantMessages(prev => [...prev, userMsg]);
    }

    setInputVal('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          type: currentTab
        })
      });

      const data = await response.json();
      
      const botMsg: Message = {
        id: generateId(),
        sender: currentTab === 'ai' ? 'bot' : 'agent',
        text: data.text || "Xin lỗi, em chưa thể phản hồi lúc này. Anh/chị vui lòng thử lại sau ít phút hoặc để lại thông tin liên hệ nhé!",
        timestamp: new Date()
      };

      if (currentTab === 'ai') {
        setAiMessages(prev => [...prev, botMsg]);
      } else {
        setConsultantMessages(prev => [...prev, botMsg]);
      }
    } catch (error) {
      console.error("Error sending chat:", error);
      const errMsg: Message = {
        id: generateId(),
        sender: currentTab === 'ai' ? 'bot' : 'agent',
        text: "Hệ thống đang gặp sự cố kết nối. Minh Thư đã ghi nhận thông tin, anh/chị có thể vui lòng liên lạc Hotline miễn cước **1800 8088** để được giải quyết trực tiếp tức thì nhé!",
        timestamp: new Date()
      };
      if (currentTab === 'ai') {
        setAiMessages(prev => [...prev, errMsg]);
      } else {
        setConsultantMessages(prev => [...prev, errMsg]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Special action handler for preset buttons
  const handlePresetClick = (question: string) => {
    // If user clicked "Muốn nhận cuộc gọi tư vấn lại" or "Yêu cầu chuyên viên gọi lại"
    if (question.includes("gọi lại tư vấn") || question.includes("gọi lại sau 5 phút")) {
      const currentTab = activeTab;
      const userMsg: Message = {
        id: generateId(),
        sender: 'user',
        text: question,
        timestamp: new Date()
      };
      
      if (currentTab === 'ai') {
        setAiMessages(prev => [...prev, userMsg]);
      } else {
        setConsultantMessages(prev => [...prev, userMsg]);
      }

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const autoReply: Message = {
          id: generateId(),
          sender: currentTab === 'ai' ? 'bot' : 'agent',
          text: "Dạ vâng ạ! Hệ thống đã kích hoạt yêu cầu cuộc gọi tư vấn khẩn cấp của anh/chị. Chuyên viên tư vấn Viettel IDC sẽ liên lạc lại cho mình trong vòng 5 phút tới qua số hotline 1800 8088. Cảm ơn anh/chị!",
          timestamp: new Date()
        };
        if (currentTab === 'ai') {
          setAiMessages(prev => [...prev, autoReply]);
        } else {
          setConsultantMessages(prev => [...prev, autoReply]);
        }
        setShowCallbackSuccess(true);
        setTimeout(() => setShowCallbackSuccess(false), 5000);
      }, 1200);
      return;
    }

    handleSendMessage(question);
  };

  const toggleTab = (tab: 'ai' | 'consultant') => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  const hasConversationStarted = activeTab === 'ai'
    ? aiMessages.some(m => m.sender === 'user')
    : consultantMessages.some(m => m.sender === 'user');

  return (
    <div id="chatbot-container-wrapper" className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      
      {/* Floating Chat Windows with AnimatePresence */}
      <AnimatePresence mode="wait">
        {activeTab && (
          <motion.div
            key={activeTab}
            id="chatbot-floating-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[440px] max-w-[calc(100vw-2rem)] h-[610px] max-h-[85vh] bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col z-50"
          >
            {/* 1. HEADER */}
            {activeTab === 'ai' ? (
              <div id="ai-chat-header" className="bg-gradient-to-r from-[#EE0033] to-[#FF4D71] p-5 text-white relative">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-base tracking-tight font-sans">ViDa - Trợ lý AI</h3>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <p className="text-white/80 text-[11px] font-medium tracking-wide">Trả lời tự động dựa trên Gemini AI</p>
                  </div>
                </div>
                <button 
                  id="close-ai-chat-btn"
                  onClick={() => setActiveTab(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div id="consultant-chat-header" className="bg-[#1A1A1A] p-5 text-white relative border-b border-white/10">
                <div className="flex items-center space-x-3.5">
                  <div className="relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
                      alt="Consultant Nguyen Minh Thu"
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-[#EE0033]/80"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1A1A1A]" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-base tracking-tight font-sans text-white">Nguyễn Minh Thư</h3>
                      <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Đang trực</span>
                    </div>
                    <p className="text-gray-400 text-[11px] font-medium tracking-wide">Chuyên viên tư vấn Viettel IDC</p>
                  </div>
                </div>
                
                <div className="absolute top-5 right-5 flex items-center space-x-2">
                  <a 
                    id="call-consultant-btn"
                    href="tel:18008088" 
                    title="Gọi tổng đài miễn cước 18008088"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-[#EE0033] border border-white/10"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                  </a>
                  <button 
                    id="close-consultant-chat-btn"
                    onClick={() => setActiveTab(null)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. CHAT VIEWPORT */}
            <div id="chat-messages-viewport" className="flex-1 overflow-y-auto p-5 bg-[#FAFAFA] space-y-4">
              
              {/* Callout notice for human consultant */}
              {activeTab === 'consultant' && (
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex items-start space-x-2.5 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Hỗ trợ nhanh 24/7</span>
                    Anh/Chị có thể chat trực tiếp dưới đây hoặc click icon cuộc gọi phía trên để liên hệ trực tiếp tổng đài chăm sóc khách hàng miễn phí **1800 8088** của Viettel IDC.
                  </div>
                </div>
              )}

              {/* Message list */}
              {((activeTab === 'ai' ? aiMessages : consultantMessages) || []).map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "flex items-end space-x-2 max-w-[85%]",
                      isUser ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                    )}
                  >
                    {/* Avatar */}
                    {!isUser && (
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm text-xs font-bold",
                        msg.sender === 'bot' 
                          ? "bg-gradient-to-br from-[#EE0033] to-[#FF4D71] text-white" 
                          : "bg-gray-200"
                      )}>
                        {msg.sender === 'bot' ? (
                          <Sparkles className="w-3.5 h-3.5" />
                        ) : (
                          <Image 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
                            alt="avatar"
                            width={28}
                            height={28}
                            className="w-full h-full object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                    )}

                    {/* Speech Bubble */}
                    <div className={cn(
                      "p-3.5 rounded-[14px] text-sm shadow-sm border",
                      isUser 
                        ? "bg-[#EE0033] text-white border-[#EE0033] rounded-br-none" 
                        : "bg-white text-black border-gray-100 rounded-bl-none"
                    )}>
                      {renderMessageText(msg.text)}
                      <span className={cn(
                        "block text-[9px] mt-1.5 text-right font-mono",
                        isUser ? "text-white/70" : "text-gray-400"
                      )}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end space-x-2 max-w-[80%] mr-auto">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm text-xs",
                    activeTab === 'ai' ? "bg-[#EE0033] text-white" : "bg-gray-200 text-gray-700"
                  )}>
                    {activeTab === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className="bg-white border border-gray-100 p-3 rounded-[14px] rounded-bl-none shadow-sm flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Callback Success Toast inside Chat */}
              {showCallbackSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-[14px] flex items-center space-x-3 text-xs text-emerald-800 shadow-md animate-fade-in-up">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block mb-0.5">Đặt lịch thành công!</span>
                    Hệ thống đang điều phối cuộc gọi, vui lòng giữ máy.
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3. SUGGESTED CHIPS */}
            {!hasConversationStarted && (
              <div id="preset-suggestions-panel" className="bg-[#FAF9F9]/80 px-5 pt-3 pb-3 border-t border-gray-100/80 flex flex-col space-y-2">
                <div className="flex items-center space-x-1.5 opacity-80">
                  <Sparkles className={cn("w-3.5 h-3.5", activeTab === 'ai' ? "text-[#EE0033]" : "text-gray-500")} />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    {activeTab === 'ai' ? 'Gợi ý câu hỏi cho ViDA' : 'Yêu cầu hỗ trợ nhanh'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(activeTab === 'ai' ? PRESET_QUESTIONS_AI : PRESET_QUESTIONS_CONSULTANT).map((q, i) => (
                    <button
                      key={i}
                      id={`preset-question-${activeTab}-${i}`}
                      onClick={() => handlePresetClick(q)}
                      disabled={isTyping}
                      className={cn(
                        "text-left text-xs bg-white border border-gray-200/50 rounded-lg px-3 py-1.5 text-gray-600 transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between group w-full sm:w-auto",
                        activeTab === 'ai' 
                          ? "hover:bg-[#EE0033]/5 hover:border-[#EE0033]/20 hover:text-[#EE0033] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(238,0,51,0.06)]" 
                          : "hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                      )}
                    >
                      <span className="truncate max-w-[340px] font-medium">{q}</span>
                      <ArrowRight className={cn(
                        "w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ml-1.5 shrink-0",
                        activeTab === 'ai' ? "text-[#EE0033]" : "text-gray-800"
                      )} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CHAT INPUT AT BOTTOM */}
            <form 
              id="chatbot-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2"
            >
              <div className="relative flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-[14px] px-3 focus-within:border-[#EE0033] focus-within:ring-1 focus-within:ring-[#EE0033]/20 transition-all">
                <input 
                  id="chat-text-input"
                  type="text" 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={activeTab === 'ai' ? "Hỏi Trợ lý AI bất cứ điều gì..." : "Nhập tin nhắn hỗ trợ..."}
                  className="flex-1 bg-transparent py-3 text-sm text-gray-800 outline-none placeholder-gray-400"
                />
                <button 
                  type="button" 
                  title="Đính kèm tài liệu hỗ trợ"
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>
              <button 
                id="send-chat-message-btn"
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className={cn(
                  "w-11 h-11 rounded-[14px] flex items-center justify-center transition-all cursor-pointer shadow-md",
                  inputVal.trim() && !isTyping
                    ? (activeTab === 'ai' ? "bg-[#EE0033] hover:bg-[#FF1A4E]" : "bg-[#1A1A1A] hover:bg-[#2A2A2A]") + " text-white"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Column */}
      <div id="floating-trigger-buttons" className="flex flex-col space-y-3.5 items-end">
        
        {/* BUTTON 1: BOT AI CHATBOT (Glowing Red) */}
        <div 
          className="group relative flex items-center"
          onMouseEnter={() => setIsAiHovered(true)}
          onMouseLeave={() => setIsAiHovered(false)}
        >
          <AnimatePresence>
            {activeTab !== 'ai' && isAiHovered && (
              <motion.div 
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm px-4 py-3 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 whitespace-nowrap pointer-events-none flex flex-col justify-center min-w-[280px]"
              >
                <div className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                  Xin chào! Tôi là Trợ lý AI ViDa.
                </div>
                <div className="text-gray-500 text-[11px] leading-normal font-normal">
                  Tôi sẵn sàng hỗ trợ bạn về Cloud, Data Center & Bảo mật.
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 rotate-45 bg-white border-r border-t border-gray-100" />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            id="trigger-chatbot-ai-btn"
            onClick={() => {
              toggleTab('ai');
              setIsAiHovered(false);
            }}
            className={cn(
              "w-12 h-12 rounded-[14px] flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer relative",
              activeTab === 'ai' 
                ? "bg-white text-[#EE0033] border border-gray-200/80 rotate-90 scale-105" 
                : "bg-gradient-to-br from-[#EE0033] to-[#FF3B66] text-white hover:scale-105 hover:shadow-[0_8px_20px_rgba(238,0,51,0.4)]"
            )}
            title="Trò chuyện với ViDA - Trợ lý AI Viettel IDC"
          >
            {/* Pulsing glow ring when inactive */}
            {activeTab !== 'ai' && (
              <span className="absolute -inset-1 rounded-[14px] border-2 border-[#EE0033]/30 animate-pulse" />
            )}
            {activeTab === 'ai' ? (
              <X className="w-5 h-5" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* BUTTON 2: HUMAN CONSULTANT (Sleek Charcoal Slate) */}
        <div 
          className="group relative flex items-center"
          onMouseEnter={() => setIsConsultantHovered(true)}
          onMouseLeave={() => setIsConsultantHovered(false)}
        >
          <AnimatePresence>
            {activeTab !== 'consultant' && isConsultantHovered && (
              <motion.div 
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm px-4 py-3 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 whitespace-nowrap pointer-events-none flex flex-col justify-center min-w-[280px]"
              >
                <div className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                  Xin chào! Tôi là Minh Thư.
                </div>
                <div className="text-gray-500 text-[11px] leading-normal font-normal">
                  Tôi sẵn sàng tư vấn giải pháp & báo giá dịch vụ.
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 rotate-45 bg-white border-r border-t border-gray-100" />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            id="trigger-chatbot-consultant-btn"
            onClick={() => {
              toggleTab('consultant');
              setIsConsultantHovered(false);
            }}
            className={cn(
              "w-12 h-12 rounded-[14px] flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer relative",
              activeTab === 'consultant' 
                ? "bg-white text-gray-900 border border-gray-200/80 rotate-90 scale-105" 
                : "bg-[#1A1A1A] text-white hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-white/10"
            )}
            title="Chat trực tuyến với Nguyễn Minh Thư (Tư vấn viên)"
          >
            {activeTab === 'consultant' ? (
              <X className="w-5 h-5" />
            ) : (
              <Headset className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

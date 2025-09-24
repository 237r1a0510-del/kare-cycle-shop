import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickReplies = {
    en: [
      "What eco-friendly products do you have?",
      "Tell me about sustainability",
      "How can I reduce waste?",
      "What are the benefits of organic products?"
    ],
    hi: [
      "आपके पास कौन से पर्यावरण-अनुकूल उत्पाद हैं?",
      "स्थिरता के बारे में बताएं",
      "मैं कैसे कचरा कम कर सकता हूं?",
      "जैविक उत्पादों के क्या फायदे हैं?"
    ],
    es: [
      "¿Qué productos ecológicos tienen?",
      "Háblame sobre sostenibilidad",
      "¿Cómo puedo reducir los residuos?",
      "¿Cuáles son los beneficios de los productos orgánicos?"
    ]
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'es', name: 'Español' }
  ];

  const welcomeMessages = {
    en: "Hello! I'm here to help you with questions about our eco-friendly products and sustainable living. How can I assist you today?",
    hi: "नमस्ते! मैं आपके पर्यावरण-अनुकूल उत्पादों और टिकाऊ जीवन के बारे में प्रश्नों में आपकी सहायता करने के लिए यहाँ हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?",
    es: "¡Hola! Estoy aquí para ayudarte con preguntas sobre nuestros productos ecológicos y vida sostenible. ¿Cómo puedo asistirte hoy?"
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: welcomeMessages[language as keyof typeof welcomeMessages],
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToAI = async (message: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chat-bot', {
        body: { message, language }
      });

      if (error) throw error;
      
      return data.response || "I'm sorry, I couldn't process your message right now. Please try again.";
    } catch (error) {
      console.error('Error calling chatbot:', error);
      return "I'm experiencing some technical difficulties. Please try again later or contact our support team.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponseText = await sendMessageToAI(currentMessage);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bot className="h-4 w-4 text-primary" />
              EcoHarvest Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Language Selection & Quick Replies */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Language
                </span>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2">
                  {quickReplies[language as keyof typeof quickReplies].map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 bg-white rounded-full text-sm border hover:bg-gray-100 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.isBot && <Bot className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                        <span>{message.text}</span>
                        {!message.isBot && <User className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-xs bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }} className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={language === 'hi' ? 'अपना संदेश लिखें...' : language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button type="submit" size="sm" className="shrink-0" disabled={isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
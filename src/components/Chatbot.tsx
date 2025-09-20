import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with any questions about our eco-friendly products and services. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    'What products do you offer?',
    'How does vermicompost work?',
    'Tell me about biogas plants',
    'How can I volunteer?',
    'Donation information'
  ];

  const botResponses: { [key: string]: string } = {
    'what products do you offer': 'We offer 5 eco-friendly product lines: Happy Raithu (vermicompost), Gracious Gas (biogas units), SBL Pots (eco gardening pots), Clayer (clay water bottles), and Neem Brush (biodegradable toothbrushes). Each product is designed to support sustainable living!',
    'how does vermicompost work': 'Vermicompost uses earthworms to break down organic waste into nutrient-rich fertilizer. It\'s completely natural, improves soil health, and reduces waste. Our Happy Raithu vermicompost is perfect for gardens and farms!',
    'tell me about biogas plants': 'Our Gracious Gas biogas units convert kitchen waste and organic matter into clean cooking gas. They reduce waste, provide renewable energy, and are available for both domestic and commercial use. Perfect for sustainable homes!',
    'how can i volunteer': 'We\'d love to have you join our volunteer community! You can help with environmental education, community outreach, event organization, and more. Visit our volunteer page to apply and make a difference!',
    'donation information': 'Your donations help us expand our impact! We support vermicompost production, biogas plant setup, environmental education, and community development. All donations are tax-deductible under 80G.',
    'hello': 'Hello there! Welcome to Kare 💖 Save - The Caring Cycle. I\'m here to help you learn about our sustainable products and services.',
    'hi': 'Hi! Great to meet you. How can I help you today with our eco-friendly solutions?',
    'price': 'Our prices vary by product. Vermicompost starts from ₹300, biogas units from ₹15,000, eco pots from ₹150, clay bottles from ₹800, and neem brushes from ₹150. Check our shop for detailed pricing!',
    'delivery': 'We offer delivery across India! Orders above ₹500 get free delivery. Standard delivery takes 3-5 business days. We use eco-friendly packaging for all shipments.',
    'contact': 'You can reach us at info@karesave.org or call +91 98765 43210. We\'re also available on WhatsApp for quick queries!',
    'return': 'We have a 7-day return policy for unused products. For consumables like vermicompost, we offer replacement for quality issues. Your satisfaction is our priority!'
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    if (botResponses[lowerMessage]) {
      return botResponses[lowerMessage];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key) || key.includes(lowerMessage)) {
        return response;
      }
    }
    
    // Default response
    return 'Thanks for your question! For specific inquiries, please contact us at info@karesave.org or call +91 98765 43210. Our team will be happy to help you with detailed information about our products and services.';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
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
              Eco Assistant
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
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
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
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-2 border-t">
                <div className="flex flex-wrap gap-1">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-6"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="text-sm"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
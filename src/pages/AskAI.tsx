import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Code, 
  Briefcase, 
  MapPin, 
  Mail, 
  Calendar,
  Zap,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { personalInfo, bio, stats, experience, faqItems } from '@/data/personal';
import { skills, technologies, skillsByCategory } from '@/data/skills';
import { socialLinks } from '@/data/social';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface KnowledgeBase {
  keywords: string[];
  response: string;
  icon?: React.ReactNode;
}

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm an AI assistant that knows everything about ${personalInfo.name}. Ask me about skills, experience, projects, or anything else!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Build knowledge base from personal data
  const knowledgeBase: KnowledgeBase[] = [
    // Basic info
    {
      keywords: ['who', 'name', 'about', 'introduce', 'yourself', 'tell me about'],
      response: `I'm ${personalInfo.name}, a ${personalInfo.title}. ${bio.medium}`,
    },
    {
      keywords: ['contact', 'email', 'reach', 'hire', 'message'],
      response: `You can reach ${personalInfo.name} at ${personalInfo.email}. Currently: ${personalInfo.availability}`,
    },
    {
      keywords: ['location', 'where', 'based', 'live', 'city'],
      response: `${personalInfo.name} is based in ${personalInfo.location}.`,
    },
    {
      keywords: ['available', 'hiring', 'job', 'work', 'opportunity'],
      response: `Current availability: ${personalInfo.availability}. Feel free to reach out at ${personalInfo.email} to discuss opportunities!`,
    },
    // Skills
    {
      keywords: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'know', 'use'],
      response: `Key technical skills include:\n\n${skills.map(s => `• ${s.name}: ${s.level}% proficiency`).join('\n')}\n\nAdditionally proficient in: ${technologies.slice(0, 10).map(t => t.name).join(', ')}, and more!`,
    },
    {
      keywords: ['frontend', 'front-end', 'ui', 'react', 'vue', 'css'],
      response: `Frontend expertise:\n${skillsByCategory.frontend.join(', ')}\n\nSpecializing in React with ${skills.find(s => s.name === 'React')?.level}% proficiency!`,
    },
    {
      keywords: ['backend', 'back-end', 'server', 'node', 'api', 'database'],
      response: `Backend skills:\n${skillsByCategory.backend.join(', ')}\n\nDatabase: ${skillsByCategory.database.join(', ')}`,
    },
    {
      keywords: ['testing', 'test', 'jest', 'cypress', 'qa'],
      response: `Testing expertise:\n${skillsByCategory.testing.join(', ')}\n\nStrong believer in test-driven development!`,
    },
    // Experience
    {
      keywords: ['experience', 'work history', 'career', 'job history', 'worked', 'company'],
      response: experience.map(exp => 
        `**${exp.role}** at ${exp.company} (${exp.period})\n${exp.description}\nTech: ${exp.technologies.join(', ')}`
      ).join('\n\n'),
    },
    {
      keywords: ['years', 'how long', 'experience years'],
      response: `${personalInfo.name} has ${stats.yearsExperience}+ years of professional experience, having completed ${stats.projectsCompleted}+ projects!`,
    },
    // Stats
    {
      keywords: ['projects', 'portfolio', 'built', 'created', 'work'],
      response: `Project stats:\n• ${stats.projectsCompleted}+ projects completed\n• ${stats.happyClients}+ happy clients\n• ${stats.linesOfCode} lines of code written\n• ${stats.openSourceContributions}+ open source contributions`,
    },
    {
      keywords: ['github', 'open source', 'contributions', 'repositories'],
      response: `Active open source contributor with ${stats.openSourceContributions}+ contributions! Check out the GitHub profile for repositories and activity.`,
    },
    // FAQ items
    ...faqItems.map(faq => ({
      keywords: faq.question.toLowerCase().split(' ').filter(w => w.length > 3),
      response: `**${faq.question}**\n\n${faq.answer}`,
    })),
    // Social
    {
      keywords: ['social', 'twitter', 'linkedin', 'connect', 'follow'],
      response: `Connect on social media:\n${socialLinks.map(s => `• ${s.label}: ${s.href}`).join('\n')}`,
    },
    // Fun
    {
      keywords: ['coffee', 'fun', 'hobby', 'interesting'],
      response: `Fun fact: ${stats.coffeeConsumed} cups of coffee consumed while coding! ☕`,
    },
  ];

  const findBestResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Score each knowledge entry
    let bestMatch: KnowledgeBase | null = null;
    let bestScore = 0;
    
    for (const entry of knowledgeBase) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer matches score higher
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }
    
    if (bestMatch && bestScore > 3) {
      return bestMatch.response;
    }
    
    // Default responses
    const defaultResponses = [
      `I can tell you about ${personalInfo.name}'s skills, experience, projects, or how to get in touch. What would you like to know?`,
      `Try asking about:\n• Technical skills and expertise\n• Work experience and career\n• Projects and portfolio\n• Contact information\n• Availability for opportunities`,
      `Hmm, I'm not sure about that. But I can share info about ${personalInfo.name}'s ${stats.yearsExperience}+ years of experience as a ${personalInfo.title}!`,
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const response = findBestResponse(userMessage.content);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What are your main skills?",
    "Tell me about your experience",
    "What projects have you built?",
    "How can I contact you?",
    "Are you available for work?",
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Ask Me Anything
          </h1>
          <p className="text-muted-foreground">
            Chat with an AI that knows everything about {personalInfo.name}
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl border border-border/50 overflow-hidden"
        >
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'assistant'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <Bot className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'assistant'
                        ? 'bg-muted/50 text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted/50 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="px-3 py-1.5 text-xs rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border/50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-background/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about me..."
                className="flex-1 bg-muted/50 border-border/50"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Code, label: 'Skills', value: `${skills.length}+` },
            { icon: Briefcase, label: 'Experience', value: `${stats.yearsExperience}+ yrs` },
            { icon: Zap, label: 'Projects', value: `${stats.projectsCompleted}+` },
            { icon: Calendar, label: 'Status', value: 'Available' },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-4 text-center border border-border/50"
            >
              <item.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="text-lg font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AskAI;

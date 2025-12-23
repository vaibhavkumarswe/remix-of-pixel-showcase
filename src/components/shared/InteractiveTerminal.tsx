import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  content: string;
}

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal = ({ isOpen, onClose }: InteractiveTerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', content: '╔══════════════════════════════════════════════════════════╗' },
    { type: 'info', content: '║  Welcome to Dev Terminal v1.0.0                          ║' },
    { type: 'info', content: '║  Type "help" to see available commands                   ║' },
    { type: 'info', content: '╚══════════════════════════════════════════════════════════╝' },
    { type: 'output', content: '' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => TerminalLine[]> = {
    help: () => [
      { type: 'output', content: '' },
      { type: 'info', content: '📚 Available Commands:' },
      { type: 'output', content: '' },
      { type: 'output', content: '  about      - Learn about the developer' },
      { type: 'output', content: '  skills     - List technical skills' },
      { type: 'output', content: '  projects   - View project highlights' },
      { type: 'output', content: '  contact    - Get contact information' },
      { type: 'output', content: '  social     - Social media links' },
      { type: 'output', content: '  experience - Work experience summary' },
      { type: 'output', content: '  education  - Educational background' },
      { type: 'output', content: '  joke       - Tell a programming joke' },
      { type: 'output', content: '  matrix     - Enter the matrix...' },
      { type: 'output', content: '  clear      - Clear terminal' },
      { type: 'output', content: '  exit       - Close terminal' },
      { type: 'output', content: '' },
    ],
    about: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '👨‍💻 About Me' },
      { type: 'output', content: '' },
      { type: 'output', content: '  Name: Creative Developer' },
      { type: 'output', content: '  Role: Senior Frontend Engineer' },
      { type: 'output', content: '  Location: San Francisco, CA' },
      { type: 'output', content: '  Experience: 8+ years' },
      { type: 'output', content: '' },
      { type: 'output', content: '  I craft beautiful, performant web experiences' },
      { type: 'output', content: '  with a focus on user delight and accessibility.' },
      { type: 'output', content: '' },
    ],
    skills: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '🛠️ Technical Skills' },
      { type: 'output', content: '' },
      { type: 'output', content: '  Frontend:' },
      { type: 'info', content: '    ████████████████████ React       95%' },
      { type: 'info', content: '    ███████████████████░ TypeScript  90%' },
      { type: 'info', content: '    ██████████████████░░ Next.js     85%' },
      { type: 'info', content: '    █████████████████░░░ Vue.js      80%' },
      { type: 'output', content: '' },
      { type: 'output', content: '  Backend:' },
      { type: 'info', content: '    ██████████████████░░ Node.js     85%' },
      { type: 'info', content: '    ███████████████░░░░░ Python      70%' },
      { type: 'info', content: '    ██████████████░░░░░░ PostgreSQL  65%' },
      { type: 'output', content: '' },
    ],
    projects: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '🚀 Featured Projects' },
      { type: 'output', content: '' },
      { type: 'info', content: '  1. E-Commerce Platform' },
      { type: 'output', content: '     Next.js + TypeScript + Stripe' },
      { type: 'output', content: '     Full-featured online store with 100K+ users' },
      { type: 'output', content: '' },
      { type: 'info', content: '  2. Design System' },
      { type: 'output', content: '     React + Storybook + Tailwind' },
      { type: 'output', content: '     50+ accessible components' },
      { type: 'output', content: '' },
      { type: 'info', content: '  3. AI Writing Assistant' },
      { type: 'output', content: '     Next.js + OpenAI + TipTap' },
      { type: 'output', content: '     Real-time AI-powered writing tool' },
      { type: 'output', content: '' },
    ],
    contact: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '📬 Contact Information' },
      { type: 'output', content: '' },
      { type: 'output', content: '  Email:    hello@developer.com' },
      { type: 'output', content: '  Location: San Francisco, CA' },
      { type: 'output', content: '  Status:   ● Open to opportunities' },
      { type: 'output', content: '' },
      { type: 'info', content: '  Response time: Usually within 24 hours' },
      { type: 'output', content: '' },
    ],
    social: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '🔗 Social Links' },
      { type: 'output', content: '' },
      { type: 'output', content: '  GitHub:   github.com/developer' },
      { type: 'output', content: '  LinkedIn: linkedin.com/in/developer' },
      { type: 'output', content: '  Twitter:  twitter.com/developer' },
      { type: 'output', content: '' },
    ],
    experience: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '💼 Work Experience' },
      { type: 'output', content: '' },
      { type: 'info', content: '  2023 - Present | Senior Frontend Engineer' },
      { type: 'output', content: '                 | Tech Startup' },
      { type: 'output', content: '' },
      { type: 'info', content: '  2020 - 2023    | Frontend Developer' },
      { type: 'output', content: '                 | Digital Agency' },
      { type: 'output', content: '' },
      { type: 'info', content: '  2018 - 2020    | Full Stack Developer' },
      { type: 'output', content: '                 | Software Company' },
      { type: 'output', content: '' },
    ],
    education: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '🎓 Education' },
      { type: 'output', content: '' },
      { type: 'output', content: '  B.S. Computer Science' },
      { type: 'output', content: '  University of Technology' },
      { type: 'output', content: '  Graduated: 2016' },
      { type: 'output', content: '' },
      { type: 'info', content: '  Certifications:' },
      { type: 'output', content: '  - AWS Certified Developer' },
      { type: 'output', content: '  - Google Cloud Professional' },
      { type: 'output', content: '' },
    ],
    joke: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
        'A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?" 🍺',
        'Why do Java developers wear glasses? Because they can\'t C# 👓',
        '!false - It\'s funny because it\'s true 😄',
        'There are only 10 types of people in the world: those who understand binary and those who don\'t 🤖',
        'A programmer\'s wife tells him: "Go to the store and get a loaf of bread. If they have eggs, get a dozen." He returns with 12 loaves of bread 🍞',
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return [
        { type: 'output', content: '' },
        { type: 'success', content: '😄 Programming Joke' },
        { type: 'output', content: '' },
        { type: 'output', content: `  ${randomJoke}` },
        { type: 'output', content: '' },
      ];
    },
    matrix: () => [
      { type: 'output', content: '' },
      { type: 'success', content: '🔴 The Matrix has you...' },
      { type: 'output', content: '' },
      { type: 'info', content: '  01001000 01000101 01001100 01001100 01001111' },
      { type: 'info', content: '  ░▒▓█ Follow the white rabbit █▓▒░' },
      { type: 'info', content: '  01010111 01001111 01010010 01001100 01000100' },
      { type: 'output', content: '' },
      { type: 'output', content: '  Wake up, Neo...' },
      { type: 'output', content: '' },
    ],
    clear: () => [],
    exit: () => {
      setTimeout(onClose, 100);
      return [{ type: 'info', content: 'Closing terminal... Goodbye! 👋' }];
    },
  };

  const executeCommand = useCallback((input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      { type: 'input', content: `$ ${input}` },
    ];

    if (trimmedInput === '') {
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    if (trimmedInput === 'clear') {
      setLines([]);
      return;
    }

    const commandFn = commands[trimmedInput];
    if (commandFn) {
      newLines.push(...commandFn());
    } else {
      newLines.push(
        { type: 'error', content: `Command not found: ${input}` },
        { type: 'output', content: 'Type "help" for available commands.' },
        { type: 'output', content: '' },
      );
    }

    setLines((prev) => [...prev, ...newLines]);
    setCommandHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const getLineClass = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'text-primary';
      case 'error':
        return 'text-destructive';
      case 'success':
        return 'text-green-500';
      case 'info':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-border"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  />
                  <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                  <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TerminalIcon className="h-4 w-4" />
                  <span>dev-terminal</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-secondary rounded">
                  <Minus className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-1 hover:bg-secondary rounded">
                  <Square className="h-3 w-3 text-muted-foreground" />
                </button>
                <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              className="h-[400px] overflow-y-auto p-4 bg-card font-mono text-sm leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, index) => (
                <div key={index} className={`${getLineClass(line.type)} whitespace-pre-wrap`}>
                  {line.content}
                </div>
              ))}
              
              {/* Current Input Line */}
              <div className="flex items-center text-primary">
                <span className="mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none caret-primary"
                  spellCheck={false}
                  autoComplete="off"
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-5 bg-primary ml-0.5"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

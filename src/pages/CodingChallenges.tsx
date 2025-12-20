import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, ChevronDown, Terminal, Eye, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

interface Challenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  initialHtml?: string;
  initialCss?: string;
}

const challenges: Challenge[] = [
  {
    id: 'counter',
    title: 'Counter Component',
    description: 'Build a counter with increment, decrement, and reset functionality.',
    initialCode: `// Counter Challenge
// Create a counter with +, -, and reset buttons

const container = document.getElementById('app');

let count = 0;

function render() {
  container.innerHTML = \`
    <div class="counter-wrapper">
      <h2 class="count">\${count}</h2>
      <div class="buttons">
        <button onclick="decrement()">-</button>
        <button onclick="reset()">Reset</button>
        <button onclick="increment()">+</button>
      </div>
    </div>
  \`;
}

function increment() {
  count++;
  render();
}

function decrement() {
  count--;
  render();
}

function reset() {
  count = 0;
  render();
}

render();`,
    initialCss: `.counter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #8b5cf6;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.buttons button {
  padding: 0.5rem 1.5rem;
  font-size: 1.25rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.buttons button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}`,
  },
  {
    id: 'todo',
    title: 'Todo List',
    description: 'Create a todo list with add, remove, and toggle complete functionality.',
    initialCode: `// Todo List Challenge
// Create a todo list with CRUD operations

const container = document.getElementById('app');

let todos = [
  { id: 1, text: 'Learn JavaScript', completed: false },
  { id: 2, text: 'Build projects', completed: true },
];
let nextId = 3;

function render() {
  container.innerHTML = \`
    <div class="todo-app">
      <h2>My Todos</h2>
      <div class="add-todo">
        <input type="text" id="todoInput" placeholder="Add new todo..." />
        <button onclick="addTodo()">Add</button>
      </div>
      <ul class="todo-list">
        \${todos.map(todo => \`
          <li class="\${todo.completed ? 'completed' : ''}">
            <input 
              type="checkbox" 
              \${todo.completed ? 'checked' : ''} 
              onchange="toggleTodo(\${todo.id})"
            />
            <span>\${todo.text}</span>
            <button onclick="removeTodo(\${todo.id})">×</button>
          </li>
        \`).join('')}
      </ul>
    </div>
  \`;
}

function addTodo() {
  const input = document.getElementById('todoInput');
  if (input.value.trim()) {
    todos.push({ id: nextId++, text: input.value.trim(), completed: false });
    render();
  }
}

function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render();
}

function removeTodo(id) {
  todos = todos.filter(t => t.id !== id);
  render();
}

render();`,
    initialCss: `.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.todo-app h2 {
  margin: 0 0 1rem;
  color: #8b5cf6;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-todo input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #333;
  border-radius: 6px;
  background: #1a1a2e;
  color: white;
}

.add-todo button {
  padding: 0.5rem 1rem;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #1a1a2e;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.todo-list li.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-list li button {
  margin-left: auto;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}`,
  },
  {
    id: 'accordion',
    title: 'Accordion Component',
    description: 'Build an accordion with expandable sections.',
    initialCode: `// Accordion Challenge
// Create an accordion component

const container = document.getElementById('app');

const items = [
  { id: 1, title: 'What is JavaScript?', content: 'JavaScript is a programming language that enables interactive web pages.' },
  { id: 2, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
  { id: 3, title: 'What is TypeScript?', content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.' },
];

let openId = null;

function render() {
  container.innerHTML = \`
    <div class="accordion">
      <h2>FAQ Accordion</h2>
      \${items.map(item => \`
        <div class="accordion-item \${openId === item.id ? 'open' : ''}">
          <button class="accordion-header" onclick="toggle(\${item.id})">
            <span>\${item.title}</span>
            <span class="icon">\${openId === item.id ? '−' : '+'}</span>
          </button>
          <div class="accordion-content">
            <p>\${item.content}</p>
          </div>
        </div>
      \`).join('')}
    </div>
  \`;
}

function toggle(id) {
  openId = openId === id ? null : id;
  render();
}

render();`,
    initialCss: `.accordion {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
}

.accordion h2 {
  margin: 0 0 1rem;
  color: #8b5cf6;
}

.accordion-item {
  background: #1a1a2e;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.accordion-header:hover {
  background: rgba(139, 92, 246, 0.1);
}

.icon {
  font-size: 1.25rem;
  color: #8b5cf6;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-item.open .accordion-content {
  max-height: 200px;
}

.accordion-content p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: #a1a1aa;
}`,
  },
  {
    id: 'tabs',
    title: 'Tabs Component',
    description: 'Create a tabbed interface component.',
    initialCode: `// Tabs Challenge
// Create a tabs component

const container = document.getElementById('app');

const tabs = [
  { id: 'html', label: 'HTML', content: 'HTML is the standard markup language for web pages.' },
  { id: 'css', label: 'CSS', content: 'CSS describes how HTML elements should be displayed.' },
  { id: 'js', label: 'JavaScript', content: 'JavaScript makes web pages interactive and dynamic.' },
];

let activeTab = 'html';

function render() {
  const currentTab = tabs.find(t => t.id === activeTab);
  
  container.innerHTML = \`
    <div class="tabs-container">
      <h2>Learn Web Development</h2>
      <div class="tabs-header">
        \${tabs.map(tab => \`
          <button 
            class="tab-btn \${activeTab === tab.id ? 'active' : ''}"
            onclick="setActiveTab('\${tab.id}')"
          >
            \${tab.label}
          </button>
        \`).join('')}
      </div>
      <div class="tab-content">
        <h3>\${currentTab.label}</h3>
        <p>\${currentTab.content}</p>
      </div>
    </div>
  \`;
}

function setActiveTab(id) {
  activeTab = id;
  render();
}

render();`,
    initialCss: `.tabs-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
}

.tabs-container h2 {
  margin: 0 0 1rem;
  color: #8b5cf6;
}

.tabs-header {
  display: flex;
  gap: 0.25rem;
  background: #1a1a2e;
  padding: 0.25rem;
  border-radius: 8px;
}

.tab-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: #a1a1aa;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: white;
}

.tab-btn.active {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
}

.tab-content {
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 0.5rem;
}

.tab-content h3 {
  margin: 0 0 0.5rem;
  color: #06b6d4;
}

.tab-content p {
  margin: 0;
  color: #a1a1aa;
  line-height: 1.6;
}`,
  },
  {
    id: 'modal',
    title: 'Modal Component',
    description: 'Build a modal/dialog component with open and close functionality.',
    initialCode: `// Modal Challenge
// Create a modal component

const container = document.getElementById('app');

let isOpen = false;

function render() {
  container.innerHTML = \`
    <div class="modal-demo">
      <h2>Modal Component</h2>
      <p>Click the button to open the modal</p>
      <button class="open-btn" onclick="openModal()">Open Modal</button>
      
      \${isOpen ? \`
        <div class="modal-overlay" onclick="closeModal()">
          <div class="modal" onclick="event.stopPropagation()">
            <div class="modal-header">
              <h3>Welcome!</h3>
              <button class="close-btn" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
              <p>This is a modal dialog. You can put any content here.</p>
              <p>Click outside or press the X button to close.</p>
            </div>
            <div class="modal-footer">
              <button onclick="closeModal()">Cancel</button>
              <button class="primary" onclick="handleConfirm()">Confirm</button>
            </div>
          </div>
        </div>
      \` : ''}
    </div>
  \`;
}

function openModal() {
  isOpen = true;
  render();
}

function closeModal() {
  isOpen = false;
  render();
}

function handleConfirm() {
  console.log('Confirmed!');
  closeModal();
}

render();`,
    initialCss: `.modal-demo {
  text-align: center;
  padding: 2rem;
}

.modal-demo h2 {
  color: #8b5cf6;
  margin: 0 0 0.5rem;
}

.modal-demo > p {
  color: #a1a1aa;
  margin: 0 0 1.5rem;
}

.open-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.open-btn:hover {
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: #1a1a2e;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
}

.modal-header h3 {
  margin: 0;
  color: white;
}

.close-btn {
  background: transparent;
  border: none;
  color: #a1a1aa;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin: 0 0 0.5rem;
  color: #a1a1aa;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #333;
}

.modal-footer button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #333;
  color: white;
}

.modal-footer button.primary {
  background: #8b5cf6;
}`,
  },
];

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

const CodingChallenges = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [code, setCode] = useState(challenges[0].initialCode);
  const [css, setCss] = useState(challenges[0].initialCss || '');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [activeTab, setActiveTab] = useState<'js' | 'css'>('js');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleChallengeChange = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (challenge) {
      setSelectedChallenge(challenge);
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
      setConsoleLogs([]);
    }
  };

  const handleReset = () => {
    setCode(selectedChallenge.initialCode);
    setCss(selectedChallenge.initialCss || '');
    setConsoleLogs([]);
  };

  const [previewHtml, setPreviewHtml] = useState('');

  const runCode = useCallback(() => {
    setConsoleLogs([]);
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              font-family: system-ui, -apple-system, sans-serif;
              background: #0f0f1a;
              color: white;
              min-height: 100vh;
            }
            ${css}
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script>
            (function() {
              const originalConsole = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info
              };
              
              function sendToParent(type, args) {
                window.parent.postMessage({
                  type: 'console',
                  logType: type,
                  content: args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' ')
                }, '*');
              }
              
              console.log = (...args) => {
                originalConsole.log(...args);
                sendToParent('log', args);
              };
              console.error = (...args) => {
                originalConsole.error(...args);
                sendToParent('error', args);
              };
              console.warn = (...args) => {
                originalConsole.warn(...args);
                sendToParent('warn', args);
              };
              console.info = (...args) => {
                originalConsole.info(...args);
                sendToParent('info', args);
              };
              
              window.onerror = function(msg, url, line, col, error) {
                sendToParent('error', [msg + ' (line ' + line + ')']);
                return false;
              };
            })();
            
            try {
              ${code}
            } catch (error) {
              console.error(error.message);
            }
          </script>
        </body>
      </html>
    `;
    
    setPreviewHtml(html);
  }, [code, css]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: event.data.logType,
            content: event.data.content,
            timestamp: new Date(),
          },
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    runCode();
  }, [runCode]);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            FE Machine Coding
          </h1>
          <p className="text-muted-foreground">
            Practice frontend interview questions with live code editor
          </p>
        </motion.div>

        {/* Challenge Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-4"
        >
          <Select
            value={selectedChallenge.id}
            onValueChange={handleChallengeChange}
          >
            <SelectTrigger className="w-[280px] glass-card border-border/50">
              <SelectValue placeholder="Select a challenge" />
            </SelectTrigger>
            <SelectContent>
              {challenges.map((challenge) => (
                <SelectItem key={challenge.id} value={challenge.id}>
                  {challenge.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              onClick={runCode}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Play className="h-4 w-4" />
              Run
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </motion.div>

        {/* Challenge Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 p-4 glass-card rounded-xl border border-border/50"
        >
          <h3 className="font-semibold text-foreground mb-1">
            {selectedChallenge.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedChallenge.description}
          </p>
        </motion.div>

        {/* Editor and Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-[calc(100vh-380px)] min-h-[500px] glass-card rounded-xl border border-border/50 overflow-hidden"
        >
          <ResizablePanelGroup direction="horizontal">
            {/* Code Editor Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                {/* Editor Tabs */}
                <div className="flex items-center gap-1 px-2 py-1 bg-background/50 border-b border-border/50">
                  <button
                    onClick={() => setActiveTab('js')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'js'
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-4 w-4" />
                    JavaScript
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'css'
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className="h-4 w-4" />
                    CSS
                  </button>
                </div>

                {/* Monaco Editor */}
                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={activeTab === 'js' ? 'javascript' : 'css'}
                    value={activeTab === 'js' ? code : css}
                    onChange={(value) => {
                      if (activeTab === 'js') {
                        setCode(value || '');
                      } else {
                        setCss(value || '');
                      }
                    }}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      fontFamily: 'JetBrains Mono, monospace',
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      automaticLayout: true,
                      padding: { top: 16 },
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Preview and Console Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup direction="vertical">
                {/* Preview */}
                <ResizablePanel defaultSize={70} minSize={30}>
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 px-4 py-2 bg-background/50 border-b border-border/50">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Preview</span>
                    </div>
                    <div className="flex-1 bg-[#0f0f1a]">
                      <iframe
                        ref={iframeRef}
                        title="Preview"
                        className="w-full h-full border-0"
                        sandbox="allow-scripts"
                        srcDoc={previewHtml}
                      />
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Console */}
                <ResizablePanel defaultSize={30} minSize={15}>
                  <div className="h-full flex flex-col bg-[#1a1a2e]">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Console</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setConsoleLogs([])}
                        className="h-6 px-2 text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="flex-1 overflow-auto p-2 font-mono text-sm">
                      {consoleLogs.length === 0 ? (
                        <p className="text-muted-foreground text-xs">
                          Console output will appear here...
                        </p>
                      ) : (
                        consoleLogs.map((log, index) => (
                          <div
                            key={index}
                            className={`py-1 px-2 rounded ${
                              log.type === 'error'
                                ? 'text-red-400 bg-red-500/10'
                                : log.type === 'warn'
                                ? 'text-yellow-400 bg-yellow-500/10'
                                : log.type === 'info'
                                ? 'text-blue-400 bg-blue-500/10'
                                : 'text-foreground'
                            }`}
                          >
                            <span className="text-muted-foreground text-xs mr-2">
                              {log.timestamp.toLocaleTimeString()}
                            </span>
                            {log.content}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingChallenges;

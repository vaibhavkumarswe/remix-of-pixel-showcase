export type LanguageMode = 'javascript' | 'typescript' | 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  language: LanguageMode;
  initialCode: string;
  initialCss?: string;
}

export const challenges: Challenge[] = [
  // JavaScript Challenges
  {
    id: 'counter',
    title: 'Counter Component',
    description: 'Build a counter with increment, decrement, and reset functionality.',
    language: 'javascript',
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
    language: 'javascript',
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
    language: 'javascript',
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
  // TypeScript Challenges
  {
    id: 'ts-counter',
    title: 'TypeScript Counter',
    description: 'Build a type-safe counter with TypeScript.',
    language: 'typescript',
    initialCode: `// TypeScript Counter Challenge
// Create a type-safe counter

interface CounterState {
  count: number;
  min: number;
  max: number;
}

const container = document.getElementById('app') as HTMLDivElement;

const state: CounterState = {
  count: 0,
  min: -10,
  max: 10
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function updateCount(delta: number): void {
  state.count = clamp(state.count + delta, state.min, state.max);
  render();
}

function resetCount(): void {
  state.count = 0;
  render();
}

function render(): void {
  const isAtMin = state.count <= state.min;
  const isAtMax = state.count >= state.max;
  
  container.innerHTML = \`
    <div class="counter-wrapper">
      <p class="limits">Range: \${state.min} to \${state.max}</p>
      <h2 class="count">\${state.count}</h2>
      <div class="buttons">
        <button onclick="updateCount(-1)" \${isAtMin ? 'disabled' : ''}>-</button>
        <button onclick="resetCount()">Reset</button>
        <button onclick="updateCount(1)" \${isAtMax ? 'disabled' : ''}>+</button>
      </div>
    </div>
  \`;
}

// Make functions available globally
(window as any).updateCount = updateCount;
(window as any).resetCount = resetCount;

render();`,
    initialCss: `.counter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.limits {
  color: #a1a1aa;
  font-size: 0.875rem;
  margin: 0;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: #06b6d4;
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
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.buttons button:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.05);
}

.buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
  },
  {
    id: 'ts-todo',
    title: 'TypeScript Todo',
    description: 'Create a type-safe todo list with interfaces.',
    language: 'typescript',
    initialCode: `// TypeScript Todo List Challenge
// Create a fully typed todo list

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

interface AppState {
  todos: Todo[];
  filter: FilterType;
  nextId: number;
}

const container = document.getElementById('app') as HTMLDivElement;

const state: AppState = {
  todos: [
    { id: 1, text: 'Learn TypeScript', completed: false, createdAt: new Date() },
    { id: 2, text: 'Build type-safe apps', completed: true, createdAt: new Date() },
  ],
  filter: 'all',
  nextId: 3
};

function getFilteredTodos(): Todo[] {
  switch (state.filter) {
    case 'active': return state.todos.filter(t => !t.completed);
    case 'completed': return state.todos.filter(t => t.completed);
    default: return state.todos;
  }
}

function addTodo(): void {
  const input = document.getElementById('todoInput') as HTMLInputElement;
  if (input.value.trim()) {
    state.todos.push({
      id: state.nextId++,
      text: input.value.trim(),
      completed: false,
      createdAt: new Date()
    });
    render();
  }
}

function toggleTodo(id: number): void {
  state.todos = state.todos.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  render();
}

function removeTodo(id: number): void {
  state.todos = state.todos.filter(t => t.id !== id);
  render();
}

function setFilter(filter: FilterType): void {
  state.filter = filter;
  render();
}

function render(): void {
  const filtered = getFilteredTodos();
  const activeCount = state.todos.filter(t => !t.completed).length;
  
  container.innerHTML = \`
    <div class="todo-app">
      <h2>TypeScript Todos</h2>
      <div class="add-todo">
        <input type="text" id="todoInput" placeholder="Add new todo..." />
        <button onclick="addTodo()">Add</button>
      </div>
      <div class="filters">
        <button class="\${state.filter === 'all' ? 'active' : ''}" onclick="setFilter('all')">All</button>
        <button class="\${state.filter === 'active' ? 'active' : ''}" onclick="setFilter('active')">Active</button>
        <button class="\${state.filter === 'completed' ? 'active' : ''}" onclick="setFilter('completed')">Done</button>
      </div>
      <ul class="todo-list">
        \${filtered.map(todo => \`
          <li class="\${todo.completed ? 'completed' : ''}">
            <input type="checkbox" \${todo.completed ? 'checked' : ''} onchange="toggleTodo(\${todo.id})" />
            <span>\${todo.text}</span>
            <button onclick="removeTodo(\${todo.id})">×</button>
          </li>
        \`).join('')}
      </ul>
      <p class="count">\${activeCount} items left</p>
    </div>
  \`;
}

// Expose to window
(window as any).addTodo = addTodo;
(window as any).toggleTodo = toggleTodo;
(window as any).removeTodo = removeTodo;
(window as any).setFilter = setFilter;

render();`,
    initialCss: `.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.todo-app h2 {
  margin: 0 0 1rem;
  color: #06b6d4;
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
  background: #06b6d4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.filters button {
  flex: 1;
  padding: 0.5rem;
  background: #1a1a2e;
  border: none;
  color: #a1a1aa;
  border-radius: 6px;
  cursor: pointer;
}

.filters button.active {
  background: #06b6d4;
  color: white;
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
}

.count {
  text-align: center;
  color: #a1a1aa;
  font-size: 0.875rem;
  margin-top: 1rem;
}`,
  },
  // React Challenges
  {
    id: 'react-counter',
    title: 'React Counter',
    description: 'Build a counter using React hooks.',
    language: 'react',
    initialCode: `// React Counter Challenge
// Build a counter with useState hook

function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="counter-wrapper">
      <h2 className="count">{count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('app'));`,
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
  color: #10b981;
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
  background: linear-gradient(135deg, #10b981, #06b6d4);
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
    id: 'react-todo',
    title: 'React Todo List',
    description: 'Create a todo list with React state management.',
    language: 'react',
    initialCode: `// React Todo List Challenge
// Build a todo app with hooks

function TodoApp() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build apps', completed: true },
  ]);
  const [input, setInput] = React.useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input.trim(), 
        completed: false 
      }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };
  
  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };
  
  return (
    <div className="todo-app">
      <h2>React Todos</h2>
      <div className="add-todo">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));`,
    initialCss: `.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.todo-app h2 {
  margin: 0 0 1rem;
  color: #10b981;
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
  background: #10b981;
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
    id: 'react-useeffect',
    title: 'React useEffect Timer',
    description: 'Build a timer using useEffect for side effects.',
    language: 'react',
    initialCode: `// React useEffect Timer Challenge
// Build a timer with start, pause, and reset

function Timer() {
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  
  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
  };
  
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };
  
  return (
    <div className="timer-wrapper">
      <h2 className="time">{formatTime(time)}</h2>
      <div className="buttons">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <p className="status">
        Status: {isRunning ? '▶ Running' : '⏸ Paused'}
      </p>
    </div>
  );
}

ReactDOM.render(<Timer />, document.getElementById('app'));`,
    initialCss: `.timer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
}

.time {
  font-size: 5rem;
  font-weight: bold;
  color: #10b981;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.buttons button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: white;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.buttons button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.status {
  color: #a1a1aa;
  font-size: 0.875rem;
  margin: 0;
}`,
  },
];

export const languageLabels: Record<LanguageMode, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
};

export const languageColors: Record<LanguageMode, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  react: '#61dafb',
};

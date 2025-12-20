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
  // Additional JavaScript Challenges
  {
    id: 'js-star-rating',
    title: 'Star Rating',
    description: 'Build an interactive star rating component with hover effects.',
    language: 'javascript',
    initialCode: `// Star Rating Challenge
// Create an interactive star rating component

const container = document.getElementById('app');

let rating = 0;
let hoverRating = 0;

function render() {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = hoverRating ? i <= hoverRating : i <= rating;
    stars.push(\`
      <span 
        class="star \${filled ? 'filled' : ''}"
        onclick="setRating(\${i})"
        onmouseenter="setHover(\${i})"
        onmouseleave="setHover(0)"
      >★</span>
    \`);
  }
  
  container.innerHTML = \`
    <div class="rating-wrapper">
      <h2>Rate this product</h2>
      <div class="stars">\${stars.join('')}</div>
      <p class="rating-text">
        \${rating ? \`You rated: \${rating} star\${rating > 1 ? 's' : ''}\` : 'Click to rate'}
      </p>
      <button onclick="clearRating()">Clear</button>
    </div>
  \`;
}

function setRating(value) {
  rating = value;
  console.log('Rating set to:', value);
  render();
}

function setHover(value) {
  hoverRating = value;
  render();
}

function clearRating() {
  rating = 0;
  hoverRating = 0;
  render();
}

render();`,
    initialCss: `.rating-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.rating-wrapper h2 {
  color: #8b5cf6;
  margin: 0;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 3rem;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.star:hover {
  transform: scale(1.2);
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  color: #a1a1aa;
  margin: 0;
}

button {
  padding: 0.5rem 1.5rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #444;
}`,
  },
  {
    id: 'js-form-validation',
    title: 'Form Validation',
    description: 'Create a form with real-time validation and error messages.',
    language: 'javascript',
    initialCode: `// Form Validation Challenge
// Create a form with real-time validation

const container = document.getElementById('app');

const formData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const errors = {};

function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function validate() {
  errors.name = formData.name.length < 2 ? 'Name must be at least 2 characters' : '';
  errors.email = !validateEmail(formData.email) ? 'Invalid email address' : '';
  errors.password = formData.password.length < 6 ? 'Password must be at least 6 characters' : '';
  errors.confirmPassword = formData.password !== formData.confirmPassword ? 'Passwords do not match' : '';
}

function handleInput(field, value) {
  formData[field] = value;
  validate();
  render();
}

function handleSubmit(e) {
  e.preventDefault();
  validate();
  
  const hasErrors = Object.values(errors).some(err => err);
  if (!hasErrors) {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  } else {
    console.log('Validation errors:', errors);
  }
  render();
}

function render() {
  container.innerHTML = \`
    <form class="form" onsubmit="handleSubmit(event)">
      <h2>Sign Up</h2>
      
      <div class="field">
        <label>Name</label>
        <input 
          type="text" 
          value="\${formData.name}"
          oninput="handleInput('name', this.value)"
          class="\${errors.name ? 'error' : ''}"
        />
        \${errors.name ? \`<span class="error-text">\${errors.name}</span>\` : ''}
      </div>
      
      <div class="field">
        <label>Email</label>
        <input 
          type="email" 
          value="\${formData.email}"
          oninput="handleInput('email', this.value)"
          class="\${errors.email ? 'error' : ''}"
        />
        \${errors.email ? \`<span class="error-text">\${errors.email}</span>\` : ''}
      </div>
      
      <div class="field">
        <label>Password</label>
        <input 
          type="password" 
          value="\${formData.password}"
          oninput="handleInput('password', this.value)"
          class="\${errors.password ? 'error' : ''}"
        />
        \${errors.password ? \`<span class="error-text">\${errors.password}</span>\` : ''}
      </div>
      
      <div class="field">
        <label>Confirm Password</label>
        <input 
          type="password" 
          value="\${formData.confirmPassword}"
          oninput="handleInput('confirmPassword', this.value)"
          class="\${errors.confirmPassword ? 'error' : ''}"
        />
        \${errors.confirmPassword ? \`<span class="error-text">\${errors.confirmPassword}</span>\` : ''}
      </div>
      
      <button type="submit">Sign Up</button>
    </form>
  \`;
}

render();`,
    initialCss: `.form {
  max-width: 350px;
  margin: 0 auto;
  padding: 1.5rem;
}

.form h2 {
  color: #8b5cf6;
  margin: 0 0 1.5rem;
  text-align: center;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.25rem;
  color: #a1a1aa;
  font-size: 0.875rem;
}

.field input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #333;
  border-radius: 6px;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
}

.field input:focus {
  outline: none;
  border-color: #8b5cf6;
}

.field input.error {
  border-color: #ef4444;
}

.error-text {
  display: block;
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:hover {
  opacity: 0.9;
}`,
  },
  {
    id: 'js-drag-drop',
    title: 'Drag & Drop List',
    description: 'Build a sortable list with drag and drop functionality.',
    language: 'javascript',
    initialCode: `// Drag & Drop List Challenge
// Create a sortable list using HTML5 drag and drop

const container = document.getElementById('app');

let items = [
  { id: 1, text: 'Learn HTML' },
  { id: 2, text: 'Learn CSS' },
  { id: 3, text: 'Learn JavaScript' },
  { id: 4, text: 'Build Projects' },
  { id: 5, text: 'Get Hired' },
];

let draggedId = null;

function handleDragStart(id) {
  draggedId = id;
}

function handleDragOver(e, id) {
  e.preventDefault();
  if (draggedId === id) return;
  
  const draggedIndex = items.findIndex(i => i.id === draggedId);
  const targetIndex = items.findIndex(i => i.id === id);
  
  const newItems = [...items];
  const [draggedItem] = newItems.splice(draggedIndex, 1);
  newItems.splice(targetIndex, 0, draggedItem);
  
  items = newItems;
  render();
}

function handleDragEnd() {
  draggedId = null;
  console.log('New order:', items.map(i => i.text));
  render();
}

function render() {
  container.innerHTML = \`
    <div class="drag-list">
      <h2>Drag to Reorder</h2>
      <ul>
        \${items.map(item => \`
          <li 
            draggable="true"
            ondragstart="handleDragStart(\${item.id})"
            ondragover="handleDragOver(event, \${item.id})"
            ondragend="handleDragEnd()"
            class="\${draggedId === item.id ? 'dragging' : ''}"
          >
            <span class="handle">⋮⋮</span>
            <span>\${item.text}</span>
          </li>
        \`).join('')}
      </ul>
    </div>
  \`;
}

render();`,
    initialCss: `.drag-list {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.drag-list h2 {
  color: #8b5cf6;
  margin: 0 0 1rem;
}

.drag-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.drag-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #1a1a2e;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;
}

.drag-list li:hover {
  background: #252540;
}

.drag-list li.dragging {
  opacity: 0.5;
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.handle {
  color: #666;
  font-size: 1.25rem;
  cursor: grab;
}

.drag-list li:active {
  cursor: grabbing;
}`,
  },
  {
    id: 'js-debounce-search',
    title: 'Debounced Search',
    description: 'Implement a search input with debounce functionality.',
    language: 'javascript',
    initialCode: `// Debounced Search Challenge
// Implement search with debounce to limit API calls

const container = document.getElementById('app');

const allItems = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'Firebase', 'GraphQL'
];

let searchTerm = '';
let results = [...allItems];
let isSearching = false;
let debounceTimer = null;

function debounce(fn, delay) {
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fn(...args), delay);
  };
}

function search(term) {
  isSearching = true;
  render();
  
  // Simulate API delay
  setTimeout(() => {
    results = allItems.filter(item => 
      item.toLowerCase().includes(term.toLowerCase())
    );
    isSearching = false;
    console.log('Search completed for:', term);
    render();
  }, 500);
}

const debouncedSearch = debounce(search, 300);

function handleInput(value) {
  searchTerm = value;
  if (value) {
    debouncedSearch(value);
  } else {
    results = [...allItems];
    render();
  }
}

function render() {
  container.innerHTML = \`
    <div class="search-container">
      <h2>Tech Stack Search</h2>
      <div class="search-box">
        <input 
          type="text" 
          value="\${searchTerm}"
          oninput="handleInput(this.value)"
          placeholder="Search technologies..."
        />
        \${isSearching ? '<span class="spinner">⏳</span>' : ''}
      </div>
      <ul class="results">
        \${results.length ? results.map(item => \`
          <li>\${item}</li>
        \`).join('') : '<li class="no-results">No results found</li>'}
      </ul>
      <p class="hint">Try typing: react, node, docker...</p>
    </div>
  \`;
}

render();`,
    initialCss: `.search-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.search-container h2 {
  color: #8b5cf6;
  margin: 0 0 1rem;
}

.search-box {
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
  border-color: #8b5cf6;
}

.spinner {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

.results {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  max-height: 300px;
  overflow-y: auto;
}

.results li {
  padding: 0.75rem 1rem;
  background: #1a1a2e;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.results li.no-results {
  color: #a1a1aa;
  text-align: center;
}

.hint {
  color: #666;
  font-size: 0.75rem;
  margin: 0;
}`,
  },
  {
    id: 'js-infinite-scroll',
    title: 'Infinite Scroll',
    description: 'Implement infinite scrolling that loads more items on scroll.',
    language: 'javascript',
    initialCode: `// Infinite Scroll Challenge
// Load more items when scrolling near the bottom

const container = document.getElementById('app');

let items = [];
let page = 1;
let loading = false;
let hasMore = true;

function generateItems(pageNum, count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: (pageNum - 1) * count + i + 1,
    title: \`Item #\${(pageNum - 1) * count + i + 1}\`,
    color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`
  }));
}

function loadMore() {
  if (loading || !hasMore) return;
  
  loading = true;
  render();
  
  // Simulate API delay
  setTimeout(() => {
    const newItems = generateItems(page);
    items = [...items, ...newItems];
    page++;
    loading = false;
    hasMore = page <= 5; // Stop after 5 pages
    console.log('Loaded page:', page - 1);
    render();
  }, 800);
}

function handleScroll(e) {
  const { scrollTop, scrollHeight, clientHeight } = e.target;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMore();
  }
}

function render() {
  container.innerHTML = \`
    <div class="infinite-scroll" onscroll="handleScroll(event)">
      <h2>Infinite Scroll</h2>
      <div class="items">
        \${items.map(item => \`
          <div class="item" style="border-left: 4px solid \${item.color}">
            \${item.title}
          </div>
        \`).join('')}
      </div>
      \${loading ? '<div class="loader">Loading more...</div>' : ''}
      \${!hasMore ? '<div class="end">No more items</div>' : ''}
    </div>
  \`;
}

// Initial load
loadMore();`,
    initialCss: `.infinite-scroll {
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem;
}

.infinite-scroll h2 {
  color: #8b5cf6;
  margin: 0 0 1rem;
  position: sticky;
  top: 0;
  background: #0f0f1a;
  padding: 0.5rem 0;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  padding: 1rem;
  background: #1a1a2e;
  border-radius: 8px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.loader {
  text-align: center;
  padding: 1rem;
  color: #8b5cf6;
}

.end {
  text-align: center;
  padding: 1rem;
  color: #666;
}`,
  },
  // Additional TypeScript Challenges
  {
    id: 'ts-shopping-cart',
    title: 'TypeScript Cart',
    description: 'Build a type-safe shopping cart with add, remove, and quantity update.',
    language: 'typescript',
    initialCode: `// TypeScript Shopping Cart Challenge
// Build a fully typed shopping cart

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const container = document.getElementById('app') as HTMLDivElement;

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999, image: '💻' },
  { id: 2, name: 'Phone', price: 699, image: '📱' },
  { id: 3, name: 'Headphones', price: 199, image: '🎧' },
  { id: 4, name: 'Watch', price: 299, image: '⌚' },
];

const cart: CartState = { items: [] };

function addToCart(productId: number): void {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.items.find(i => i.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
  console.log('Added to cart:', product.name);
  render();
}

function removeFromCart(productId: number): void {
  cart.items = cart.items.filter(i => i.id !== productId);
  render();
}

function updateQuantity(productId: number, delta: number): void {
  const item = cart.items.find(i => i.id === productId);
  if (!item) return;
  
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    render();
  }
}

function getTotal(): number {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function render(): void {
  container.innerHTML = \`
    <div class="shop">
      <div class="products">
        <h2>Products</h2>
        \${products.map(p => \`
          <div class="product">
            <span class="emoji">\${p.image}</span>
            <div class="info">
              <span class="name">\${p.name}</span>
              <span class="price">$\${p.price}</span>
            </div>
            <button onclick="addToCart(\${p.id})">Add</button>
          </div>
        \`).join('')}
      </div>
      <div class="cart">
        <h2>Cart (\${cart.items.length})</h2>
        \${cart.items.length ? cart.items.map(item => \`
          <div class="cart-item">
            <span>\${item.image} \${item.name}</span>
            <div class="qty">
              <button onclick="updateQuantity(\${item.id}, -1)">-</button>
              <span>\${item.quantity}</span>
              <button onclick="updateQuantity(\${item.id}, 1)">+</button>
            </div>
            <span>$\${item.price * item.quantity}</span>
            <button class="remove" onclick="removeFromCart(\${item.id})">×</button>
          </div>
        \`).join('') : '<p class="empty">Cart is empty</p>'}
        \${cart.items.length ? \`<div class="total">Total: $\${getTotal()}</div>\` : ''}
      </div>
    </div>
  \`;
}

// Expose to window
(window as any).addToCart = addToCart;
(window as any).removeFromCart = removeFromCart;
(window as any).updateQuantity = updateQuantity;

render();`,
    initialCss: `.shop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

.shop h2 {
  color: #06b6d4;
  margin: 0 0 1rem;
}

.products, .cart {
  background: #1a1a2e;
  padding: 1rem;
  border-radius: 12px;
}

.product {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #252540;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.emoji { font-size: 1.5rem; }
.info { flex: 1; display: flex; flex-direction: column; }
.name { font-weight: 500; }
.price { color: #10b981; font-size: 0.875rem; }

.product button {
  padding: 0.5rem 1rem;
  background: #06b6d4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #252540;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.qty {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.qty button {
  width: 24px;
  height: 24px;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove {
  background: #ef4444 !important;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.empty { color: #666; text-align: center; }
.total { text-align: right; font-weight: bold; color: #10b981; margin-top: 1rem; }`,
  },
  {
    id: 'ts-pagination',
    title: 'TypeScript Pagination',
    description: 'Build a type-safe paginated data table.',
    language: 'typescript',
    initialCode: `// TypeScript Pagination Challenge
// Create a paginated data view

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const container = document.getElementById('app') as HTMLDivElement;

// Generate mock data
const users: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  email: \`user\${i + 1}@example.com\`,
  role: ['admin', 'user', 'guest'][i % 3] as User['role']
}));

const state: PaginationState = {
  currentPage: 1,
  pageSize: 5,
  totalItems: users.length
};

function getTotalPages(): number {
  return Math.ceil(state.totalItems / state.pageSize);
}

function getCurrentPageData(): User[] {
  const start = (state.currentPage - 1) * state.pageSize;
  return users.slice(start, start + state.pageSize);
}

function goToPage(page: number): void {
  if (page < 1 || page > getTotalPages()) return;
  state.currentPage = page;
  console.log('Page:', page);
  render();
}

function changePageSize(size: number): void {
  state.pageSize = size;
  state.currentPage = 1;
  render();
}

function render(): void {
  const data = getCurrentPageData();
  const totalPages = getTotalPages();
  
  container.innerHTML = \`
    <div class="table-container">
      <h2>Users (Page \${state.currentPage}/\${totalPages})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          \${data.map(user => \`
            <tr>
              <td>\${user.id}</td>
              <td>\${user.name}</td>
              <td>\${user.email}</td>
              <td><span class="role \${user.role}">\${user.role}</span></td>
            </tr>
          \`).join('')}
        </tbody>
      </table>
      <div class="pagination">
        <button onclick="goToPage(1)" \${state.currentPage === 1 ? 'disabled' : ''}>«</button>
        <button onclick="goToPage(\${state.currentPage - 1})" \${state.currentPage === 1 ? 'disabled' : ''}>‹</button>
        <span class="page-info">Page \${state.currentPage} of \${totalPages}</span>
        <button onclick="goToPage(\${state.currentPage + 1})" \${state.currentPage === totalPages ? 'disabled' : ''}>›</button>
        <button onclick="goToPage(\${totalPages})" \${state.currentPage === totalPages ? 'disabled' : ''}>»</button>
        <select onchange="changePageSize(Number(this.value))">
          <option value="5" \${state.pageSize === 5 ? 'selected' : ''}>5/page</option>
          <option value="10" \${state.pageSize === 10 ? 'selected' : ''}>10/page</option>
          <option value="20" \${state.pageSize === 20 ? 'selected' : ''}>20/page</option>
        </select>
      </div>
    </div>
  \`;
}

// Expose to window
(window as any).goToPage = goToPage;
(window as any).changePageSize = changePageSize;

render();`,
    initialCss: `.table-container {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #06b6d4;
  margin: 0 0 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #333;
}

th {
  background: #252540;
  color: #a1a1aa;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.role {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.role.admin { background: #8b5cf620; color: #8b5cf6; }
.role.user { background: #06b6d420; color: #06b6d4; }
.role.guest { background: #a1a1aa20; color: #a1a1aa; }

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination button {
  width: 32px;
  height: 32px;
  background: #1a1a2e;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #a1a1aa;
  font-size: 0.875rem;
  margin: 0 0.5rem;
}

select {
  padding: 0.5rem;
  background: #1a1a2e;
  border: none;
  border-radius: 6px;
  color: white;
  margin-left: 1rem;
}`,
  },
  // Additional React Challenges
  {
    id: 'react-star-rating',
    title: 'React Star Rating',
    description: 'Build an interactive star rating with React state.',
    language: 'react',
    initialCode: `// React Star Rating Challenge
// Build a reusable star rating component

function StarRating({ maxStars = 5 }) {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  
  return (
    <div className="rating-wrapper">
      <h2>Rate this product</h2>
      <div className="stars">
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={\`star \${starValue <= (hover || rating) ? 'filled' : ''}\`}
              onClick={() => {
                setRating(starValue);
                console.log('Rating:', starValue);
              }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>
      <p className="rating-text">
        {rating ? \`You rated: \${rating} star\${rating > 1 ? 's' : ''}\` : 'Click to rate'}
      </p>
      <button onClick={() => setRating(0)}>Clear</button>
    </div>
  );
}

ReactDOM.render(<StarRating maxStars={5} />, document.getElementById('app'));`,
    initialCss: `.rating-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.rating-wrapper h2 {
  color: #10b981;
  margin: 0;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 3rem;
  color: #333;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.star:hover {
  transform: scale(1.2);
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  color: #a1a1aa;
  margin: 0;
}

button {
  padding: 0.5rem 1.5rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #444;
}`,
  },
  {
    id: 'react-form-validation',
    title: 'React Form Validation',
    description: 'Create a form with validation using React hooks.',
    language: 'react',
    initialCode: `// React Form Validation Challenge
// Build a form with real-time validation

function SignupForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [touched, setTouched] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  
  const validate = () => {
    const errors = {};
    if (formData.name.length < 2) errors.name = 'Name must be at least 2 characters';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (formData.password.length < 6) errors.password = 'Password must be 6+ characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords must match';
    return errors;
  };
  
  const errors = validate();
  const isValid = Object.keys(errors).length === 0;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    
    if (isValid) {
      console.log('Form submitted:', formData);
      alert('Success! Check console for data.');
    }
  };
  
  const showError = (field) => (touched[field] || submitted) && errors[field];
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      
      {['name', 'email', 'password', 'confirmPassword'].map(field => (
        <div key={field} className="field">
          <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
          <input
            type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError(field) ? 'error' : ''}
          />
          {showError(field) && <span className="error-text">{errors[field]}</span>}
        </div>
      ))}
      
      <button type="submit" disabled={submitted && !isValid}>Sign Up</button>
    </form>
  );
}

ReactDOM.render(<SignupForm />, document.getElementById('app'));`,
    initialCss: `.form {
  max-width: 350px;
  margin: 0 auto;
  padding: 1.5rem;
}

.form h2 {
  color: #10b981;
  margin: 0 0 1.5rem;
  text-align: center;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.25rem;
  color: #a1a1aa;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.field input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #333;
  border-radius: 6px;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
}

.field input:focus {
  outline: none;
  border-color: #10b981;
}

.field input.error {
  border-color: #ef4444;
}

.error-text {
  display: block;
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}`,
  },
  {
    id: 'react-useReducer-cart',
    title: 'React useReducer Cart',
    description: 'Build a shopping cart using useReducer for state management.',
    language: 'react',
    initialCode: `// React useReducer Cart Challenge
// Build a cart with complex state logic

const products = [
  { id: 1, name: 'Laptop', price: 999, emoji: '💻' },
  { id: 2, name: 'Phone', price: 699, emoji: '📱' },
  { id: 3, name: 'Headphones', price: 199, emoji: '🎧' },
  { id: 4, name: 'Watch', price: 299, emoji: '⌚' },
];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(i => i.id === action.product.id);
      if (existing) {
        return state.map(i => i.id === action.product.id 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.id);
    case 'UPDATE_QUANTITY':
      return state.map(i => i.id === action.id 
        ? { ...i, quantity: Math.max(0, i.quantity + action.delta) }
        : i
      ).filter(i => i.quantity > 0);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

function ShoppingCart() {
  const [cart, dispatch] = React.useReducer(cartReducer, []);
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="shop">
      <div className="products">
        <h2>Products</h2>
        {products.map(product => (
          <div key={product.id} className="product">
            <span className="emoji">{product.emoji}</span>
            <div className="info">
              <span className="name">{product.name}</span>
              <span className="price">\${product.price}</span>
            </div>
            <button onClick={() => {
              dispatch({ type: 'ADD_ITEM', product });
              console.log('Added:', product.name);
            }}>Add</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart ({itemCount})</h2>
        {cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.emoji} {item.name}</span>
                <div className="qty">
                  <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, delta: -1 })}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, delta: 1 })}>+</button>
                </div>
                <span>\${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="total">Total: \${total}</div>
            <button className="clear" onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<ShoppingCart />, document.getElementById('app'));`,
    initialCss: `.shop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

h2 {
  color: #10b981;
  margin: 0 0 1rem;
}

.products, .cart {
  background: #1a1a2e;
  padding: 1rem;
  border-radius: 12px;
}

.product {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #252540;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.emoji { font-size: 1.5rem; }
.info { flex: 1; display: flex; flex-direction: column; }
.name { font-weight: 500; }
.price { color: #10b981; font-size: 0.875rem; }

.product button {
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #252540;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.qty {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.qty button {
  width: 24px;
  height: 24px;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty { color: #666; text-align: center; }
.total { text-align: right; font-weight: bold; color: #10b981; margin-top: 1rem; }

.clear {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`,
  },
  {
    id: 'react-custom-hook',
    title: 'React Custom Hook',
    description: 'Create and use a custom useLocalStorage hook.',
    language: 'react',
    initialCode: `// React Custom Hook Challenge
// Create a useLocalStorage hook for persistent state

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      console.log('Saved to localStorage:', key, valueToStore);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}

// Demo app using the custom hook
function NotesApp() {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [input, setInput] = React.useState('');
  
  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, { id: Date.now(), text: input.trim(), createdAt: new Date().toLocaleString() }]);
      setInput('');
    }
  };
  
  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };
  
  return (
    <div className="notes-app">
      <h2>📝 Persistent Notes</h2>
      <p className="subtitle">Notes are saved to localStorage</p>
      
      <div className="add-note">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addNote()}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>Add</button>
      </div>
      
      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty">No notes yet. Add one above!</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note">
              <div className="note-content">
                <p>{note.text}</p>
                <span className="timestamp">{note.createdAt}</span>
              </div>
              <button onClick={() => deleteNote(note.id)}>×</button>
            </div>
          ))
        )}
      </div>
      
      <button className="clear-all" onClick={() => setNotes([])}>
        Clear All Notes
      </button>
    </div>
  );
}

ReactDOM.render(<NotesApp />, document.getElementById('app'));`,
    initialCss: `.notes-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.notes-app h2 {
  color: #10b981;
  margin: 0;
}

.subtitle {
  color: #666;
  font-size: 0.875rem;
  margin: 0.25rem 0 1.5rem;
}

.add-note {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-note input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #1a1a2e;
  color: white;
}

.add-note button {
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  background: #1a1a2e;
  border-radius: 8px;
}

.note-content {
  flex: 1;
}

.note-content p {
  margin: 0 0 0.25rem;
}

.timestamp {
  font-size: 0.75rem;
  color: #666;
}

.note button {
  width: 24px;
  height: 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty {
  color: #666;
  text-align: center;
  padding: 2rem;
}

.clear-all {
  width: 100%;
  padding: 0.75rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.clear-all:hover {
  background: #444;
}`,
  },
  {
    id: 'react-infinite-scroll',
    title: 'React Infinite Scroll',
    description: 'Implement infinite scrolling with React hooks.',
    language: 'react',
    initialCode: `// React Infinite Scroll Challenge
// Load more items when scrolling near bottom

function useInfiniteScroll(callback, hasMore) {
  const observer = React.useRef();
  
  const lastElementRef = React.useCallback(node => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [callback, hasMore]);
  
  return lastElementRef;
}

function InfiniteList() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  
  const loadMore = React.useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    console.log('Loading page:', page);
    
    // Simulate API call
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        title: \`Item #\${(page - 1) * 10 + i + 1}\`,
        color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`
      }));
      
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setLoading(false);
      setHasMore(page < 5); // Stop after 5 pages
    }, 800);
  }, [page, loading]);
  
  const lastItemRef = useInfiniteScroll(loadMore, hasMore);
  
  React.useEffect(() => {
    loadMore();
  }, []);
  
  return (
    <div className="infinite-list">
      <h2>Infinite Scroll</h2>
      <div className="items">
        {items.map((item, index) => (
          <div 
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
            className="item"
            style={{ borderLeft: \`4px solid \${item.color}\` }}
          >
            {item.title}
          </div>
        ))}
      </div>
      {loading && <div className="loader">Loading more...</div>}
      {!hasMore && <div className="end">🎉 You've seen it all!</div>}
    </div>
  );
}

ReactDOM.render(<InfiniteList />, document.getElementById('app'));`,
    initialCss: `.infinite-list {
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem;
}

.infinite-list h2 {
  color: #10b981;
  margin: 0 0 1rem;
  position: sticky;
  top: 0;
  background: #0f0f1a;
  padding: 0.5rem 0;
  z-index: 10;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  padding: 1rem;
  background: #1a1a2e;
  border-radius: 8px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.loader {
  text-align: center;
  padding: 1rem;
  color: #10b981;
}

.end {
  text-align: center;
  padding: 2rem;
  color: #10b981;
  font-size: 1.25rem;
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

import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Terminal, Eye, Code2, ArrowLeft, Lightbulb, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  getChallengeById, 
  languageLabels, 
  languageColors,
  difficultyColors,
  difficultyLabels,
} from '@/data/challenges/index';
import EditorSettings, { defaultEditorSettings, type EditorSettingsState } from '@/components/coding/EditorSettings';

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

const ChallengeEditor = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.mode);
  
  const challenge = challengeId ? getChallengeById(challengeId) : null;
  
  const [code, setCode] = useState(challenge?.initialCode || '');
  const [css, setCss] = useState(challenge?.initialCss || '');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [activeTab, setActiveTab] = useState<'code' | 'css'>('code');
  const [previewHtml, setPreviewHtml] = useState('');
  const [editorSettings, setEditorSettings] = useState<EditorSettingsState>(defaultEditorSettings);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [showHint, setShowHint] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (challenge) {
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
    }
  }, [challenge]);

  const handleReset = () => {
    if (challenge) {
      setCode(challenge.initialCode);
      setCss(challenge.initialCss || '');
      setConsoleLogs([]);
    }
  };

  const getEditorLanguage = () => {
    if (activeTab === 'css') return 'css';
    if (!challenge) return 'javascript';
    switch (challenge.language) {
      case 'typescript': return 'typescript';
      case 'react': return 'javascript';
      default: return 'javascript';
    }
  };

  const runCode = useCallback(() => {
    if (!challenge) return;
    
    setConsoleLogs([]);
    
    const isReact = challenge.language === 'react';
    const isTypeScript = challenge.language === 'typescript';
    
    const processedCode = isTypeScript 
      ? code.replace(/:\s*(string|number|boolean|void|any|unknown|never|object|null|undefined|\w+\[\]|Record<[^>]+>|Pick<[^>]+>|Omit<[^>]+>|Partial<[^>]+>|Required<[^>]+>|\{[^}]*\})/g, '')
           .replace(/<\w+>/g, '')
           .replace(/as \w+/g, '')
           .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
           .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
      : code;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          ${isReact ? `
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          ` : ''}
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
          </script>
          ${isReact ? `
            <script type="text/babel">
              try {
                ${processedCode}
              } catch (error) {
                console.error(error.message);
              }
            </script>
          ` : `
            <script>
              try {
                ${processedCode}
              } catch (error) {
                console.error(error.message);
              }
            </script>
          `}
        </body>
      </html>
    `;
    
    setPreviewHtml(html);
  }, [code, css, challenge]);

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

  if (!challenge) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
          <Button onClick={() => navigate('/coding')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-4 mb-3">
            <Link 
              to="/coding"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">All Challenges</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold gradient-text">
                  {challenge.title}
                </h1>
                <span 
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: `${languageColors[challenge.language]}20`,
                    color: languageColors[challenge.language],
                  }}
                >
                  {languageLabels[challenge.language]}
                </span>
                <span 
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: `${difficultyColors[challenge.difficulty]}20`,
                    color: difficultyColors[challenge.difficulty],
                  }}
                >
                  {difficultyLabels[challenge.difficulty]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl">
                {challenge.description}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={runCode} className="gap-2 bg-primary hover:bg-primary/90">
                <Play className="h-4 w-4" />
                Run
              </Button>
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
          
          {/* Tags & Hints */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {challenge.tags?.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
            
            {challenge.hints && challenge.hints.length > 0 && (
              <Collapsible open={hintsOpen} onOpenChange={setHintsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                    <Lightbulb className="h-3 w-3" />
                    Hints ({showHint}/{challenge.hints.length})
                    <ChevronDown className={`h-3 w-3 transition-transform ${hintsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute z-10 mt-2 p-3 glass-card rounded-lg border border-border/50 max-w-md">
                  {challenge.hints.slice(0, showHint + 1).map((hint, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-primary">Hint {idx + 1}:</span> {hint}
                    </p>
                  ))}
                  {showHint < challenge.hints.length - 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowHint(prev => prev + 1)}
                      className="text-xs"
                    >
                      Show next hint
                    </Button>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </motion.div>

        {/* Editor and Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-[calc(100vh-280px)] min-h-[500px] glass-card rounded-xl border border-border/50 overflow-hidden"
        >
          <ResizablePanelGroup direction="horizontal">
            {/* Code Editor Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                {/* Editor Tabs */}
                <div className="flex items-center justify-between px-2 py-1 bg-background/50 border-b border-border/50">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        activeTab === 'code'
                          ? 'bg-primary/20 text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Code2 className="h-4 w-4" />
                      {languageLabels[challenge.language]}
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
                  <EditorSettings 
                    settings={editorSettings} 
                    onChange={setEditorSettings}
                  />
                </div>

                {/* Monaco Editor */}
                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={getEditorLanguage()}
                    value={activeTab === 'code' ? code : css}
                    onChange={(value) => {
                      if (activeTab === 'code') {
                        setCode(value || '');
                      } else {
                        setCss(value || '');
                      }
                    }}
                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                    options={{
                      minimap: { enabled: editorSettings.minimap },
                      fontSize: editorSettings.fontSize,
                      fontFamily: editorSettings.fontFamily,
                      lineNumbers: editorSettings.lineNumbers ? 'on' : 'off',
                      scrollBeyondLastLine: false,
                      wordWrap: editorSettings.wordWrap ? 'on' : 'off',
                      automaticLayout: true,
                      padding: { top: 16 },
                      tabSize: editorSettings.tabSize,
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

export default ChallengeEditor;

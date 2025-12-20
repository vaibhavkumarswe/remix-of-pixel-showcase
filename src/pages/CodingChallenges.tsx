import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Terminal, Eye, Code2 } from 'lucide-react';
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
import { challenges, languageLabels, languageColors, type LanguageMode, type Challenge } from '@/data/challenges';
import EditorSettings, { defaultEditorSettings, type EditorSettingsState } from '@/components/coding/EditorSettings';

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  content: string;
  timestamp: Date;
}

const CodingChallenges = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageMode>('javascript');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [code, setCode] = useState(challenges[0].initialCode);
  const [css, setCss] = useState(challenges[0].initialCss || '');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [activeTab, setActiveTab] = useState<'code' | 'css'>('code');
  const [previewHtml, setPreviewHtml] = useState('');
  const [editorSettings, setEditorSettings] = useState<EditorSettingsState>(defaultEditorSettings);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const filteredChallenges = challenges.filter(c => c.language === selectedLanguage);

  const handleLanguageChange = (language: LanguageMode) => {
    setSelectedLanguage(language);
    const firstChallenge = challenges.find(c => c.language === language);
    if (firstChallenge) {
      setSelectedChallenge(firstChallenge);
      setCode(firstChallenge.initialCode);
      setCss(firstChallenge.initialCss || '');
      setConsoleLogs([]);
    }
  };

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

  const getEditorLanguage = () => {
    if (activeTab === 'css') return 'css';
    switch (selectedLanguage) {
      case 'typescript': return 'typescript';
      case 'react': return 'javascript';
      default: return 'javascript';
    }
  };

  const runCode = useCallback(() => {
    setConsoleLogs([]);
    
    const isReact = selectedLanguage === 'react';
    const isTypeScript = selectedLanguage === 'typescript';
    
    // For TypeScript, we'll just run it as JavaScript (simulated transpile)
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
  }, [code, css, selectedLanguage]);

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

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-4"
        >
          {/* Language Selector */}
          <div className="flex gap-1 p-1 glass-card rounded-lg border border-border/50">
            {(Object.keys(languageLabels) as LanguageMode[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedLanguage === lang
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                style={{
                  borderLeft: selectedLanguage === lang ? `3px solid ${languageColors[lang]}` : undefined,
                }}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>

          {/* Challenge Selector */}
          <Select
            value={selectedChallenge.id}
            onValueChange={handleChallengeChange}
          >
            <SelectTrigger className="w-[240px] glass-card border-border/50">
              <SelectValue placeholder="Select a challenge" />
            </SelectTrigger>
            <SelectContent>
              {filteredChallenges.map((challenge) => (
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
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">
              {selectedChallenge.title}
            </h3>
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: `${languageColors[selectedLanguage]}20`,
                color: languageColors[selectedLanguage],
              }}
            >
              {languageLabels[selectedLanguage]}
            </span>
          </div>
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
                      {languageLabels[selectedLanguage]}
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

export default CodingChallenges;

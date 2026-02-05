import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Code2, 
  BookOpen, 
  FileText, 
  Gamepad2, 
  Wrench, 
  Brain, 
  PlayCircle,
  Terminal,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts, searchPosts } from '@/data/blog';
import { challenges, searchChallenges } from '@/data/challenges/index';

interface PlatformSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  stats?: string;
  tags?: string[];
}

const platformSections: PlatformSection[] = [
  {
    id: 'playground',
    title: 'Coding Playground',
    description: 'Write, run, and experiment with code in a full-featured IDE environment',
    icon: PlayCircle,
    path: '/playground',
    color: 'hsl(187 85% 53%)',
    stats: 'React • TypeScript • JavaScript',
    tags: ['IDE', 'Live Preview', 'Console'],
  },
  {
    id: 'challenges',
    title: 'Coding Challenges',
    description: 'Practice and improve your coding skills with hands-on challenges',
    icon: Code2,
    path: '/coding',
    color: 'hsl(262 83% 68%)',
    stats: `${challenges.length} challenges`,
    tags: ['JavaScript', 'TypeScript', 'React'],
  },
  {
    id: 'blog',
    title: 'Tech Blog',
    description: 'In-depth articles on web development, system design, and best practices',
    icon: BookOpen,
    path: '/blog',
    color: 'hsl(142 71% 45%)',
    stats: `${blogPosts.length} articles`,
    tags: ['Tutorials', 'System Design', 'Best Practices'],
  },
  {
    id: 'snippets',
    title: 'Code Snippets',
    description: 'Ready-to-use code snippets for common programming tasks',
    icon: FileText,
    path: '/snippets',
    color: 'hsl(45 93% 47%)',
    tags: ['Copy & Paste', 'Reusable', 'Documented'],
  },
  {
    id: 'games',
    title: 'Dev Games',
    description: 'Fun interactive games to test your knowledge and relax',
    icon: Gamepad2,
    path: '/games',
    color: 'hsl(330 80% 60%)',
    tags: ['Interactive', 'Fun', 'Learning'],
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Curated collection of tools, libraries, and learning materials',
    icon: Wrench,
    path: '/resources',
    color: 'hsl(200 95% 55%)',
    tags: ['Tools', 'Libraries', 'References'],
  },
  {
    id: 'ask-ai',
    title: 'Ask AI',
    description: 'Get instant answers to your coding questions with AI assistance',
    icon: Brain,
    path: '/ask-ai',
    color: 'hsl(280 70% 60%)',
    tags: ['AI Powered', 'Instant Help', 'Code Analysis'],
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase();
    const matchedSections = platformSections.filter(
      section =>
        section.title.toLowerCase().includes(query) ||
        section.description.toLowerCase().includes(query) ||
        section.tags?.some(tag => tag.toLowerCase().includes(query))
    );
    const matchedBlogs = searchPosts(query).slice(0, 5);
    const matchedChallenges = searchChallenges(query).slice(0, 5);

    return {
      sections: matchedSections,
      blogs: matchedBlogs,
      challenges: matchedChallenges,
      total: matchedSections.length + matchedBlogs.length + matchedChallenges.length,
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Terminal className="w-4 h-4" />
          Developer Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-text">One Stop</span> Dev Hub
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Everything you need to learn, practice, and build. Coding challenges, blogs, 
          snippets, playground, and more — all in one place.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search challenges, blogs, snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-6 text-lg rounded-2xl bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Search Results Dropdown */}
          {searchResults && searchResults.total > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 glass-card rounded-2xl border border-border/50 shadow-2xl z-50 max-h-96 overflow-auto">
              {searchResults.sections.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 px-2">Sections</p>
                  {searchResults.sections.map((section) => (
                    <Link
                      key={section.id}
                      to={section.path}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <section.icon className="w-5 h-5" style={{ color: section.color }} />
                      <div className="text-left">
                        <p className="font-medium">{section.title}</p>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchResults.blogs.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2 px-2">Blog Posts</p>
                  {searchResults.blogs.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchResults.challenges.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 px-2">Challenges</p>
                  {searchResults.challenges.map((challenge) => (
                    <Link
                      key={challenge.id}
                      to={`/coding/${challenge.id}`}
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <Code2 className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium">{challenge.title}</p>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Platform Sections Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                to={section.path}
                className="group bento-card hover:border-primary/30 border border-transparent"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-xl transition-colors"
                    style={{ 
                      backgroundColor: `${section.color}15`,
                    }}
                  >
                    <Icon 
                      className="w-6 h-6 transition-transform group-hover:scale-110" 
                      style={{ color: section.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {section.description}
                    </p>
                    {section.stats && (
                      <p className="text-xs font-medium text-primary/80 mb-2">
                        {section.stats}
                      </p>
                    )}
                    {section.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {section.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs bg-muted/50 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="glass-card rounded-3xl p-8 border border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">
                {challenges.length}+
              </div>
              <p className="text-sm text-muted-foreground">Coding Challenges</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">
                {blogPosts.length}+
              </div>
              <p className="text-sm text-muted-foreground">Blog Articles</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">
                50+
              </div>
              <p className="text-sm text-muted-foreground">Code Snippets</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">
                3
              </div>
              <p className="text-sm text-muted-foreground">Languages Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Link 
            to="/playground" 
            className="flex-1 group p-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <PlayCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Start Coding Now</h3>
                <p className="text-sm text-muted-foreground">Jump into the playground</p>
              </div>
            </div>
            <Button className="gap-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              Open Playground
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link 
            to="/coding" 
            className="flex-1 group p-6 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/20 hover:border-accent/40 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-accent/20">
                <Code2 className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Take a Challenge</h3>
                <p className="text-sm text-muted-foreground">Test your skills</p>
              </div>
            </div>
            <Button variant="secondary" className="gap-2 rounded-full">
              <Terminal className="w-4 h-4" />
              Browse Challenges
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;

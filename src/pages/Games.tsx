import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, RotateCcw, Trophy, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Memory Card Game
const cardEmojis = ['🚀', '⚡', '🎮', '💎', '🔥', '🌟', '🎯', '💫'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = useCallback(() => {
    const shuffled = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
    setTimer(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      const firstCard = cards[flippedCards[0]];
      const secondCard = newCards[id];

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[flippedCards[0]].isMatched = true;
          matchedCards[id].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(c => c.isMatched)) {
            setIsComplete(true);
            setIsPlaying(false);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[flippedCards[0]].isFlipped = false;
          resetCards[id].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="bento-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Memory Match</h3>
        <Button variant="ghost" size="sm" onClick={initializeGame}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="flex justify-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span className="font-mono">{timer}s</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Trophy className="h-4 w-4" />
          <span className="font-mono">{moves} moves</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-xl text-2xl font-bold flex items-center justify-center transition-all ${
              card.isFlipped || card.isMatched
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <AnimatePresence mode="wait">
              {(card.isFlipped || card.isMatched) && (
                <motion.span
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: 90 }}
                >
                  {card.emoji}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-primary/10 text-center"
          >
            <p className="text-xl font-bold text-primary">🎉 Congratulations!</p>
            <p className="text-muted-foreground">
              Completed in {moves} moves and {timer} seconds!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reaction Time Game
const ReactionGame = () => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'result' | 'early'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startGame = () => {
    setGameState('ready');
    const delay = Math.random() * 3000 + 2000;
    
    const timeout = setTimeout(() => {
      setGameState('go');
      setStartTime(Date.now());
    }, delay);

    return () => clearTimeout(timeout);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      startGame();
    } else if (gameState === 'ready') {
      setGameState('early');
    } else if (gameState === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('result');
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    } else if (gameState === 'result' || gameState === 'early') {
      setGameState('waiting');
    }
  };

  const getButtonContent = () => {
    switch (gameState) {
      case 'waiting':
        return { bg: 'bg-secondary', text: 'Click to Start' };
      case 'ready':
        return { bg: 'bg-destructive', text: 'Wait for Green...' };
      case 'go':
        return { bg: 'bg-green-500', text: 'CLICK NOW!' };
      case 'result':
        return { bg: 'bg-primary', text: `${reactionTime}ms - Click to try again` };
      case 'early':
        return { bg: 'bg-destructive', text: 'Too early! Click to try again' };
    }
  };

  const { bg, text } = getButtonContent();

  return (
    <div className="bento-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Reaction Time</h3>
        {bestTime && (
          <div className="flex items-center gap-2 text-primary">
            <Trophy className="h-4 w-4" />
            <span className="font-mono">{bestTime}ms</span>
          </div>
        )}
      </div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full h-40 rounded-xl ${bg} text-white font-bold text-xl transition-colors`}
      >
        {text}
      </motion.button>

      <p className="text-sm text-muted-foreground text-center mt-4">
        Test your reflexes! Click as fast as you can when the box turns green.
      </p>
    </div>
  );
};

const Games = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Gamepad2 className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Playground</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Fun & <span className="gradient-text">Games</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of mini-games I've built for fun. Test your skills
            and see if you can beat the high scores!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <MemoryGame />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ReactionGame />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            More games coming soon! Have an idea? Let me know.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Games;

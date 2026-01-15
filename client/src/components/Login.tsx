import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#ec4899", "#f43f5e", "#ff85a2", "#ffb7c5", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Extra bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 500);
  };

  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === "bell") {
      triggerConfetti();
      setTimeout(onLogin, 2000);
    } else {
      toast({
        title: "Not quite right...",
        description: "Hint: What do I always call you? (lowercase)",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4 overflow-hidden bg-[#fff5f7]">
      {/* Floating emojis background - Reduced count for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{ 
              left: (i * 25) + "%",
              top: (i * 20) + "%"
            }}
            animate={{ 
              y: ["0vh", "100vh"],
              rotate: 360 
            }}
            transition={{ 
              duration: 20 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {["🌸", "✨", "🎀", "🍭"][i % 4]}
          </motion.div>
        ))}
        
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-md"
      >
        <div className="bg-white/60 backdrop-blur-3xl p-10 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(236,72,153,0.2)] border border-white/80 text-center group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            animate={isTyping ? { 
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0]
            } : {
              y: [0, -5, 0],
            }}
            transition={{ duration: isTyping ? 0.5 : 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-rose-400 shadow-lg shadow-primary/30 mb-8"
          >
            <Heart className="w-12 h-12 text-white fill-white" />
          </motion.div>
          
          <h1 className="text-5xl font-heading mb-4 text-gray-800 group-hover:text-primary transition-colors">For My Love</h1>
          <p className="text-muted-foreground mb-10 font-medium">Please enter the secret word to see Our Memories</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <motion.div
                animate={password.length > 0 ? { 
                  scale: 1.1,
                  rotate: 2,
                  y: -4
                } : {
                  scale: 1,
                  rotate: 0,
                  y: 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Input
                  type="password"
                  placeholder="The secret word..."
                  value={password}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center text-xl bg-white/80 border-pink-100 focus:border-primary focus:ring-primary/20 rounded-2xl h-14 transition-all shadow-sm font-sans tracking-[0.2em] placeholder:tracking-normal placeholder:text-base placeholder:font-heading leading-none pt-1"
                  autoFocus
                />
              </motion.div>
              <motion.div
                animate={{ 
                  rotate: password.length * 10,
                  scale: password.length > 0 ? [1, 1.5, 1.2] : 1 
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-5 h-5 text-primary/40" />
              </motion.div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl h-16 shadow-xl shadow-primary/20 transition-all active:scale-95 group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Unlock Our Memories
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 fill-current" />
                </motion.div>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"
              />
            </Button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-pink-50 flex justify-center gap-6">
            <div className="text-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary mx-auto mb-2" 
              />
              <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Made with Love</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

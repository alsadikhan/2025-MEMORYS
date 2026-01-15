import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const REMINDERS = [
  { id: 1, text: "You are capable of amazing things🥰.", color: "bg-yellow-100", rotate: "-rotate-2" },
  { id: 2, text: "Your smile lights up my whole world😇🥰.", color: "bg-pink-100", rotate: "rotate-3" },
  { id: 3, text: "I'm so incredibly proud of you.🥰🫢", color: "bg-blue-100", rotate: "-rotate-1" },
  { id: 4, text: "You are My Most Expensive Gift.🥳😇", color: "bg-green-100", rotate: "rotate-2" },
  { id: 5, text: "I love You more than you know.🥺😥", color: "bg-purple-100", rotate: "-rotate-3" },
  { id: 6, text: "Take a deep breath and relax🤗.", color: "bg-orange-100", rotate: "rotate-1" },
  { id: 7, text: "You make my heart skip a beat.🥺😩", color: "bg-red-100", rotate: "-rotate-2" },
  { id: 8, text: "Believe in yourself as I believe in you.🥹😊", color: "bg-teal-100", rotate: "rotate-2" },
  { id: 9, text: "You are my sunshine on a cloudy day.😇🤗", color: "bg-cyan-100", rotate: "-rotate-1" },
  { id: 10, text: "Every moment with you is a treasure.🤗🥰", color: "bg-lime-100", rotate: "rotate-3" },
  { id: 11, text: "You are stronger than you think.😼🫡", color: "bg-amber-100", rotate: "-rotate-3" },
  { id: 12, text: "Your kindness inspires me daily.😇🥰", color: "bg-rose-100", rotate: "rotate-1" },
  { id: 13, text: "You are my forever and always.🥳😇", color: "bg-violet-100", rotate: "-rotate-2" },
  { id: 14, text: "Keep shining my beautiful soul🥰🥺.", color: "bg-fuchsia-100", rotate: "rotate-2" },
  { id: 15, text: "my angry angel🥺😇.", color: "bg-indigo-100", rotate: "-rotate-1" },
];

export default function Notes() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-heading text-center mb-8">Some Important Words</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {REMINDERS.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.15, 
              type: "spring",
              stiffness: 200,
              damping: 12
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: index % 2 === 0 ? 3 : -3,
              zIndex: 10,
              y: -10
            }}
            whileTap={{ scale: 0.95 }}
            className="perspective-1000"
          >
            <Card className={`${note.color} border-none shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden relative cursor-pointer transition-shadow duration-300 rounded-2xl`}>
              <div className="absolute top-0 left-0 w-full h-2 bg-black/5" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/80 shadow-inner z-10 border border-black/5 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-black/20" />
              </div>
              
              <CardContent className="p-10 pt-12 flex flex-col items-center justify-center min-h-[200px] text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <p className="font-heading text-3xl text-gray-800 leading-relaxed selection:bg-black/10">
                    "{note.text}"
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-6 flex gap-2"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                   <Heart className="w-3 h-3 text-primary/30 fill-current" />
                   <Heart className="w-3 h-3 text-primary/30 fill-current" />
                   <Heart className="w-3 h-3 text-primary/30 fill-current" />
                </motion.div>
              </CardContent>
              
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

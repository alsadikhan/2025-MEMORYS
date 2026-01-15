import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

// Import stock images using generic paths that resolved in previous step
import img1 from "@assets/stock_images/rjn1.jpg";
import img2 from "@assets/stock_images/rjn2.jpg";
import img3 from "@assets/stock_images/rjn3.jpg";
import img4 from "@assets/stock_images/rjn4.jpg";
import img5 from "@assets/stock_images/rjn5.jpg";
import img6 from "@assets/stock_images/rjn6.jpg";
import img7 from "@assets/stock_images/rjn7.jpg";
import img8 from "@assets/stock_images/rjn8.jpg";
import img9 from "@assets/stock_images/rjn9.jpg";
import img10 from "@assets/stock_images/rjn10.jpg";
import img11 from "@assets/stock_images/rjn11.jpg";
import img12 from "@assets/stock_images/rjn14.jpg";
import img13 from "@assets/stock_images/rjn13.jpg";
import img14 from "@assets/stock_images/rjn15.jpg";
import img16 from "@assets/stock_images/rjn16.jpg";
import img17 from "@assets/stock_images/rjn20.jpg";
import img18 from "@assets/stock_images/rjn21.jpg";
import img19 from "@assets/stock_images/rjn22.jpg";
import img20 from "@assets/stock_images/rjn17.jpeg";


const PHOTOS = [
  { id: 1, src: img1, caption: "Our first meeting" },
  { id: 2, src: img4, caption: "when i start trusting you" },
  { id: 3, src: img2, caption: "my birthday first wish from you" },
  { id: 4, src: img5, caption: "i want to touch you" },
  { id: 5, src: img3, caption: "starting of our love story" },
  { id: 6, src: img6, caption: "Love in bloom" },
  { id: 7, src: img7, caption: "Forever and always" },
  { id: 8, src: img8, caption: "my first sketch for you" },
  { id: 9, src: img9, caption: "Together we shine" },
  { id: 10, src: img10, caption: "Endless adventures" },
  { id: 11, src: img11, caption: "Happily ever after" },
  { id: 12, src: img12, caption: "our first long video call" },
  { id: 13, src: img13, caption: "my princess😇" },
  { id: 14, src: img14, caption: "🫣🥹🥹 ugly boy" },
  { id: 16, src: img16, caption: "you and me 🥳😝" },
  { id: 17, src: img17, caption: "awww my moon🥹😇" },
  { id: 18, src: img18, caption: "my beautifull hands🥰" },
  { id: 19, src: img19, caption: "my beautifull hands🥰" },
  { id: 20, src: img20, caption: "crying angel😇🥺" },
  
  
  
  
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOS[0] | null>(null);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-heading text-center mb-8">Our Memories</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-md bg-white"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.src} 
              alt={photo.caption} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl bg-transparent border-none shadow-none p-0 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedPhoto && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative rounded-lg overflow-hidden bg-white shadow-2xl"
              >
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.caption}
                  className="max-h-[80vh] w-auto object-contain"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-white font-heading text-2xl text-center">{selectedPhoto.caption}</p>
                </div>
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}

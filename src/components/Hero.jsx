import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import data from "../data/restaurantData";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')] bg-cover bg-center bg-no-repeat"
    >
      {/* Dark overlay with linear gradient for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 z-0"></div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        
        {/* Glowing Welcome Badge */}
        <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 animate-pulse">
          ✨ Welcome to Royal Restaurant
        </span>

        {/* Title with Gradient Text Highlights */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {data.heroTitle.split(" ").map((word, i) => {
            const lowerWord = word.toLowerCase();
            if (lowerWord.includes("delivered") || lowerWord.includes("door")) {
              return (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                  {word}{" "}
                </span>
              );
            }
            return word + " ";
          })}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed font-light">
          {data.heroSubTitle}
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 text-base"
          >
            Order Online <FaArrowRight className="text-sm" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 text-base"
          >
            Book A Table <FaCalendarAlt className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
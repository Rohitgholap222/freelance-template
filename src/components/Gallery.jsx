import { useRef, useState } from "react";
import {
  FaTimes,
  FaSearchPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const sliderRef = useRef();

  const images = [
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
      title: "Luxury Dining",
    },
    {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200",
      title: "Fine Cuisine",
    },
    {
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
      title: "Fresh Ingredients",
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
      title: "Chef Special",
    },
    {
      src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200",
      title: "Premium Steak",
    },
    {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200",
      title: "Healthy Salads",
    },
    {
      src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
      title: "Italian Pizza",
    },
    {
      src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200",
      title: "Restaurant Interior",
    },
  ];

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-gray-50 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
            Gallery
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Taste The Experience
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our finest dishes, elegant atmosphere,
            and unforgettable dining moments.
          </p>
        </div>

        {/* Gallery Slider */}
        <div className="relative">
          
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              z-20
              bg-white
              shadow-lg
              p-4
              rounded-full
              hover:bg-orange-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            <FaChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              z-20
              bg-white
              shadow-lg
              p-4
              rounded-full
              hover:bg-orange-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            <FaChevronRight />
          </button>

          {/* Images */}
          <div
            ref={sliderRef}
            className="
              flex
              gap-6
              overflow-x-auto
              scroll-smooth
              px-12
              scrollbar-hide
            "
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                onClick={() =>
                  setSelectedImage(image.src)
                }
                className="
                  min-w-[280px]
                  md:min-w-[320px]
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  cursor-pointer
                  relative
                  group
                "
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="
                    w-full
                    h-56
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Hover Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/50
                    opacity-0
                    group-hover:opacity-100
                    transition
                    duration-500
                    flex
                    flex-col
                    justify-center
                    items-center
                    text-white
                  "
                >
                  <FaSearchPlus className="text-2xl mb-3" />

                  <h3 className="font-semibold text-lg">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

       
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            bg-black/90
            flex
            items-center
            justify-center
            z-50
            p-6
          "
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute
              top-6
              right-6
              text-white
              text-3xl
            "
          >
            <FaTimes />
          </button>

          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedImage}
            alt="Preview"
            className="
              max-w-5xl
              w-full
              max-h-[90vh]
              object-contain
              rounded-3xl
            "
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;
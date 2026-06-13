function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  ];

  return (
    <section
      id="gallery"
      className="py-20 px-5 scroll-mt-20"
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        Gallery
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="
            rounded-xl
            h-72
            w-full
            object-cover
            "
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
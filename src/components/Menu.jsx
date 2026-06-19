function Menu() {
  const menuItems = [
  {
    name: "Truffle Butter Steak",
    price: "$34.99",
    description: "Premium grilled steak with herb butter and seasonal vegetables.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    tag: "Chef's Special",
  },
  {
    name: "Lobster Ravioli",
    price: "$28.50",
    description: "Fresh handmade ravioli filled with lobster and creamy sauce.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    tag: "Popular",
  },
  {
    name: "Fresh Burrata Salad",
    price: "$16.00",
    description: "Creamy burrata cheese with tomatoes and basil dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    tag: "Vegetarian",
  },
  {
    name: "Seafood Paella",
    price: "$32.00",
    description: "Spanish rice dish loaded with shrimp, mussels and seafood.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    tag: "Gluten-Free",
  },
  {
    name: "Roasted Duck",
    price: "$29.50",
    description: "Tender roasted duck breast served with orange glaze.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
    tag: "New",
  },
  {
    name: "Chocolate Lava Cake",
    price: "$12.00",
    description: "Warm molten chocolate cake with vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800",
    tag: "Dessert",
  },
];

  return (
    <section id="menu" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Our Signature Menu</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto rounded"></div>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Indulge in our culinary masterpieces, crafted by expert chefs using the freshest seasonal ingredients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full border border-gray-100 dark:border-gray-700/50">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {item.tag && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                  <span className="text-orange-600 font-extrabold text-lg shrink-0">{item.price}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2.5 rounded-xl font-semibold transition-colors duration-300">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menu;
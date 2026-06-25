import React, { useState, useEffect } from 'react';
import OrderModal from './OrderModal';

function Menu() {
  const [activeOrderDish, setActiveOrderDish] = useState(null);
  const [existingOrder, setExistingOrder] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);

  // Fetch recent orders from localStorage
  useEffect(() => {
    refreshHistory();
  }, []);

  const refreshHistory = () => {
    try {
      const orders = JSON.parse(localStorage.getItem('recent_orders') || '[]');
      setRecentOrders(orders);
    } catch (e) {
      setRecentOrders([]);
    }
  };

  const menuItems = [
  {
    name: "Paneer Tikka",
    price: "₹299.00",
    description: "Soft paneer cubes marinated in spices and grilled to perfection.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800",
    tag: "Chef's Special",
  },
  {
    name: "Butter Chicken",
    price: "₹399.00",
    description: "Tender chicken cooked in a rich and creamy tomato-based gravy.",
    image: "https://images.unsplash.com/photo-1772730065344-4cf131b39951?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJ1dHRlciUyMGNoaWNrZW58ZW58MHx8MHx8fDA%3D",
    tag: "Popular",
  },
  {
    name: "Veg Biryani",
    price: "₹249.00",
    description: "Fragrant basmati rice cooked with fresh vegetables and spices.",
    image: "https://t4.ftcdn.net/jpg/05/70/58/65/360_F_570586537_TnIgWdCnaTYpgg9gsTyloz5bnvfCtdLl.jpg",
    tag: "Vegetarian",
  },
  {
    name: "Chicken Biryani",
    price: "₹349.00",
    description: "Authentic dum biryani layered with aromatic rice and chicken.",
    image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d?w=800",
    tag: "Best Seller",
  },
  {
    name: "Tandoori Chicken",
    price: "₹449.00",
    description: "Classic tandoori chicken marinated with yogurt and spices.",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800",
    tag: "New",
  },
  {
    name: "Gulab Jamun",
    price: "₹149.00",
    description: "Soft milk-solid dumplings soaked in fragrant sugar syrup.",
    image: "https://t4.ftcdn.net/jpg/10/17/65/75/360_F_1017657553_BFjfgC9jaR5KFxJKfQZxVySUnYZ211bR.jpg",
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

          {/* Recent Receipts History Button & Dropdown */}
          {recentOrders.length > 0 && (
            <div className="mt-6 flex justify-center relative">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>📜 View Order History ({recentOrders.length})</span>
              </button>

              {showHistory && (
                <div className="absolute top-full mt-3 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/60 p-4 z-40 text-left max-h-72 overflow-y-auto">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 border-b border-gray-100 dark:border-gray-700 pb-2">Recent Bills & Receipts</h4>
                  <div className="space-y-2">
                    {recentOrders.map((ord) => (
                      <button
                        key={ord.orderId}
                        onClick={() => {
                          setExistingOrder(ord);
                          setShowHistory(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs text-left border border-transparent hover:border-gray-250 transition-all cursor-pointer text-gray-800 dark:text-gray-200"
                      >
                        <div className="truncate pr-2">
                          <p className="font-bold truncate">{ord.dish.name} (x{ord.quantity})</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{ord.orderDate} • Table {ord.tableNumber}</p>
                        </div>
                        <span className="font-extrabold text-orange-600 shrink-0">₹{ord.total.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
                <button 
                  onClick={() => setActiveOrderDish(item)}
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2.5 rounded-xl font-semibold transition-colors duration-300 cursor-pointer"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {(activeOrderDish || existingOrder) && (
        <OrderModal 
          dish={activeOrderDish || (existingOrder && existingOrder.dish)} 
          existingOrder={existingOrder}
          onClose={() => {
            setActiveOrderDish(null);
            setExistingOrder(null);
            refreshHistory();
          }} 
        />
      )}
    </section>
  );
}

export default Menu;
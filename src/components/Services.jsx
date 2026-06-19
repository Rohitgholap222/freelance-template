import {
  FaMotorcycle,
  FaConciergeBell,
  FaShoppingBag,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaMotorcycle />,
      title: "Food Delivery",
      desc: "Hot & fresh meals delivered quickly.",
    },
    {
      icon: <FaConciergeBell />,
      title: "Catering",
      desc: "Perfect for events and celebrations.",
    },
    {
      icon: <FaShoppingBag />,
      title: "Take Away",
      desc: "Order and pick up at your convenience.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gray-50 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
            Our Services
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            What We Offer
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-xl mb-4 group-hover:scale-110 transition">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
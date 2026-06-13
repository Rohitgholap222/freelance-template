import data from "../data/restaurantData";

function Services() {
  return (
    <section
      id="services"
      className="py-20 px-5 scroll-mt-20"
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        Our Services
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

        {/* Service 1 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3">
            Food Delivery
          </h3>

          <p className="text-gray-600">
            Get your favorite dishes delivered hot and fresh to your doorstep.
          </p>
        </div>

        {/* Service 2 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3">
            Catering
          </h3>

          <p className="text-gray-600">
            Perfect catering for parties, events, and special occasions.
          </p>
        </div>

        {/* Service 3 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3">
            Take Away
          </h3>

          <p className="text-gray-600">
            Quick and easy takeaway service for dine-in or takeaway orders.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Services;
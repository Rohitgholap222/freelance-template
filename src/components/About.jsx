import { FaAward, FaUtensils, FaUsers } from "react-icons/fa";
import data from "../data/restaurantData";

function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gray-50 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            A Passion For Great Food &
            <span className="text-orange-500"> Exceptional Experiences</span>
          </h2>

          
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200"
              alt="Restaurant Interior"
              className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
            />

            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white px-8 py-5 rounded-2xl shadow-xl">
              <h3 className="text-3xl font-bold">10+</h3>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Serving Delicious Memories Since Day One
            </h3>

            <p className="text-gray-600 leading-relaxed mb-8">
              We believe every meal should be more than just food—it should be
              an experience. Our chefs carefully craft each dish using fresh
              ingredients, authentic recipes, and a passion for culinary
              excellence.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-5">
              
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                  <FaUtensils size={22} />
                </div>

                <h4 className="font-semibold text-gray-900">
                  Fresh Ingredients
                </h4>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                  <FaAward size={22} />
                </div>

                <h4 className="font-semibold text-gray-900">
                  Premium Quality
                </h4>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-4">
                  <FaUsers size={22} />
                </div>

                <h4 className="font-semibold text-gray-900">
                  Happy Customers
                </h4>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
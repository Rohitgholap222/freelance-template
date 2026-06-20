import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";

function Reservation() {
  return (
    <section
      id="reservation"
      className="py-20 px-6 bg-gray-50 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
            Reservation
          </span>

          <h2 className="text-4xl font-bold mt-2">
            Book Your Table
          </h2>

          <p className="text-gray-500 mt-3">
            Reserve your dining experience in just a few clicks.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <form className="grid md:grid-cols-2 gap-5">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Date
              </label>

              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-4 text-orange-500" />

                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Time
              </label>

              <div className="relative">
                <FaClock className="absolute left-4 top-4 text-orange-500" />

                <input
                  type="time"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Number of Guests
              </label>

              <div className="relative">
                <FaUsers className="absolute left-4 top-4 text-orange-500" />

                <select
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5 Guests</option>
                  <option>6+ Guests</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="
                  w-full
                  bg-gradient-to-r
                  from-orange-500
                  to-amber-500
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                "
              >
                Reserve Table
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Reservation;
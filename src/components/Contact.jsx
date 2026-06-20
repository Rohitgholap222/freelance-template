import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-white scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold uppercase tracking-widest text-sm">
            Contact Us
          </span>

          <h2 className="text-4xl font-bold mt-2">
            Let's Reserve Your Table
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Have questions or want to make a reservation?
            Get in touch with us today.
          </p>
        </div>

        {/* Contact Card */}
        <div
          className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-xl
          border
          border-gray-100
          grid
          lg:grid-cols-2
          "
        >
          {/* Left Side */}
          <div
            className="
            bg-gradient-to-br
            from-orange-500
            to-amber-500
            text-white
            p-8
            flex
            flex-col
            justify-center
            "
          >
            <h3 className="text-3xl font-bold mb-6">
              Visit Our Restaurant
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sm text-white/90">
                    Pune, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-white/90">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-white/90">
                    info@restaurant.com
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <p className="italic text-sm">
                "Great food, warm hospitality, and unforgettable memories await you."
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8">
            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-orange-500
                "
              />

              <input
                type="email"
                placeholder="Email Address"
                className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:border-orange-500
                "
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="
                w-full
                border
                border-gray-200
                rounded-xl
                px-4
                py-3
                resize-none
                focus:outline-none
                focus:border-orange-500
                "
              />

              <button
                className="
                w-full
                bg-gray-900
                hover:bg-orange-500
                text-white
                py-3
                rounded-xl
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition-all
                duration-300
                "
              >
                Send Message
                <FaPaperPlane />
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
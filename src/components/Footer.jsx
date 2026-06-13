import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Royal Restaurant</h3>
          <p className="text-gray-400 max-w-xs mx-auto md:mx-0">
            Bringing you premium dining and authentic flavors since 2010. Made with passion and fresh local ingredients.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-orange-500 transition-colors">About</a></li>
            <li><a href="#menu" className="hover:text-orange-500 transition-colors">Menu</a></li>
            <li><a href="#gallery" className="hover:text-orange-500 transition-colors">Gallery</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-2xl">
            <a href="#" className="hover:text-orange-500 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Royal Restaurant. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0 justify-center">
          Made with <FaHeart className="text-red-500" /> for food lovers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
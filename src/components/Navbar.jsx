import { useState, useEffect } from "react";
import { FaUtensils, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll shadow and padding adjustments
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-md py-3"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4"
      } border-b border-gray-100 dark:border-gray-800/50`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="bg-orange-500 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <FaUtensils className="text-lg" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
            Royal<span className="text-orange-500">Restaurant</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium text-sm transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-orange-500/20 active:scale-95 block"
          >
            Book Table
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 hover:text-orange-500 focus:outline-none p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-150 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium text-base py-1.5 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 block"
            >
              Book Table
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
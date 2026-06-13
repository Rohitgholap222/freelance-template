import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center animate-bounce"
      style={{
        width: "60px",
        height: "60px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      <FaWhatsapp size={32} />
    </a>
  );
}

export default WhatsAppButton;

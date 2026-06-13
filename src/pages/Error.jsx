import { Link } from "react-router-dom";

function Error() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "120px",
        margin: "0",
        fontWeight: "900",
        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: "1"
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: "2rem",
        margin: "10px 0 20px 0",
        fontWeight: "700"
      }}>
        Oops! Page Not Found
      </h2>
      <p style={{
        color: "var(--text)",
        maxWidth: "480px",
        marginBottom: "30px",
        fontSize: "1.1rem",
        lineHeight: "1.6"
      }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="bg-orange-500 hover:bg-orange-600"
        style={{
          padding: "12px 28px",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "600",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.2s ease",
          backgroundColor: "#f97316"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#ea580c";
          e.target.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f97316";
          e.target.style.transform = "translateY(0)";
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Error;

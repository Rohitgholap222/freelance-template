function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-5 scroll-mt-20"
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        Contact Us
      </h2>

      <form
        className="
        max-w-xl
        mx-auto
        flex
        flex-col
        gap-4
        "
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
        />

        <textarea
          rows="5"
          placeholder="Message"
          className="border p-3 rounded-lg"
        />

        <button
          className="
          bg-orange-500
          text-white
          py-3
          rounded-lg
          "
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;
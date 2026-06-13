import data from "../data/restaurantData";

function About() {
  return (
    <section
      id="about"
      className="py-20 max-w-6xl mx-auto px-5 scroll-mt-20"
    >
      <h2 className="text-4xl font-bold mb-6">
        About Us
      </h2>

      <p className="text-gray-600 text-lg">
        {data.about}
      </p>
    </section>
  );
}

export default About;
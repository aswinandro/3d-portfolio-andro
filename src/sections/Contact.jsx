import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { ContactSkeleton, useSkeletonLoader } from "../components/Skeleton";

const Contact = () => {
  const { loading: isSkeletonLoading, showContent } = useSkeletonLoader(700);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useGSAP(() => {
    if (!showContent) return;

    // Simple floating animation for the profile picture
    gsap.to(".profile-image", {
      y: -20,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, [showContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, message } = form;
    const phoneNumber = "971545449182"; // WhatsApp number without '+'
    const whatsappMessage = `Hello Aswin, I'm ${name}.\n\nMy Email: ${email}\n\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Reset form and loading state
    setLoading(false);
    setForm({ name: "", email: "", message: "" });
  };

  if (isSkeletonLoading) {
    return <ContactSkeleton />;
  }

  return (
    <section id="contact" className={`transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"} flex-center section-padding`}>
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96 hidden xl:flex justify-center items-end">
            <div className="relative">
              <img
                src="/images/profile.png"
                alt="Aswin Andro"
                className="profile-image h-[550px] object-contain"
              />
              {/* Gradient overlay for a seamless merge with the background */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0d0d0f] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

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

    gsap.to(".profile-image", {
      y: -20,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.fromTo(
      ".contact-form-wrapper",
      { y: 40, opacity: 0, filter: "blur(5px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        },
      }
    );
  }, [showContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, message } = form;
    const phoneNumber = "971545449182";
    const whatsappMessage = `Hello Aswin, I'm ${name}.\n\nMy Email: ${email}\n\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setLoading(false);
    setForm({ name: "", email: "", message: "" });
  };

  if (isSkeletonLoading) {
    return <ContactSkeleton />;
  }

  return (
    <section
      id="contact"
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } flex-center section-padding`}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Get in Touch" sub="LET'S CONNECT" />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5 contact-form-wrapper">
            <div className="card-border rounded-xl p-10">
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
                    placeholder="What's your good name?"
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
                    placeholder="What's your email address?"
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

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(168, 85, 247, 0.3)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
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
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { scrollToSection } from "../helpers/utils";
import FloatingTechLayout from "./landing/FloatingTechIcons";
import ServiceScroll from "../services/servicesScroll/ServiceScroll";
import ServicesSection from "../services/ServicesSection";
import WhyChooseUs from "./why-us/WhyUs";
import TestimonialSection from "./testimonial/TestimonialSecion";
import FooterSection from "./footer/FooterSection";
import AboutPage from "./about/About";
import Clients from "./ourClients/Clients";

function LandingPage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [showGridEffect, setShowGridEffect] = useState(false);

  // Initialize grid effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGridEffect(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Grid animation effect
  useEffect(() => {
    if (!showGridEffect) return;

    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square, index) => {
      square.style.transitionDelay = `${index * 0.05}s`;
      square.style.opacity = "1";
      square.style.transform = "scale(1)";
    });
  }, [showGridEffect]);

  // Mouse hover effect for grid
  useEffect(() => {
    if (!showGridEffect) return;

    let lastTime = 0;
    const throttleTime = 16;

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleTime) return;
      lastTime = currentTime;

      const hoverLayer = document.getElementById("grid-hover-layer");
      if (hoverLayer) {
        const x = e.clientX;
        const y = e.clientY + window.scrollY;
        const gradientValue = `radial-gradient(circle 8rem at ${x}px ${y}px, black, transparent)`;
        hoverLayer.style.maskImage = gradientValue;
        hoverLayer.style.WebkitMaskImage = gradientValue;
        hoverLayer.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      const hoverLayer = document.getElementById("grid-hover-layer");
      if (hoverLayer) {
        hoverLayer.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showGridEffect]);

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  return (
    <div id="homeSection">
      <Navbar />
      <div className="relative w-full bg-white pt-16">
        {/* Base grid background */}
        <div className="grid-background" />

        {/* Hover effect layer */}
        <div className="grid-hover-layer" id="grid-hover-layer" />

        {/* Hero Section */}
        <FloatingTechLayout>
          <div className="h-[34rem] md:h-[40rem] flex flex-col items-center justify-center -mt-2">
            <div className="w-full px-4 text-center">
              <h1 className="text-black text-2xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold">
                <span className="inline-block">
                  Fueling Progress with Smart{" "}
                </span>
                <span className="inline-block text-blue-700 sm:text-black">
                  IT Solutions
                </span>
              </h1>
            </div>

            <div className="pt-4 sm:pt-14 text-center px-4 max-w-xl mx-auto">
              <p className="text-black text-center font-medium text-sm md:text-base lg:text-lg">
                We empower your business with powerful IT solutions that drive
                your success.
              </p>
            </div>

            <div className="flex pt-10 px-4 justify-center gap-4 flex-wrap">
              <button
                className="bg-blue-700 px-4 py-3 sm:px-6 sm:py-3 text-white text-sm sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services-section");
                }}
              >
                Get Started Today
              </button>
            </div>

            <p className="text-black text-center pt-8 px-4">
              Building Success Stories for
              <span className="text-blue-700"> 200+ Trusted Clients</span>
            </p>
          </div>
        </FloatingTechLayout>
      </div>
      {/* Service Scroll Section */}
      <ServiceScroll />
      <div id="aboutSection">
        <AboutPage />
      </div>

      {/* Services Section */}
      <div id="serviceSection" className="bg-gray-50 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 relative inline-block">
            Services
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400"></span>
          </h2>
        </div>
        <div id="services-section">
          <ServicesSection />
        </div>
      </div>

      {/* Popups */}
      {isContactPopupOpen && (
        <ContactPopup
          isOpen={isContactPopupOpen}
          onClose={toggleContactPopup}
        />
      )}

      {isAppointmentOpen && (
        <AppointmentPicker
          isOpen={isAppointmentOpen}
          onClose={() => setIsAppointmentOpen(false)}
        />
      )}

      <WhyChooseUs />
      <Clients/>
      <TestimonialSection />
      <FooterSection />
    </div>
  );
}

export default LandingPage;

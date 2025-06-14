/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { ContactPopup } from "../components/contact/ContactPopup";
import { useState } from "react";
import { logServicesButtonClick } from "../analytics";

export default function ServiceCard({ id, title, description, icon, image }) {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  return (
    <div className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#FAEEEE] rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer pb-6 flex flex-col transform hover:-translate-y-1 max-w-sm mx-auto h-full"
      >
        <div className="relative w-full overflow-hidden rounded-t-lg h-[15rem]">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover absolute top-0 left-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 transition-opacity duration-300 group-hover:bg-opacity-30" />
        </div>
        <div className="px-4 pt-2">
          <div>
            <h3 className="mt-4text-xl sm:text-2xl text-gray-800 group-hover:text-blue-500 transition-colors duration-300 font-medium">
              {title}{" "}
              <MoveUpRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 inline" />
            </h3>
            <p className="text-start text-gray-600 text-base md:text-lg mt-1 font-medium">
              {description}
            </p>
            <div className="text-center mt-5">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#3B82F6", // Tailwind's blue-500
                  color: "#ffffff",
                  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  toggleContactPopup();
                  logServicesButtonClick(id || "service page button click");
                }}
                className="p-3 px-6 border-2 border-blue-500 rounded-xl text-blue-500 font-semibold tracking-wide transition-colors duration-300"
              >
                Get Free Consultant 🚀
              </motion.button>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </motion.div>
      <ContactPopup isOpen={isContactPopupOpen} onClose={toggleContactPopup} />
    </div>
  );
}

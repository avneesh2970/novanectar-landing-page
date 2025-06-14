// const Button = ({ children, ...props }) => {
//   return (
//     <button
//       {...props}
//       className={`px-4 py-2 bg-white text-gray-800 rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
//         props.className || ""
//       }`}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;
"use client"

export default function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

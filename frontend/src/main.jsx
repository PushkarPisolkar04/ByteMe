import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // ✅ Loads global styles

// Check if the root element exists
const rootElement = document.getElementById("root");

if (rootElement) {
  // Render the application
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // Log error if root element is not found
  console.error("❌ Root element not found. Check your HTML file.");
}

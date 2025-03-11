import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"; // Home component now includes ConverterForm
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Only Home route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

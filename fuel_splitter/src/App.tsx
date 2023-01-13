import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SingleTripInfo from "./components/SingleTripInfo";
import GasHistory from "./components/History/GasHistory";
import "./Styles/app.scss";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<SingleTripInfo />} />
          <Route path="/history" element={<GasHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

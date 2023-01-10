import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SingleTripInfo from "./components/SingleTripInfo";
import GasHistory from "./components/History/GasHistory";

const App: React.FC = () => {
  return (
    <Router>
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

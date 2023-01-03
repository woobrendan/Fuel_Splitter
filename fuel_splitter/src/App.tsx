import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SingleTripInfo from "./components/SingleTripInfo";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SingleTripInfo />} />
          {/* <Route path='/history' element={<History />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

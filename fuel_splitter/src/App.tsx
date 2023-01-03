import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import NewTrip from "./components/NewTrip";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NewTrip />} />
          {/* <Route path='/history' element={<History />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

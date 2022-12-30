import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={} /> */}
          {/* <Route path='/history' element={<History />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

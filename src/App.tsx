import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Board from "./pages/Board";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Board />} />
            <Route path="/project/:id/card/:cardId" element={<Board />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

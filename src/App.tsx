import { Provider } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./store";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

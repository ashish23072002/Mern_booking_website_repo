import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./login/Login";
import Home from "./Pages/home/Home";
import Hotel from "./Pages/hotel/Hotel";
import List from "./Pages/list/List";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

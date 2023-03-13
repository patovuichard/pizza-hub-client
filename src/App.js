import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import User from "./pages/user/User";
import EditUser from "./pages/user/EditUser";
import AnyPizzeria from "./pages/user/AnyPizzeria";

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/edit" element={<EditUser />} />
          <Route path="/user/:id" element={<AnyPizzeria />}/>

          {/* error FE routes */}
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <img src="./pizza.svg" className="App-logo" alt="pizza" /> */}
      </div>
    </div>
  );
}

export default App;

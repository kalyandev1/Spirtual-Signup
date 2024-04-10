import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./signup/SignUp";
import LandingPage from "./comp/LandingPage";
// import Verify from "./signup/Verify";
import SignUpPage from "./signup/signUpPage";
import LoginPage from "./signup/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Verify />}></Route> */}
        <Route path="/" element={<LoginPage />}></Route>
          <Route path="/sign" element={<SignUpPage />}></Route>
          <Route path="/home" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

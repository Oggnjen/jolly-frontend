import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCall from "./pages/CreateCall";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import JoinCall from "./pages/JoinCall";

const Content = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" Component={CreateCall} />
          <Route path="/login" Component={Login} />
          <Route path="/registration" Component={Registration} />
          <Route path="/join-call" Component={JoinCall} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Content;

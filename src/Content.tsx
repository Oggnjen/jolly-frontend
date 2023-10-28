import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCall from "./pages/CreateCall";
import Login from "./pages/Login";

const Content = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" Component={CreateCall} />
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Content;

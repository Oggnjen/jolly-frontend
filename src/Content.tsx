import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCall from "./pages/CreateCall";

const Content = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" Component={CreateCall} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Content;

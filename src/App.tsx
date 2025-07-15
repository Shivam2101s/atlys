import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./components/pages/Auth";
import { HomeWithAuth } from "./components/pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeWithAuth />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

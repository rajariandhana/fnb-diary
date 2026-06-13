import "./App.css";
import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

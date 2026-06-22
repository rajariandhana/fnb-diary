import "./App.css";
import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import { ConsumeEntry } from "./components/ConsumeEntry";
import { RoastPortion } from "./components/RoastPortion";
import RoastForm from "./components/RoastForm";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/entry" element={<ConsumeEntry />} />
        <Route path="/roast" element={<RoastForm />} />
        <Route path="/roast-portion" element={<RoastPortion />} />
      </Route>
    </Routes>
  );
}

export default App;

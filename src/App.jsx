import "./App.css";
import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import { ConsumeEntry } from "./components/ConsumeEntry";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
				<Route path="/" element={<Home />} />
        <Route path="/entry" element={<ConsumeEntry />} />
      </Route>
    </Routes>
  );
}

export default App;

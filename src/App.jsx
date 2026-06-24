import "./App.css";
import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Home from "./components/Home";
import { ConsumeEntry } from "./components/ConsumeEntry";
import { RoastPortion } from "./components/RoastPortion";
import RoastForm from "./components/RoastForm";
import RoastHistory from "./components/RoastHistory";
import Guide from "./components/Guide";
import EntriesHistory from "./components/EntriesHistory";

function App() {
  return (
    <Routes>
      <Route element={<Layout is_home={true} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<Layout is_home={false} />}>
        <Route path="/entries" element={<ConsumeEntry />} />
				<Route path="/entries-history" element={<EntriesHistory />} />
        <Route path="/roast" element={<RoastForm />} />
        <Route path="/roast-history" element={<RoastHistory />} />
        <Route path="/roast/:roast_id" element={<RoastPortion />} />
        <Route path="/guide" element={<Guide />} />
      </Route>
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <div>
      <BrowserRouter basename="coin-tracker">
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId/*" element={<Coin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Router;

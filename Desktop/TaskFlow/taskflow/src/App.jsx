import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import BoardSiyahi from "./pages/BoardSiyahi";
import BoardDetal from "./pages/BoardDetal";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<BoardSiyahi />} />

          <Route
            path="/board/:id"
            element={<BoardDetal />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

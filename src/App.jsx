import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import HomePage from "./pages/home/HomePage";

const ThemePreview = lazy(() => import("./dev/ThemePreview"));

function App() {
  return (
    <Suspense fallback={<Box p="8">Loading...</Box>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dev/theme" element={<ThemePreview />} />
      </Routes>
    </Suspense>
  );
}

export default App;

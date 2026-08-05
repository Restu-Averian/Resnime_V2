import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Stack, Heading, Text, Button, Box } from "@chakra-ui/react";

const ThemePreview = lazy(() => import("./dev/ThemePreview"));

function HomePlaceholder() {
  return (
    <Container py="10">
      <Stack gap="6">
        <Heading textStyle="pageTitle">
          Resnime
        </Heading>

        <Text color="fg.muted">
          Frontend foundation is ready.
        </Text>

        <Button alignSelf="flex-start">
          Primary Action
        </Button>
      </Stack>
    </Container>
  );
}

function App() {
  return (
    <Suspense fallback={<Box p="8">Loading...</Box>}>
      <Routes>
        <Route path="/" element={<HomePlaceholder />} />
        <Route path="/dev/theme" element={<ThemePreview />} />
      </Routes>
    </Suspense>
  );
}

export default App;

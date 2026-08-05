import {
  Box,
  Button,
  Input,
  Textarea,
  Card,
  Badge,
  Tabs,
  Heading,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";

export default function ThemePreview() {
  return (
    <Box p="8" bg="bg.canvas" minH="100vh">
      <Heading textStyle="display" mb="2">Theme Preview</Heading>
      <Text textStyle="bodyMuted" mb="8">Validation for Chakra UI v3 global tokens and recipes.</Text>

      <Stack gap="8">
        <Box>
          <Heading textStyle="sectionTitle" mb="4">Typography</Heading>
          <Stack gap="2">
            <Heading textStyle="pageTitle">Page Title (Serif)</Heading>
            <Heading textStyle="panelTitle">Panel Title (Serif)</Heading>
            <Text textStyle="body">Body text uses Inter (Sans-serif) for high readability.</Text>
            <Text textStyle="label">Label text for forms and small UI elements.</Text>
          </Stack>
        </Box>

        <Box>
          <Heading textStyle="sectionTitle" mb="4">Buttons</Heading>
          <Flex gap="4" wrap="wrap">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="plain">Plain</Button>
            <Button variant="danger">Danger</Button>
          </Flex>
        </Box>

        <Box maxW="sm">
          <Heading textStyle="sectionTitle" mb="4">Inputs</Heading>
          <Stack gap="4">
            <Input placeholder="Search anime..." />
            <Textarea placeholder="Write a comment..." />
          </Stack>
        </Box>

        <Box>
          <Heading textStyle="sectionTitle" mb="4">Card</Heading>
          <Card.Root maxW="sm">
            <Card.Header>
              <Heading textStyle="cardTitle">Anime Title</Heading>
            </Card.Header>
            <Card.Body>
              <Text textStyle="bodyMuted">This is a standard card component using the dark navy surface.</Text>
            </Card.Body>
          </Card.Root>
        </Box>

        <Box>
          <Heading textStyle="sectionTitle" mb="4">Badges</Heading>
          <Flex gap="4">
            <Badge>Neutral</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="warm">Warm</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </Flex>
        </Box>

        <Box>
          <Heading textStyle="sectionTitle" mb="4">Tabs</Heading>
          <Tabs.Root defaultValue="tab1">
            <Tabs.List>
              <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Episodes</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Characters</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">Overview content</Tabs.Content>
            <Tabs.Content value="tab2">Episodes content</Tabs.Content>
            <Tabs.Content value="tab3">Characters content</Tabs.Content>
          </Tabs.Root>
        </Box>
      </Stack>
    </Box>
  );
}

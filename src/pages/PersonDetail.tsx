import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Text,
  Loader,
  Container,
  Title,
  Grid,
  Avatar,
  Center,
  Button,
  Box,
  Group,
  Divider,
  Badge,
} from "@mantine/core";
import { useState } from "react";
import { useAuthStore } from "../store/app.store";

const PersonDetail = () => {
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();
  const { data: person, isLoading } = useQuery(["person", id], async () => {
    const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
    return res.json();
  });

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { data: homeworld } = useQuery(
    ["homeworld", person?.homeworld],
    async () => {
      const res = await fetch(person.homeworld);
      return res.json();
    },
    { enabled: !!person?.homeworld }
  );

  if (isLoading || !person) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="md" py="xl">
      {user && (
        <Box pos="absolute" top={16} right={20}>
          <Button variant="light" color="red" radius="xl" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}

      <Center>
        <Box>
          <Center mb="md">
            {imageLoading && <Loader size="md" />}
            <Avatar
              size={160}
              src={`https://robohash.org/${person.name}`}
              radius={160}
              alt={person.name}
              onLoad={() => setImageLoading(false)}
              style={{
                border: "3px solid #ced4da",
              }}
            />
          </Center>
          <Title align="center" order={2} color="dark" mb="xs">
            {person.name}
          </Title>
          <Center>
            <Badge variant="outline" color="gray" size="lg">
              {homeworld?.name || "Homeworld"}
            </Badge>
          </Center>
        </Box>
      </Center>

      <Grid mt="xl" gutter="xl">
        <Grid.Col span={12} md={6}>
          <Card shadow="md" padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm" color="blue.7">
              Physical Attributes
            </Title>
            <Divider mb="sm" />
            <Text size="md">
              <strong>Height:</strong> {person.height} cm
            </Text>
            <Text size="md">
              <strong>Mass:</strong> {person.mass} kg
            </Text>
            <Text size="md">
              <strong>Birth Year:</strong> {person.birth_year}
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6}>
          <Card shadow="md" padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm" color="teal.7">
              Appearance
            </Title>
            <Divider mb="sm" />
            <Text size="md">
              <strong>Skin Color:</strong> {person.skin_color}
            </Text>
            <Text size="md">
              <strong>Eye Color:</strong> {person.eye_color}
            </Text>
            <Text size="md">
              <strong>Gender:</strong> {person.gender}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Text
        mt="lg"
        align="center"
        color="dimmed"
        size="sm"
        style={{ fontStyle: "italic" }}
      >
        Note: The image shown is a generated sample and not part of the API.
      </Text>

      <Center mt="xl">
        <Button
          size="md"
          radius="md"
          color="blue"
          variant="filled"
          onClick={() => navigate("/people")}
        >
          ← Back to People List
        </Button>
      </Center>
    </Container>
  );
};

export default PersonDetail;

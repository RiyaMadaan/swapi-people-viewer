import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Text,
  Loader,
  Container,
  Title,
  Stack,
  Avatar,
  Center,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { useAuthStore } from '../store/app.store';

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
      navigate('/login');
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

  const detailTextStyle = {
    fontSize: "1.2rem",
    fontWeight: 200,
    color: "#333",
  };

  return (
    <Container size="md" py="xl">
      {/* Title */}
      {user && (
        <div style={{ position: 'absolute', top: 12, right: 13, marginBottom:"20px" }}>
          <Button
            variant="outline"
            color="red"
            onClick={handleLogout}
            size="md"
            radius="xl"
            sx={{
              '&:hover': { backgroundColor: 'red', color: 'white' },
            }}
          >
            Logout
          </Button>
        </div>
      )}

      <Title
        align="center"
        order={2}
        mb="lg"
        style={{
          background: "linear-gradient(45deg, #FF6B6B, #FFD93D)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
          fontSize: "2.5rem",
          marginTop:"30px"
        }}
      >
        {person.name}
      </Title>

      <Card
        shadow="md"
        padding="xl"
        radius="md"
        withBorder
        style={{ backgroundColor: "#fff" }}
      >
        {/* Avatar */}
        {imageLoading && (
          <Center my="md">
            <Loader size="md" />
          </Center>
        )}
        <Avatar
          size={180}
          src={`https://robohash.org/${person.name}`}
          alt={person.name}
          radius={100}
          style={{ margin: "0 auto", border: "2px solid #eee" }}
          onLoad={() => setImageLoading(false)}
        />

        <Stack spacing="sm" mt="lg">
          <Text style={detailTextStyle}>
            <strong>Height:</strong> {person.height} cm
          </Text>
          <Text style={detailTextStyle}>
            <strong>Mass:</strong> {person.mass} kg
          </Text>
          <Text style={detailTextStyle}>
            <strong>Birth Year:</strong> {person.birth_year}
          </Text>
          <Text style={detailTextStyle}>
            <strong>Homeworld:</strong> {homeworld?.name || "Loading..."}
          </Text>
          <Text style={detailTextStyle}>
            <strong>Skin Color:</strong> {person.skin_color}
          </Text>
          <Text style={detailTextStyle}>
            <strong>Eye Color:</strong> {person.eye_color}
          </Text>
          <Text style={detailTextStyle}>
            <strong>Gender:</strong> {person.gender}
          </Text>
        </Stack>
      </Card>

      <Text style={{ ...detailTextStyle, fontStyle: 'italic', color: '#777', marginTop: 8, fontSize:"12" }}>
    Disclaimer: This image is not related to any API; it serves as a sample image.
  </Text>


      <Center>
        <Button
          size="md"
          component="a"
          href="/people"
          style={{
            background: "linear-gradient(135deg, #f3c9d6, #e2f0cb)",
            color: "#333",
            border: "none",
            padding: "0.6rem 1.4rem",
            fontWeight: 600,
            transition: "transform 0.2s, box-shadow 0.2s",
            marginTop: "30px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ← Back to People List
        </Button>
      </Center>
    </Container>
  );
};

export default PersonDetail;

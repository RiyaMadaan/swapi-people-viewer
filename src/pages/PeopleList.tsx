import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  TextInput,
  Card,
  Text,
  Title,
  Grid,
  Container,
  Center,
  Pagination,
  ActionIcon,
  Menu,
  Button,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { useAuthStore } from "../store/app.store";

const PeopleList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const itemsPerPage = 10;

  const { data, isLoading } = useQuery(
    ["people", search, currentPage, sortBy],
    async () => {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${search}&page=${currentPage}`
      );
      return res.json();
    }
  );

  const totalPages = Math.ceil((data?.count || 0) / itemsPerPage);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const sortedPeople = data?.results?.sort((a: any, b: any) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "birth_year") {
      return a.birth_year.localeCompare(b.birth_year);
    }
    return 0;
  });

  return (
    <>
      {user && (
        <div style={{ position: "absolute", top: 12, right: 13 }}>
          <Button
            variant="outline"
            color="red"
            onClick={handleLogout}
            size="md"
            radius="xl"
            sx={{
              "&:hover": { backgroundColor: "red", color: "white" },
            }}
          >
            Logout
          </Button>
        </div>
      )}
      <Container size="lg" py="xl" style={{ position: "relative" }}>
        <TextInput
          label="Search People"
          placeholder="e.g., Luke Skywalker"
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setCurrentPage(1);
          }}
          mb="xl"
          size="lg"
          sx={{
            backgroundColor: "white",
            marginTop: "40px",
            color: "black",
            padding: "10px",
            "& input": {
              color: "black",
            },
            "& .mantine-TextInput-input": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <Menu width={200} position="bottom-end" offset={4}>
            <Menu.Target>
              <ActionIcon size="lg">
                <FiFilter size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => setSortBy("name")}>
                Sort by Name
              </Menu.Item>
              <Menu.Item onClick={() => setSortBy("birth_year")}>
                Sort by Birth Year
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        {isLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : sortedPeople?.length === 0 ? (
          <Center>
            <Text size="lg" color="dimmed">
              No results found.
            </Text>
          </Center>
        ) : (
          <>
            <Grid gutter="md">
              {sortedPeople.map((person: any, index: number) => (
                <Grid.Col key={index} span={12} sm={6} md={4}>
                  <Link
                    to={`/people/${
                      (currentPage - 1) * itemsPerPage + index + 1
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      shadow="md"
                      padding="lg"
                      radius="md"
                      withBorder
                      sx={{
                        transition:
                          "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                          cursor: "pointer",
                          backgroundImage:
                            "linear-gradient(45deg, #f3c9d6, #e2f0cb)",
                          backgroundSize: "cover",
                        },
                        "&:hover h4, &:hover p, &:hover span, &:hover div": {
                          color: "white !important",
                        },
                      }}
                    >
                      <Title order={4} mb="xs" color="dark">
                        {person.name}
                      </Title>
                      <Text size="sm" color="dimmed">
                        Birth Year: {person.birth_year}
                      </Text>
                      <Text size="sm" color="dimmed">
                        Gender: {person.gender}
                      </Text>
                      <Text size="sm" color="dimmed">
                        Height: {person.height} cm
                      </Text>
                      <Text size="sm" color="dimmed">
                        Mass: {person.mass} kg
                      </Text>
                    </Card>
                  </Link>
                </Grid.Col>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Center mt="xl">
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                  size="lg"
                  color="blue"
                />
              </Center>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default PeopleList;

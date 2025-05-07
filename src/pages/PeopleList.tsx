import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  TextInput,
  Table,
  Text,
  Title,
  Container,
  Center,
  Pagination,
  ActionIcon,
  Menu,
  Button,
  Alert,
  Box
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/app.store";
interface Person {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
}
const PeopleList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useQuery(
    ["people", search, currentPage, sortBy],
    async () => {
      const res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${search}&page=${currentPage}`
      );
      if (!res.ok) throw new Error("Network response was not ok");
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

  const sortedPeople = data?.results?.sort((a: Person, b: Person) => {
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
          <Box pos="absolute" top={16} right={20}>
            <Button
              variant="light"
              color="red"
              radius="xl"
              onClick={handleLogout}
            >
              Logout
            </Button>
           </Box>
      )}
      <Container size="lg" py="xl" style={{ position: "relative", marginTop:"40px" }}>
        <div style={{ position: "relative" }}>
          <TextInput
            placeholder="e.g., Luke Skywalker"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              setCurrentPage(1);
            }}
            size="lg"
            sx={{
              borderRadius: "8px",
              border: "1px solid #4A90E2",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              "& input": {
                color: "black",
              },
              "&::placeholder": {
                color: "#A0A0A0",
              },
            }}
          />
          <ActionIcon
            onClick={() => setSearch("")}
            variant="outline"
            color="gray"
            size="lg"
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              border: "none",
              padding: 0,
            }}
            title="Clear search"
          >
            <FiX size={16} />
          </ActionIcon>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            marginTop: "20px",
          }}
        >
          <Title order={2}>People</Title>
          <Menu width={200} position="bottom-end" offset={4}>
            <Menu.Target>
              <ActionIcon
                size="lg"
                variant="light"
                color="gray"
                aria-label="Sort options"
              >
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
        ) : isError ? (
          <Center>
            <Alert title="Error" color="red">
              There was an error fetching the data.
            </Alert>
          </Center>
        ) : sortedPeople?.length === 0 ? (
          <Center>
            <Text size="lg" color="dimmed">
              No results found.
            </Text>
          </Center>
        ) : (
          <>
            <Table striped highlightOnHover>
              <thead style={{ backgroundColor: "#4A90E2", color: "white" }}>
                <tr>
                  <th style={{ color: "white" }}>Name</th>
                  <th style={{ color: "white" }}>Birth Year</th>
                  <th style={{ color: "white" }}>Height (cm)</th>
                  <th style={{ color: "white" }}>Mass (kg)</th>
                </tr>
              </thead>
              <tbody>
                {sortedPeople.map((person: Person, index: number) => (
                  <tr
                    key={index}
                    onClick={() =>
                      navigate(
                        `/people/${
                          (currentPage - 1) * itemsPerPage + index + 1
                        }`
                      )
                    }
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      cursor: "pointer",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e1e1e1";
                      e.currentTarget.style.color = "#333";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "#f9f9f9" : "#ffffff";
                      e.currentTarget.style.color = "inherit";
                    }}
                  >
                    <td>
                      <Text style={{ color: "#4A90E2" }}>{person.name}</Text>
                    </td>
                    <td>{person.birth_year}</td>
                    <td>{person.height}</td>
                    <td>{person.mass}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

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

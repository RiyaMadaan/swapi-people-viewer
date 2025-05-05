import {
  TextInput,
  Button,
  Paper,
  Title,
  Container,
  Center,
  Stack,
  Alert,
  Space,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const allowedUsernames = ['admin@test.com', 'user1@gmail.com'];

  const handleLogin = () => {
    if (allowedUsernames.includes(email)) {
      login(email);
      navigate('/people');
    } else {
      setError('Invalid email! Please enter a valid email.');
    }
  };

  return (
    <Container fluid style={{ height: '100vh', background: 'linear-gradient(45deg, #f3c9d6, #e2f0cb)' }}>
      <Center style={{ height: '100%' }}>
        <Paper
          p="xl"
          shadow="xl"
          radius="xl"
          style={{
            width: 400,
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title
            order={2}
            align="center"
            mb="lg"
            style={{
              fontFamily: 'Segoe UI, sans-serif',
              color: '#2c3e50',
              fontWeight: 700,
              fontSize: '2rem',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Welcome Back
          </Title>

          <Stack spacing="lg">
            <TextInput
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter your email"
              required
              styles={{
                input: {
                  borderRadius: 8,
                  borderColor: '#dcdcdc',
                  padding: 12,
                  fontSize: 14,
                  backgroundColor: '#fafafa',
                },
              }}
            />

            {error && (
              <Alert color="red" style={{ borderRadius: 8, backgroundColor: '#ffe5e5' }}>
                {error}
              </Alert>
            )}

            <Button
              onClick={handleLogin}
              fullWidth
              size="md"
              radius="md"
              sx={{
                background: 'linear-gradient(45deg, #f3c9d6, #e2f0cb)',
                color: '#333',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #e2f0cb, #f3c9d6)',
                },
              }}
            >
              Login
            </Button>
          </Stack>

          <Space h="lg" />
        </Paper>
      </Center>
    </Container>
  );
};

export default Login;

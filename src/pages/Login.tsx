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
  Loader,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const allowedUserNames = ['admin@test.com', 'user1@gmail.com',];

  const handleLogin = () => {
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (allowedUserNames.includes(email)) {
        login(email);
        navigate('/people');
      } else {
        setError('User  does not exist. Please check your email.');
      }
      setLoading(false);
    }, 1000); 
  };

  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container fluid style={{ height: '100vh', background: 'linear-gradient(45deg, #f3c9d6, #e2f0cb)' }}>
      <Center style={{ height: '100%'}}>
        <Paper
          p="xl"
          shadow="xl"
          radius="lg"
          style={{
            width: '100%',
            maxWidth: "35rem"
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
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                if (error) setError('');
              }}
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
              disabled={loading}
              sx={{
                background: 'linear-gradient(45deg, #f3c9d6, #e2f0cb)',
                color: '#333',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'background 0.3s ease, transform 0.3s ease',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  background: 'linear-gradient(45deg , #e2f0cb, #f3c9d6)',
                  transform: 'scale(1.02)',
                },
              }}
            >
              {loading ? <Loader size="sm" color="#333" /> : 'Login'}
            </Button>
          </Stack>

          <Space h="lg" />
        </Paper>
      </Center>
    </Container>
  );
};

export default Login;

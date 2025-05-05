import { FC } from 'react';
import { Button, Card, Container, Group, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/app.store';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Landing: FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        animation: `${fadeIn} 1s ease-in-out`,
        background: 'linear-gradient(45deg, #f3c9d6, #e2f0cb)', 
        position: 'relative', 
      }}
    >
      {user && (
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
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

      <Container size="sm" style={{ width: '100%' }}>
        <Card
          shadow="xl"
          padding="xl"
          radius="md"
          sx={{
            background: 'linear-gradient(45deg, #f3c9d6, #e2f0cb)', 
            animation: `${fadeIn} 1s ease-in-out`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
            },
            width: '100%',
          }}
        >
          <Title order={2} mb="md" ta="center" color="dark">
            Welcome to People Directory
          </Title>

          <Text mb="lg" c="dimmed" ta="center" color="dark">
            {user ? `You're logged in as ${user}.` : 'Login to explore and manage people records.'}
          </Text>

          <Group position="center" spacing="md">
            {user ? (
              <>
                <Button
                  onClick={() => navigate('/people')}
                  style={{ backgroundColor: '#8bc34a', color: 'white' }} 
                  size="md"
                  radius="xl"
                  variant="filled"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#7cb342', 
                      transform: 'scale(1.05)', 
                      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)', 
                    },
                  }}
                >
                  Go to People List
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                style={{ backgroundColor: '#ffcc99', color: 'white' }}
                size="lg"
                radius="xl"
                variant="filled"
                sx={{
                  '&:hover': { backgroundColor: '#ffb380' },
                }}
              >
                Login
              </Button>
            )}
          </Group>
        </Card>
      </Container>
    </div>
  );
};

export default Landing;
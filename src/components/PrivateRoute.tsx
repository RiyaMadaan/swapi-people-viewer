import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.store'; 

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((state) => state.user); 

  if (!user) {
    return <Navigate to="/login" />; 
  }

  return children; 
};


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard
    navigate('/');
  }, [navigate]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
};

export default Index;

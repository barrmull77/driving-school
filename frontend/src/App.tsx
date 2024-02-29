import React from 'react';
import AppRoutes from './AppRoutes';


// In a real world scenario I presume the app will have multiple routes and would use a page component for each route
const App: React.FC = () => {
  return (
    <AppRoutes />
  );
}

export default App;

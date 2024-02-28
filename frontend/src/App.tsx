import React from 'react';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Yakk code test
      </Typography>
      <Typography variant="body1">
        This is a basic implementation of an App component using Material-UI and TypeScript.
      </Typography>
    </Container>
  );
}

export default App;

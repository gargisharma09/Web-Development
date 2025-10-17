import { createStitches } from '@stitches/react';

// Define your design tokens
const { styled } = createStitches({
  colors: {
    primary: '#0070f3',
    secondary: '#1DB954',
    text: '#333',
  },
  space: {
    sm: '8px',
    md: '16px',
    lg: '32px',
  },
});

// Create a styled button
const Button = styled('button', {
  backgroundColor: '$primary',
  color: 'white',
  padding: '$md',
  borderRadius: '8px',
  fontSize: '16px',

  '&:hover': {
    backgroundColor: '$secondary',
  },
});

export default function App() {
  return <Button>Click Me</Button>;
}

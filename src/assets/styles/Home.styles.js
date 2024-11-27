import { styled } from '@mui/system';

export const HomeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#0D1117',
  color: '#C9D1D9',
  textAlign: 'center',
});

export const WelcomeMessage = styled('h1')({
  fontSize: '2.5rem',
  marginBottom: '20px',
  color: '#58A6FF',
});

export const ImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',

  img: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px', // Opcional: para bordes redondeados
  },
});
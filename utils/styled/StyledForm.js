import { styled } from '@mui/system';


export const Title = styled('h6')({
  fontFamily: 'inherit',
  fontWeight: 500,
  fontSize: 25,
  justifySelf: 'self-start',
  margin: 0,
  padding: 0
})


export const Label = styled('label')(({ fontfam, fontsz=16, mginbtm="1rem" }) => ({
  color: 'black',
  alignSelf: 'self-start',
  marginBottom: mginbtm,
  fontWeight: 300,
  width: '100%',
  fontSize: fontsz,
  fontFamily: fontfam,

  display: 'flex',
  flexDirection: 'column',
}))

export const Button = styled('button')(({ theme }) => ({
  fontFamily: 'inherit',
  outline: 'none',
  border: 'none',
  backgroundColor: 'indigo',
  padding: '.5rem',
  width: '100%',
  color: 'white',
  borderRadius: '5px',
  fontWeight: 500,
  fontSize: '17px',
  marginTop: '.7rem',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#5d5fef'
  }
}))

export const LinkTag = styled('span')(({ theme, padleft=0 }) => ({
  textDecoration: 'underline',
  paddingLeft: padleft,
  color:  theme.palette.primary.main,

  '&:hover': {
    color: '#a5a6f6'
  }
}))

export const Root = styled('div')({
  position: 'relative'
})

export const Logo = styled('span')({
  position: 'absolute',
})
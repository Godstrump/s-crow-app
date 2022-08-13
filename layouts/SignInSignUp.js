import LottieFiles from "../components/LottieFiles";
import { styled } from '@mui/system';


const Root = styled('div')(({ theme }) => ({
  fontFamily: 'Oswald',
  fontWeight: '400',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',

  display: 'grid',
  gridTemplateColumns: '1fr 1fr'
}));

const LeftBox = styled('div')(({ justifytype="center", aligntype="center" }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: `${justifytype}`,
  alignItems: `${aligntype}`,
}))

const SignInSignOut = ({ children, lottieData, jtfContent, alnItems }) => {

  return (
    <>
      <Root>
        <LeftBox  justifytype={jtfContent} aligntype={alnItems}>
          {children}
        </LeftBox>
        <LottieFiles lottie={lottieData} />
      </Root>
    </>
  )
}

export default SignInSignOut;
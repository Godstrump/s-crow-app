import { Box } from '@mui/material';
import Lottie from 'lottie-react';


// const LottieStyle = styled('div')

const LottieFiles = ({ lottie }) => {

  return (
      <Box component="div" sx={{ 
        backgroundColor: 'indigo', 
        '& svg': 
        { 
          width: '45% !important', 
          height: '45% !important' 
        }
         }}>
        <Lottie style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%' 
        }} animationData={lottie} />
      </Box>
  )
}

export default LottieFiles
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Box } from '@mui/material'


const Input = styled('input')(({ theme, txtindent=20, error }) => ({
  backgroundColor: '#E8F0FE',
  padding: '.5rem',
  width: '100%',
  borderRadius: 5,
  fontSize: 15,
  height: 40,
  fontFamily: 'Oswald',
  textIndent: txtindent,
  outlineColor: !!error ? 'red' : '#5d5fef',
  border: `1px solid ${!!error ? 'red' : '#a5a6f6'}`,
  boxShadow: '1px 1px 1px #d3d3d3',
  
  '&::-webkit-input-placeholder': {
    color: '#BDC6DD',
    fontSize: '.8vw',
    fontFamily: 'Oswald',    
  }
}))

const InputIcon = styled('span')(({ theme }) => ({
  color: theme.palette.tertiary.main,
  position: 'absolute',
  top: 10,
  left: 4,
  color: '#7e7e7e',
}))

const ErrorMsg = styled('span')({
  color: 'red',
  fontSize: 13,
  padding: 0,
  margin: 0
})

const FormInput = ({handleOnChange, placeholderTxt, inputType, name, value, inputIcon, indentTxt, errors, minChar}) => {

  return (
    <Box component="div" sx={{ position: 'relative', mt: '.3rem'}}>
      <Input 
      required
      error={errors} 
      txtindent={indentTxt} 
      type={inputType} 
      name={name} 
      {...handleOnChange(name, { required: true, minLength: minChar ?? 3, })}
      placeholder={placeholderTxt} 
      />
      { errors && <ErrorMsg>{errors}</ErrorMsg>}
      <InputIcon>{inputIcon}</InputIcon>
    </Box>
  )
}

FormInput.defaultProps = {
  inputType: 'text'
}

FormInput.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
}

export default FormInput;
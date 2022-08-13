import { useState, useEffect } from 'react';
import { useForm, useFormState } from "react-hook-form";
import FormInput from '../../components/FormInput';
import { styled } from '@mui/system';
import SignInSignUp from '../../layouts/SignInSignUp';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Label, Button, Title, LinkTag, Root, Logo } from '../../utils/styled/StyledForm'
import Link from 'next/link';
import { Typography } from '@mui/material/'
import Image from 'next/image';
import logo from '../../images/escrow_logo.svg'
import LottieFiles from '../../utils/lotties'
import { logIn } from '../../services/auth.service'


const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  gap: 50
})

const FormBox = styled('form')(({ theme }) => ({
  minWidth: '320px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

const { SIGNIN_LOTTIE, AUTH_PASS_LOTTIE, NOPASS_LOTTIE } = LottieFiles

const Login = () => {
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [lottie, setLottie] = useState(SIGNIN_LOTTIE);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLottie(SIGNIN_LOTTIE)
      // setPass(false)
    }, 1500);
    return () => {
      clearTimeout(timer)
    };
  }, [lottie])

  const onSubmit = async (data) => {
    const cred = await logIn(data)
    console.log(cred)
    if (cred.status === 200) {
      setLottie(AUTH_PASS_LOTTIE)
    } else {
      setLottie(NOPASS_LOTTIE)
    }
  }

  return (
    <Root>
      <Logo><Image width={100} height={100} src={logo} alt="Logo"/></Logo>
      <SignInSignUp lottieData={lottie}>
        <FormContainer>
            <Title>Welcome back!</Title>
            <FormBox  onSubmit={handleSubmit(onSubmit)} noValidate>
              <Label>
                Email
                <FormInput errors={errors?.email} handleOnChange={register} inputIcon={<PersonIcon fontSize="small" />} name="email" inputType="email" placeholderTxt="you@example.com" />
              </Label>
              <Label>
                Password
                <FormInput errors={errors?.password} handleOnChange={register} inputIcon={<LockIcon fontSize="small" />} name="password" inputType="password" placeholderTxt="Password" />
                <LinkTag style={{ alignSelf: "flex-end", paddingTop: 5 }}><Link href="/"> Forgot Password</Link></LinkTag>
              </Label>
              <Button type="submit">LOG IN</Button>
              <Typography style={{ paddingTop: 7 }} variant="body1">Don&apos;t have an account?<LinkTag><Link href="/signup"> Join us </Link></LinkTag></Typography>
            </FormBox>
          </FormContainer>
      </SignInSignUp>
    </Root>
  )
}

export default Login
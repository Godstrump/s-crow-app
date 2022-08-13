import { useState, useEffect } from 'react';

import SignInSignUp from '../../layouts/SignInSignUp';
import FormInput from '../../components/FormInput';
import { styled } from '@mui/system';
import { Label, Button, Title, LinkTag, Root, Logo } from '../../utils/styled/StyledForm'
import { Typography } from '@mui/material'
import Link from 'next/link';
import { validateForm, validEmailRegex } from '../../utils/validateForms'
import isEmpty from '../../utils/isEmpty'
import { useForm, useFormState } from "react-hook-form";
import logo from '../../images/escrow_logo.svg'
import Image from 'next/image';
import { capitalize } from '../../utils/capitalize';
import LottieFiles from '../../utils/lotties'
import { signUp } from '../../services/auth.service'

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: 25
})

const FormBox = styled('form')(({ theme }) => ({
  minWidth: '310px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}))

const { SIGNUP_LOTTIE } = LottieFiles

const SignUp = () => {


  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  
  const [pass, setPass] = useState(false)
  const [lottie, setLottie] = useState(SIGNUP_LOTTIE);
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })

  const { dirtyFields } = useFormState({ control })

  const onSubmit = async (data) => {
    console.log(data)
    // if (password !== confirmPassword) {
    //   setNoPass(true)
    //   return
    // }
    const res = await signUp(data)
    if (res.status === 201) setPass(true)
    else {
      setPass(false)
      setLottie(LottieFiles.IERROR_LOTTIE)
    }
  }

  const transformName = (name) => {
    if (name === 'firstName' || name === 'lastName') {
      return capitalize(name.split('Name').join('')) + ' name'
    }
    return capitalize(name)
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (dirtyFields[name] === undefined && value[name].length === 0) {
        setErrors((errs) => ({ ...errs, [name === 'confirmPassword' ? 'password' : name]: `${transformName(name)} field cannot be blank`}))
        setLottie(LottieFiles.IERROR_LOTTIE)
      } else {
        setErrors({ ...errors, [name]: '' })
      }

      if (name === 'confirmPassword') {
        if (value['password'] !== value['confirmPassword']) {
          setErrors((errs) => ({ ...errs, [name]: 'Password does not match'}))
          setLottie(LottieFiles.IERROR_LOTTIE)
        }
      }

      if (name === 'email') {
        if (!validEmailRegex.test(value[name])) {
          setErrors((errs) => ({ ...errs, [name]: 'Enter a valid email' }))
          setLottie(LottieFiles.IERROR_LOTTIE)
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dirtyFields, errors]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLottie(SIGNUP_LOTTIE)
      setPass(false)
    }, 2000);
    return () => {
      clearTimeout(timer)
    };
  }, [lottie])

  useEffect(() => {
    if (pass) {
      setLottie(LottieFiles.PASS_LOTTIE)
    }
  }, [pass])

  return (
    <Root>
      <Logo><Image width={100} height={100} src={logo} alt="Logo"/></Logo>
      <SignInSignUp lottieData={lottie} alnItems="center" jtfContent="space-around">
        <FormContainer>
            <Title>
              Sign Up!
              <Typography variant="body1" style={{ display: 'flex', marginTop: '.5rem', fontSize: 14 }}> Already have an account? <LinkTag padleft=".5rem"><Link href="/login">Log in</Link></LinkTag></Typography>
            </Title>
            
            <FormBox onSubmit={handleSubmit(onSubmit)} noValidate>
              <Label fontsz="15px">
                First name
                <FormInput errors={errors?.firstName} indentTxt="5px" name="firstName" handleOnChange={register} inputType="text" placeholderTxt="John" />
              </Label>

              <Label mginbtm="1.4rem" fontsz="15px">
                Last name
                <FormInput errors={errors?.lastName} indentTxt="5px" name="lastName" handleOnChange={register} inputType="text" placeholderTxt="Doe" />
              </Label>

              <Label mginbtm="1.4rem" fontsz="15px">
                Email
                <FormInput errors={errors?.email} indentTxt="5px" name="email" handleOnChange={register} inputType="email" placeholderTxt="you@example.com" />
              </Label>

              <Label mginbtm="1.4rem" fontsz="15px">
                Password
                <FormInput minChar={8} errors={errors?.password} indentTxt="5px" name="password" handleOnChange={register} inputType="password" placeholderTxt="Password" />
              </Label>

              <Label mginbtm="1.4rem" fontsz="15px">
                Confirm Password
                <FormInput minChar={8} errors={errors?.confirmPassword} indentTxt="5px" name="confirmPassword" handleOnChange={register} inputType="password" placeholderTxt="Password" />
              </Label>
              <Button type="submit">SIGN UP</Button>
            </FormBox>
          </FormContainer>
      </SignInSignUp>
    </Root>
  )
}

export default SignUp;
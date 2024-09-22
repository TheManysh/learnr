import React from 'react'
import SignUp from './components/sign-up'

const SignupPage = () => {
  return (
    <div className='flex flex-col space-y-5 items-center min-h-[calc(100vh-4.6rem)] py-8'>
      <h1 className='text-3xl font-semibold text-blue-600'>Signup to Learnr</h1>
      <SignUp />
    </div>
  )
}

export default SignupPage

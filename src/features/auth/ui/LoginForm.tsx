import React, { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Button} from '../../../shared/ui/Button';
import {Input} from '../../../shared/ui/Input';

interface LoginFormInputs {
  email: string;
  password: string;
}

export  const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('login data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Email"
        {...register('email')}
        ref={emailRef}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register('password')}
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};


import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';

type FormData = {
    email: string;
    password: string;
};
const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [loginError, setLoginError] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const response = await axios.post('/api/users/authenticate', data);
            // Handle successful login (store token, redirect, etc.)
        } catch (error) {
            setLoginError('Invalid credentials. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="email"
                {...register("email", {required: true})}
            />
            <input
                type="password"
                {...register("password",{required: true})}
            />
            {errors.email && <span>Email is required</span>}
            {errors.password && <span>Password is required</span>}
            <button type="submit">Login</button>
            {loginError && <p>{loginError}</p>}
        </form>
    );
};

export default LoginForm;

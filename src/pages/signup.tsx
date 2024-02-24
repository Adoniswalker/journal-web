// pages/register.js

import {useState} from 'react';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";

type SignUpData = {
    email: string;
    password: string;
}
export default function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm<SignUpData>();
    const [loginError, setLoginError] = useState('');

    const onSubmit: SubmitHandler<SignUpData> = async (data) => {
        try {
            const response = await axios.post('/api/users/authenticate', data);
            // Handle successful login (store token, redirect, etc.)
        } catch (error) {
            setLoginError('Invalid credentials. Please try again.');
        }
    };
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const router = useRouter();

    // const handleSubmit = async (e:any) => {
    //     e.preventDefault();

        // Perform user registration logic (e.g., send data to API)
        // You can use a backend API route to handle registration

        // Redirect to login page after successful registration
        // router.push('/login');
    // };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {required:true})}
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    // required
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {required:true})}
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

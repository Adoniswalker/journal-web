import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';
import '../app/globals.css';
import {setCookie} from "nookies";
import {useRouter} from "next/router";

type FormData = {
    email: string;
    password: string;
};
const LoginForm = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [loginError, setLoginError] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/users/login`, data);
            setCookie({  }, 'authToken', response.data.token, {
                maxAge: 86400, // 24 hours in seconds
                // httpOnly: true,
                path: '/',
            });
            router.push('/');
            // Handle successful login (store token, redirect, etc.)
        } catch (error) {
            console.error(error)
            setLoginError('Invalid credentials. Please try again.');
        }
    };

    return (
        // <body>
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            type="email"
                            placeholder="Email"
                            {...register("email", {required: true})}
                        /></div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            type="password"
                            placeholder="Password"
                            {...register("password", {required: true})}
                        />
                    </div>
                    {errors.email && <span>Email is required</span>}
                    {errors.password && <span>Password is required</span>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                        Login
                    </button>
                    {loginError && <p>{loginError}</p>}
                </form>
            </div>
        </div>
        // </body>
    );
};

export default LoginForm;

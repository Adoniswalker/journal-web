import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';
import '../app/globals.css';
import {setCookie} from "nookies";
import {useRouter} from "next/router";
import Link from "next/link";

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
        } catch (error:any) {
            console.error(error)
            if (error.isAxiosError && !error.response) {
                setLoginError(error.message);
            } else {
                setLoginError(error.response?.data?.message);
            }
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
                    {errors.email && <span>Email is required</span>}
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            type="password"
                            placeholder="Password"
                            {...register("password", {required: true})}
                        />
                    </div>
                    {errors.password && <span>Password is required</span>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                        Login
                    </button>
                    {loginError && <p>{loginError}</p>}
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Dont have an account?</span>
                    <Link href="/signup" className="text-blue-500 ml-1 hover:underline">Sign Up</Link>
                </div>
            </div>
        </div>
        // </body>
    );
};

export default LoginForm;

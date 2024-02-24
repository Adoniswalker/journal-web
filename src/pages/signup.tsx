'use client'
import {useState} from 'react';
import {useRouter} from 'next/router';
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import '../app/globals.css';

type SignUpData = {
    email: string;
    password: string;
}
export default function Register() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<SignUpData>();
    const [signupError, setSignUpError] = useState('');

    const onSubmit: SubmitHandler<SignUpData> = async (data) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/users/signup`, data);
            console.log(response)
            // Handle successful login (store token, redirect, etc.)
            router.push('/');
        } catch (error) {
            console.error(error)
            setSignUpError('Invalid credentials. Please try again.');
        }
    };
    return (
        // <body>
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
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
                        Signup
                    </button>
                    {signupError && <p>{signupError}</p>}
                </form>
            </div>
        </div>
        // </body>
    );
}

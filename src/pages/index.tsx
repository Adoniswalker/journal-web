'use client'
import {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import axios from 'axios';
import {useRouter} from "next/router";
import {checkIfUserIsLoggedIn} from "@/utils";
import {destroyCookie, parseCookies} from "nookies";
import '../app/globals.css';
import NavBar from "@/components/NavBar";

type JournalData = {
    content: string;
}


const ArticleForm = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<JournalData>();
    const [postError, setPostError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = checkIfUserIsLoggedIn(); // Implement your own logic to check if user is logged in

        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [router]);
    const onSubmit: SubmitHandler<JournalData> = async (data) => {
        try {
            // Authenticate user (use token from login)
            // ...
            const cookies = parseCookies();
            const authToken = cookies['authToken'];
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_HOST}/journal/create`,
                data,
                {headers: headers}
            );
            setSuccessMessage(response.data?.message)
            console.log(response)
            // Handle successful article post
        } catch (error:any) {
            console.error(error)
            if (error.isAxiosError && !error.response) {
                setPostError(error.message);
            } else {
                setPostError(error.response?.data?.message);
            }
        }
    };
    const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        destroyCookie(null, 'authToken')
        router.push('/login');
    };

    return (
        <>
        <NavBar
            handleLogout={handleLogout}
        />
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Journal</h1>
                <h2 className="text-lg font-semibold mb-4">Write your journal entry here</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {successMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p className="font-bold">Success!</p>
                            <p>{successMessage}</p>
                        </div>
                    )}
          <textarea
              maxLength={500}
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-md resize-none"
              placeholder="Write your thoughts here..."
              {...register("content", {
                  required: true,
                  minLength: 0,
                  maxLength:500
              })
              }/>
                    {errors.content && <span>Content is required</span>}
                    <button type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Post
                    </button>
                    {postError && <p className="text-red-500 text-sm">{postError}</p>}
                </form>
            </div>
        </div>
            </>
    );
};

export default ArticleForm;

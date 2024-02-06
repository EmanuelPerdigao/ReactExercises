import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { data } from "../SharedData";
import { useLocation } from 'react-router-dom';
import { LoginContext } from "../App";

export default function Register() {

    const url = data.baseURL + 'api/register/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useContext(LoginContext);


    useEffect(() =>{
        localStorage.clear();
        setLoggedIn(false);
    }, []);

    function Login(e) {
        e.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            })
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                return response.json();

            })
            .then((data) => {

                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                setLoggedIn(true);

                navigate(location?.state?.previousUrl
                    ? location.state.previousUrl
                    : '/customers'
                );
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    return (

        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={Login}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Email"></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder="Username"></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="******************"></input>
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                </form>

            </div>
        </div>

    )
}
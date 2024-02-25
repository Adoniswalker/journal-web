import Link from 'next/link';
import React from "react";

interface LogoutButtonProps {
    handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}
const Navbar: React.FC<LogoutButtonProps> = ({handleLogout}) => {


    return (
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto px-4">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/">
                            <span className="text-white font-bold">Home</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="text-white">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

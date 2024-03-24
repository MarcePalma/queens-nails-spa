import Link from 'next/link';
import React from 'react';

interface BackButtonProps {
    path: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
    return (
        <div className="fixed bottom-4 left-4 md:hidden">
            <Link href={path}>
                <div className="flex items-center space-x-2 text-purple-600 cursor-pointer absolute left-0 bottom-1 font-semibold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-narrow-left"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#a905b6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l14 0" />
                        <path d="M5 12l4 4" />
                        <path d="M5 12l4 -4" />
                    </svg>
                    Volver
                </div>
            </Link>
        </div>
    );
}

export default BackButton;

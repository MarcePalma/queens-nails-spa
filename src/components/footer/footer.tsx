import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-white footer border border-t-[#E91E63] border-l-transparent border-r-transparent">
            <div className="flex items-center container p-12 justify-start">
                <Link
                    href={"/"}
                    className="text-xl md:text-xl"
                >
                    <Image
                        width={70}
                        height={70}
                        src="/images/logo.webp"
                        alt="Logo"
                    />
                    
                </Link>
                <p>Tatiana Ramirez Salud y Belleza.©2024</p>
            </div>
        </footer>
    );
};


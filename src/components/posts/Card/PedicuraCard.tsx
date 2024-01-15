import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PedicuraCardProps {
    title: string;
    content: string;
    image: string;
}

const PedicuraCard: React.FC<PedicuraCardProps> = ({ title, content, image }) => {
    return (
        <Link href="#" className="group relative block bg-black">
            <Image
                width={1000}
                height={1000}
                alt={title}
                src={image}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-pink-500">{title}</p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm text-white">
                            {content}
                            <Image src={"/images/pedicure.png"} width={40} height={40} alt='test' className="text-xl font-bold text-white sm:text-2xl" />
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PedicuraCard;
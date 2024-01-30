import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PedicuraCardProps {
    title: string;
    content: string;
    image?: string;
}

const PedicuraCard: React.FC<PedicuraCardProps> = ({ title, content, image }) => {
    const [imageURL, setImageURL] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (image) {
            setImageURL(image);
        }
    }, [image]);

    return (
        <section className='max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 top-11 bg-[#121212]'>
            {imageURL && (
                <Link href="#" className="group relative block bg-black">
                    <Image
                        width={200}
                        height={200}
                        alt={title}
                        src={imageURL}
                        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">{title}</p>
                    </div>
                </Link>
            )}
        </section>
    );
};

export default PedicuraCard;
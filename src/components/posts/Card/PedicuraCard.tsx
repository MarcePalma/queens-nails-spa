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
            // Convierte la imagen base64 a Blob
            const blob = dataURItoBlob(image);
            
            // Crea una URL para el Blob
            const url = URL.createObjectURL(blob);

            // Establece la URL en el estado
            setImageURL(url);
        }
    }, [image]);

    const dataURItoBlob = (dataURI: string): Blob => {
        const byteString = atob(dataURI.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([int8Array], { type: 'image/png' });
    };

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
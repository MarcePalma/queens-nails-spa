import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Postscard() {
    return (
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 top-11">
            <Link href="#" className="group relative block bg-black">
                <Image
                    width={1000}
                    height={1000}
                    alt="Developer"
                    src="/images/example.jpg"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />

                <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">Manicura</p>

                   

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div
                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                        >
                            <p className="text-sm text-white">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
                                quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
                            </p>
                            <Image src={"/images/nail.png"} width={40} height={40} alt='test' className="text-xl font-bold text-white sm:text-2xl"/>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="#" className="group relative block bg-black">
                <Image
                    width={1000}
                    height={1000}
                    alt="Developer"
                    src="/images/example.png"
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />

                <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">Pedicura</p>

                   

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div
                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                        >
                            <p className="text-sm text-white">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
                                quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
                            </p>
                            <Image src={"/images/pedicure.png"} width={40} height={40} alt='test' className="text-xl font-bold text-white sm:text-2xl"/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>


    )
}

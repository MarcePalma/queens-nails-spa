"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";


export default function EmailSection() {

    return (
        <section
            id="contact"
            className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative overflow-hidden"
        >
            <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
            <div className="relative">
                <h5 className="text-4xl font-bold my-2">
                    <span className="bg-clip-text bg-gradient-to-r from-pink-400 to-red-600 text-transparent">
                        Conectemos
                    </span>
                </h5>
                <p className="text-[#ADB7BE] mb-4 max-w-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum, turpis in sollicitudin pretium, lectus nisl malesuada enim, non fringilla ante arcu quis nunc. 
                </p>
                <div className="socials flex flex-row gap-2">
                    <Link target="_blank" href="https://www.instagram.com/t.r_nails_spa/">
                        <Image width="100" height={100} src={"/images/instagram-icon.webp"} alt="Instagram Icon" />
                    </Link>
                </div>
            </div>
            <div>
                <form className="flex flex-col" >
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="text-white block mb-2 text-sm font-medium"
                        >
                            Tu e-mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            required
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="ejemplo@gmail.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="subject"
                            className="text-white block text-sm mb-2 font-medium"
                        >
                            Motivo
                        </label>
                        <input
                            name="subject"
                            type="text"
                            id="subject"
                            required
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hola!"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="text-white block text-sm mb-2 font-medium"
                        >
                            Mensaje
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Mensaje"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
                    >
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </section>
    );
};


"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";


export default function EmailSection() {

    return (
        <section className="grid md:grid-cols-2 my-12 md:my-12 gap-4 relative overflow-hidden py-20">
            <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5">
                <h5 className="text-white mb-4 text-4xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 z-10">
                        CONECTEMOS
                    </span>
                </h5>
                <p className="text-[#000] mb-4 max-w-md font-bold">
                    En nuestro comercio, nos apasiona brindarte la mejor experiencia posible.
                    Si tienes alguna pregunta, duda o simplemente deseas compartir tus ideas con nosotros, no dudes en contactarnos. Estamos aquí para escucharte y trabajar juntos para satisfacer tus necesidades.
                </p>
            </div>
            <div>
                <form className="flex flex-col px-6 py-8 rounded-sm sm:p-8">
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="text-black block mb-2 text-sm font-semibold"
                        >
                            Tu e-mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            required
                            className="bg-[#fff] border border-[#E91E63] placeholder-[#000] text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="ejemplo@gmail.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="subject"
                            className="text-black font-semibold block text-sm mb-2"
                        >
                            Motivo
                        </label>
                        <input
                            name="subject"
                            type="text"
                            id="subject"
                            required
                            className="bg-[#fff] border border-[#E91E63] placeholder-[#000] text-black text-sm rounded-lg block w-full p-2.5"
                            placeholder="Hola!"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="text-black font-semibold block text-sm mb-2 "
                        >
                            Mensaje
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="bg-[#fff] border border-[#E91E63] placeholder-[#000] text-black text-sm rounded-lg block w-full p-2.5"
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


"use client";

import React, { useEffect, useState } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirectToPage } from "@utils/pageProtect";

const Home = () => {
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    redirectToPage(status, session, router);
  }, [status, session, router]);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  return (
    <section className="pt-24">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
            <span>Start</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Quirking
            </span>{" "}
            your thoughts <span>around the world</span>
          </h1>
          <p className="px-0 mb-8 text-lg text-gray-300 font-medium md:text-xl lg:px-24">
            Quirkify is the noiseless platform for your thoughts. You can share
            your thoughts there.
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8 grid sm:grid-flow-col justify-center  ">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  class="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-6 group bg-green-400 hover:bg-gray-150 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-green-400 mb-2"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                >
                  <span class="text-gray-900 text-lg flex items-center ">
                    Get Started <FaArrowRight />
                  </span>
                </button>
              ))}
            <a href="https://github.com/VAmanjain/Quirkify" target="_blank" className="">
              <button class="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-6 group bg-gray-100 hover:bg-gray-150 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-gray-100 ">
                <svg
                  class="mr-2 text-gray-900"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span class="text-gray-900 text-lg  ">Star on Github</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

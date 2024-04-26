"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [providers, setProviders] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState([]);


  // useEffect(()=>{
  //   if (status==="authenticated"){
  //     router.replace('/explore');
  //   }
  //   else router.replace('/');
  // },[status])


  // useEffect(() => {
  
  //   const redirectToPage = async () => {
  //     if (status === "authenticated") {
  //       if (session && session.user) {
  //         const sessionId = session.user.id;
  //         try {
  //           const response = await fetch(`/api/user-profile/${sessionId}/user`);
  //           const data = await response.json();
  //           console.log(data);
  //           if (data && data.length > 0) {
  //             router.replace("/explore"); // Redirect existing user to explore page
  //           } else {
  //             router.replace("/user-profile"); // Redirect new user to user-profile page
  //           }
  //         } catch (error) {
  //           console.error("Error fetching user data:", error);
  //         }
  //       }
  //     } else {
  //       router.replace("/"); // Redirect user to home page if not authenticated
  //     }
  //   };

  //   redirectToPage();
  // }, [status, session, router]);

  useEffect(() => {
    const redirectToPage = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await fetch(`/api/user-profile/${session.user.id}/user`);
          const { UserProfiles } = await response.json();
          if (Array.isArray(UserProfiles) && UserProfiles.length === 0) {
            router.replace("/user-profile"); // Redirect new user to user-profile page
          } else {
            router.replace("/explore"); // Redirect existing user to explore page
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.replace("/user-profile"); // Redirect in case of error
        }
      } else if (status === "unauthenticated") {
        router.replace("/"); // Redirect user to home page if not authenticated
      }
    };

    redirectToPage();
  }, [status, session, router]);


  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <section className="pt-24 ">
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left  md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            <span>Start</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Quirking
            </span>{" "}
            your thoughts <span>around world </span>
          </h1>
          <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            Start gaining the traction you've always wanted with our next-level
            templates and designs. Crafted to help you tell your story.
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-lg sm:w-auto sm:mb-0"
                >
                  Get Started
                  <FaArrowRight />
                </button>
              ))}
            <a
              href="#_"
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-lg sm:w-auto sm:mb-0  border-[#111827] border-[2px] "
            >
              Give star on <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

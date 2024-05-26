"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const Nav = () => {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState([]);
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const fetchUser = async (sessionId) => {
    try {
      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const data = await response.json();

      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Call fetchPosts when session ID changes
  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem("sessionId", session.user.id); // Store session ID in localStorage
      fetchUser(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex mx-auto justify-between items-center w-full mb-16 pt-3 max-w-[1100px] ">
      <Link href="/" className="flex gap-2 flex-center">
        <p className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline text-2xl font-bold">Quirkify</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post">
              <Button variant="outline" className="rounded-full">
                {" "}
                Create Post
              </Button>
            </Link>
            <Button
              variant="secondary"
              type="button"
              onClick={signOut}
              className="rounded-full"
            >
              Sign Out
            </Button>
            {userProfile.UserProfiles ? (
              <Link href="/profile">
                <Image
                  src={
                    userProfile?.UserProfiles?.length > 0 &&
                    userProfile.UserProfiles[0].image.startsWith("/")
                      ? userProfile.UserProfiles[0].image
                      : userProfile?.UserProfiles?.length > 0
                      ? `/${userProfile.UserProfiles[0].image}`
                      : `${session?.user.image}`
                  }
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Skeleton className="h-12 w-12 rounded-full" />
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  variant="secondary"
                  className="rounded-full"
                >
                  Sign in
                </Button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {userProfile.UserProfiles ? (
              <Image
                src={
                  userProfile?.UserProfiles?.length > 0 &&
                  userProfile.UserProfiles[0].image.startsWith("/")
                    ? userProfile.UserProfiles[0].image
                    : userProfile?.UserProfiles?.length > 0
                    ? `/${userProfile.UserProfiles[0].image}`
                    : `${session?.user.image}`
                }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />
            ) : (
              <Skeleton className="h-8 w-8 rounded-full" />
            )}

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-2 pt-2 border-t-2 border-white w-full black_btn text-white "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  variant="secondary"
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="rounded-full"
                >
                  Sign in
                </Button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

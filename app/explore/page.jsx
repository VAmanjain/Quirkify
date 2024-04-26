"use client";

import Feed from "@components/Feed";
import { fetchData } from "next-auth/client/_utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Landing = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState([]);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/explore");
  //   } else router.replace("/");
  // }, [status]);

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

  // Load session ID from localStorage on component mount
  useEffect(() => {
    if (session?.user?.id) {
      const storedSessionId = localStorage.getItem("sessionId");
      if (storedSessionId) {
        fetchUser(storedSessionId);
      }
    }
  }, []);

  // Fetch user function

  const fetchUser = async (sessionId) => {
    try {
      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const data = await response.json();
      console.log(data);
      setUserInfo(data);
      console.log(userInfo);
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


  return (
    <div>
      <Feed />
    </div>
  );
};

export default Landing;

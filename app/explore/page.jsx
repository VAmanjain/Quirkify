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
  //   const redirectToPage = async () => {
  //     if (status === "authenticated" && session?.user) {
  //       try {
  //         const response = await fetch(
  //           `/api/user-profile/${session.user.id}/user`
  //         );
  //         const { UserProfiles } = await response.json();
  //         if (Array.isArray(UserProfiles) && UserProfiles.length === 0) {
  //           router.replace("/user-profile"); //
  //         } else {
  //           router.replace("/explore");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //         router.replace("/user-profile"); //
  //       }
  //     } else if (status === "unauthenticated") {
  //       router.replace("/");
  //     }
  //   };

  //   redirectToPage();
  // }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.id) {
      const storedSessionId = localStorage.getItem("sessionId");
      if (storedSessionId) {
        fetchUser(storedSessionId);
      }
    }
  }, []);

  const fetchUser = async (sessionId) => {
    try {
      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const data = await response.json();

      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Call fetchPosts when session ID changes
  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem("sessionId", session.user.id);
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

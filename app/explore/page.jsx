"use client";

import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Landing = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    } else if (status === "authenticated" && session?.user) {
      handleUserProfileRedirect(session.user.id);
    }
  }, [status, session, router]);

  const handleUserProfileRedirect = async (userId) => {
    try {
      const response = await fetch(`/api/user-profile/${userId}/user`);
      const { UserProfiles } = await response.json();

      if (Array.isArray(UserProfiles) && UserProfiles.length === 0) {
        router.replace("/user-profile");
      } else {
        router.replace("/explore");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.replace("/user-profile");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem("sessionId", session.user.id);
      fetchUser(session.user.id);
    }
  }, [session]);

  const fetchUser = async (sessionId) => {
    try {
      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const data = await response.json();

      setUserInfo(data);
    } catch (error) {
      setError(error);
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Feed />
      )}
    </div>
  );
};

export default Landing;
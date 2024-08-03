"use client";

import Feed from "@components/Feed";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Landing = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, session, router]);

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

  return <div>{error ? <div>Error: {error.message}</div> : <Feed />}</div>;
};

export default Landing;

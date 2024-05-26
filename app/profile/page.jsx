"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [interval, setInterval]= useState('')
  useEffect(() => {
    const handleAuthentication = async () => {
      if (status === "unauthenticated") {
        router.replace("/");
      } else if (status === "authenticated" && session?.user) {
        const storedSessionId = localStorage.getItem("sessionId");
        if (storedSessionId) {
          await fetchData(storedSessionId);
        } else {
          localStorage.setItem("sessionId", session.user.id);
          await fetchData(session.user.id);
        }
      }
    };
  
    const interval = setInterval(handleAuthentication, 10000);
  
    return () => clearInterval(interval);
  }, [status, session, router]);

  const fetchData = async (sessionId) => {
    try {
      const [postsResponse, userResponse] = await Promise.all([
        fetch(`/api/users/${sessionId}/posts`),
        fetch(`/api/user-profile/${sessionId}/user`),
      ]);

      const postsData = await postsResponse.json();
      const userData = await userResponse.json();

      setPosts(postsData);
      setUserProfile(userData.UserProfiles?.[0] || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure? you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`api/thought/${post._id.toString()}`, {
          method: "DELETE",
        });
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      userProfile={userProfile}
      desc="Welcome to your personalized profile"
      data={posts}
      handleDelete={handleDelete}
      
    />
  );
};

export default MyProfile;
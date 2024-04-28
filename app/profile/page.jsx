"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";


const MyProfile = () => {

  const [posts, setPosts] =useState([]);
  const [ userProfile, setUserprofile] = useState ([]);
  const router = useRouter();
  const {data:session, status}= useSession();
  
  
  useEffect(() => {
    const redirectToPage = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await fetch(`/api/user-profile/${session.user.id}/user`);
          const { UserProfiles } = await response.json();
          if (Array.isArray(UserProfiles) && UserProfiles.length === 0) {
            router.replace("/user-profile"); // Redirect new user to user-profile page
          } else {
            router.replace("/profile"); // Redirect existing user to explore page
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
        fetchPosts(storedSessionId);
        fetchUser(storedSessionId);
      }
    }
  }, []);

  // Fetch posts function
  const fetchPosts = async (sessionId) => {
    try {
      const response = await fetch(`/api/users/${sessionId}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const fetchUser = async (sessionId) => {
    try {
      const response = await fetch(`/api/user-profile/${sessionId}/user`);
      const data = await response.json();
      setUserprofile(data)
     console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Call fetchPosts when session ID changes
  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem("sessionId", session.user.id); // Store session ID in localStorage
      fetchPosts(session.user.id);
      fetchUser(session.user.id);
    }
  }, [session]);




  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure? you want to delete this post?")

    if(hasConfirmed){
      try {
        await fetch(`api/thought/${post._id.toString()}`, {
          method:"DELETE"
        })
        const filteredPosts = posts.filter((p)=>p._id!==post._id);
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Profile
    userProfile={userProfile.UserProfiles && userProfile.UserProfiles.length > 0 ? userProfile.UserProfiles[0] : null}
      desc="Welcome to your personlaized profile"
      data={posts}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

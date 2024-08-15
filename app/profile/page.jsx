"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Loader from "@components/Loader";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, session, router]);

  const fetchUserData = async () => {
    if (session?.user?.id) {
      await fetchData(session?.user?.id); // Initial data fetch
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [session?.user?.id]);

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
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeImage = async (publicIds) => {
    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ publicId: publicIds }),
      });

      if (res.ok) {
        // Remove the image from the uploadedImages state

        console.log("remove successfully");
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure? you want to delete this post?");
    if (hasConfirmed) {
      try {
        const publicIds = post.images.map((image) => image.public_id);
        await removeImage(publicIds); // Corrected to access public_id properly
        await fetch(`api/thought/${post._id.toString()}`, {
          method: "DELETE",
        });
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (<>
    {loading ? <Loader/> :
    <Profile
    userProfile={userProfile}
    desc="Welcome to your personalized profile"
    data={posts}
    handleDelete={handleDelete}
    fetchPosts={fetchUserData}
    />}
    </>
  );
};

export default MyProfile;

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import Loader from "@components/Loader";

const ViewProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  
  const router = useRouter();
  const { data: session, status } = useSession();
  const paramsId = params.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const [postResponse, userResponse] = await Promise.all([
        fetch(`/api/users/${paramsId}/posts`),
        fetch(`/api/user-profile/${paramsId}/user`),
      ]);
      const postData = await postResponse.json();
      const userData = await userResponse.json();
      setPosts(postData);
      setUserProfile(userData.UserProfiles?.[0] || null);
    
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
  
    }
  };
  useEffect(() => {
    fetchData(paramsId); // Initial data fetch
  }, [paramsId]);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`api/thought/${post._id.toString()}`, {
          method: "DELETE",
        });
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Profile
          userProfile={userProfile}
          desc="Welcome to your personalized profile"
          data={posts}
          handleDelete={handleDelete}
          fetchPosts={fetchData}
        />
      )}
    </>
  );
};

export default ViewProfile;

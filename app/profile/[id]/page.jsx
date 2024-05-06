"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const ViewProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const paramsId = params.id;

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
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataFetched(true);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 2 seconds
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [paramsId]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // Redirect user to home page if not authenticated
    }
  }, [status, router]);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`api/thought/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <Profile
      userProfile={userProfile}
      desc="Welcome to your personalized profile"
      data={posts}
      handleDelete={handleDelete}
    />
  );
};

export default ViewProfile;

"use client";

import { useState, useEffect } from "react";
import ThoughtCard from "./Card";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

const ThoughtCardList = ({ data, handleTagClick }) => {



  return (
    <div className="mt-16 feed_layout ">
      {data.map((post) => (
        <ThoughtCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/thought", { 'cache': 'no-store' });
      const data = await response.json();
      setPosts(data.reverse());// change this reverse to sort according to time *************************
      console.log(data); //.........remove
    };

    fetchPosts();
  }, []);

  

  return (
    <section className="feed max-w-[768px] ">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Find through tag and username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <ThoughtCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;

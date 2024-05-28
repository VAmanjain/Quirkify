"use client";

import { useState, useEffect } from "react";
import FilterCardList from "./FilterCardList";
import ThoughtCardList from "./ThoughtCardList";
import { Input } from "./ui/input";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filterProfile, setFilterProfile] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      fetchQuery();
    }
  }, [searchText]);

  const fetchQuery = async () => {
    try {
      let queryParams = "";
      if (searchText.startsWith("#")) {
        queryParams = `?tag=${searchText.slice(1)}`;
        console.log(queryParams);
      } else if (searchText.startsWith("@")) {
        queryParams = `?quirkId=${searchText.slice(1)}`;
        console.log(queryParams);
      } else {
        queryParams = `?query=${searchText}`;
        console.log(queryParams);
      }
      const response = await fetch(`/api/search${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setFilterProfile(data);
      console.log(filterProfile);
    } catch (error) {
      console.error(`Fetch problem: ${error.message}`);
    }
  };
  
  const fetchPosts = async () => {
    const response = await fetch("/api/thought", { cache: "no-store" });
    const data = await response.json();
    const sortedPosts = await data.sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setPosts(sortedPosts);
  };

 

  return (
    <section className="feed mx-auto max-w-[768px]  ">
      <form className="relative w-full flex-center">
        <Input
          type="text"
          placeholder="Find through tag and username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
      </form>

      {searchText !== "" ? (
        <FilterCardList
          userProfiles={filterProfile}
          fetchQuery={fetchQuery}
          setSearchText={setSearchText}
        />
      ) : (
        <ThoughtCardList
          data={posts}
          fetchPosts={fetchPosts}
          setSearchText={setSearchText}
        />
      )}
    </section>
  );
};

export default Feed;

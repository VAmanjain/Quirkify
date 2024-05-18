"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import FilterCardList from "./FilterCardList";
import ThoughtCardList from "./ThoughtCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filterProfile, setFilterProfile] = useState([]);
  const query = useDebounce(searchText, 2000);

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
  useEffect(() => {
    if (searchText !== "") {
      fetchQuery();
    }
  }, [searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/thought", { cache: "no-store" });
      const data = await response.json();
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
      setPosts(sortedPosts);
    };

    const interval = setInterval(() => {
      fetchPosts();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="feed max-w-[768px]">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Find through tag and username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      {searchText !== "" ? (
        <FilterCardList
          userProfiles={filterProfile}
          fetchQuery={fetchQuery}
          setSearchText={setSearchText}
        />
      ) : (
        <ThoughtCardList data={posts} fetchQuery={fetchQuery} setSearchText={setSearchText}   />
      )}
    </section>
  );
};

export default Feed;

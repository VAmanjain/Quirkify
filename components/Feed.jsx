"use client";

import { useState, useEffect } from "react";
import ThoughtCard from "./Card";
import { useDebounce } from "use-debounce";
import FilterCard from "./FilterCard";


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





// Card component to display user profile and thought


// Main component to render multiple cards
const FilterCardList = ({ userProfiles }) => {
  return (
    <div className="mt-16 feed_layout ">
      {userProfiles.map((userProfile, index) => (
        <FilterCard key={index} userProfile={userProfile} />
      ))}
    </div>
  );
};



const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
const [filterPorfile, setFilterProfile] = useState([]);

 const query = useDebounce(searchText, 2000)

useEffect(() => {
  const fetchQuery = async () => {
    try {
      const query = searchText;
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    setFilterProfile(data)
    } catch (error) {
      console.error(`Fetch problem: ${error.message}`);
    }
  };

  if (searchText !== "") {
    fetchQuery();
  }
}, [searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/thought");
      const data = await response.json();
      setPosts(data.reverse());// change this reverse to sort according to time *************************
    };

    fetchPosts();
  } ,1000, []);

  

  return (
    <section className="feed max-w-[768px] ">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Find through tag and username"
          value={searchText}
          onChange={e=>setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
{
 searchText !== ""? <FilterCardList userProfiles={filterPorfile} /> : <ThoughtCardList data={posts} handleTagClick={() => {}} />
}
      
    </section>
  );
};

export default Feed;



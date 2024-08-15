// "use client";

// import { useState, useEffect } from "react";
// import FilterCardList from "./FilterCardList";
// import ThoughtCardList from "./ThoughtCardList";
// import { Input } from "./ui/input";


// export const getServerSideProps = async() => {
//   // Fetch data from external API
//   const res = await fetch("/api/thought", { cache: "no-store" });
//   const repo = await res.json()
//   // Pass data to the page via props
//   return  repo ;
// }

// const  Feed = () => {
//   const [searchText, setSearchText] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [filterProfile, setFilterProfile] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchPosts();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (searchText !== "") {
//       fetchQuery();
//     }
//   }, [searchText]);

//   const fetchQuery = async () => {
//     try {
//       let queryParams = "";
//       if (searchText.startsWith("#")) {
//         queryParams = `?tag=${searchText.slice(1)}`;
//         console.log(queryParams);
//       } else if (searchText.startsWith("@")) {
//         queryParams = `?quirkId=${searchText.slice(1)}`;
//         console.log(queryParams);
//       } else {
//         queryParams = `?query=${searchText}`;
//         console.log(queryParams);
//       }
//       const response = await fetch(`/api/search${queryParams}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data);
//       setFilterProfile(data);
//     } catch (error) {
//       console.error(`Fetch problem: ${error.message}`);
//     }
//   };
  
//   const fetchPosts = async () => {
//     const data = await getServerSideProps();
//     // console.log(data);
//     setPosts(data);
//   };

//   return (
//     <section className="feed mx-auto max-w-[768px]  ">
//       <form className="relative w-full flex-center">
//         <Input
//           type="text"
//           placeholder="Find through tag and username"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           required
//         />
//       </form>

//       {searchText !== "" ? (
//         <FilterCardList
//           userProfiles={filterProfile}
//           fetchQuery={fetchQuery}
//           setSearchText={setSearchText}
//         />
//       ) : (
        
//         <ThoughtCardList
//           data={posts}
//           fetchPosts={fetchPosts}
//           setSearchText={setSearchText}
//         />
//       )}
//     </section>
//   );
// };

// export default Feed;


"use client";

import { useState, useEffect } from "react";
import FilterCardList from "./FilterCardList";
import ThoughtCardList from "./ThoughtCardList";
import { Input } from "./ui/input";
import Loading from "./Loader";
import Loader from "./Loader";

export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch("/api/thought", { cache: "no-store" });
  const repo = await res.json();
  // Pass data to the page via props
  return repo;
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filterProfile, setFilterProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getServerSideProps();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchText) {
      fetchQuery();
    } else {
      setFilterProfile([]); // Clear filter when search text is empty
    }
  }, [searchText]);

  const fetchQuery = async () => {
    try {
      let queryParams = "";
      if (searchText.startsWith("#")) {
        queryParams = `?tag=${searchText.slice(1)}`;
      } else if (searchText.startsWith("@")) {
        queryParams = `?quirkId=${searchText.slice(1)}`;
      } else {
        queryParams = `?query=${searchText}`;
      }

      const response = await fetch(`/api/search${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setFilterProfile(data);
    } catch (error) {
      console.error(`Fetch problem: ${error.message}`);
    }
  };

  return (
    <section className="feed mx-auto max-w-[768px]">
      <form className="relative w-full flex-center">
        <Input
          type="text"
          placeholder="Find through tag and username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
        />
      </form>

      {searchText ? (
        <FilterCardList
          userProfiles={filterProfile}
          fetchQuery={fetchQuery}
          setSearchText={setSearchText}
        />
      ) : loading ? (
        <Loader />
      ) : (
        <ThoughtCardList
          data={posts}
          fetchPosts={() => setPosts(posts)} // Optional: you can define a fetch function if needed
          setSearchText={setSearchText}
        />
      )}
    </section>
  );
};

export default Feed;
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full  flex-center flex-col">
      <h1 className="head_text text-center">Share your thoughts
      <br className="max-md:hidden" /> 
      {/* remove class of br to make them in colum */}
      <span className="orange_gradient text-center">
        Spitting thoughts
      </span>
      </h1>
      <p className="desc text-center">
        Website is a open source. you share your Quirky thoughts there.
      </p>

      <Feed/>
    </section>
  );
};

export default Home;

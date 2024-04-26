import Link from "next/link";

const Form = ({ type, post, setPost, handlesubmit, submitting }) => {
  return (
    <section className=" max-w-[768px] flex-start flex-col ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share ypu thoughts with world
      </p>

      <form
        onSubmit={handlesubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            You amazing thought
          </span>
          <textarea
            value={post.thought}
            onChange={(e) => setPost({ ...post, thought: e.target.value })}
            placeholder="Write you thoughts here"
            required
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tags"
            required
            className="form_input"
          ></textarea>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/explore">
            Cancel
          </Link>

          <button type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white "
          >
            {submitting?`${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

// import Link from "next/link";

// const Form = ({ type, post, setPost, handlesubmit, submitting }) => {
//   return (
//     <section className=" max-w-[768px] flex-start flex-col ">
//       <h1 className="head_text text-left">
//         <span className="blue_gradient">{type} Post</span>
//       </h1>
//       <p className="desc text-left max-w-md">
//         {type} and share ypu thoughts with world
//       </p>

//       <form
//         onSubmit={handlesubmit}
//         className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
//       >
//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             You amazing thought
//           </span>
//           <textarea
//             value={post.thought}
//             onChange={(e) => setPost({ ...post, thought: e.target.value })}
//             placeholder="Write you thoughts here"
//             required
//             className="form_textarea"
//           ></textarea>
//         </label>

//         <label>
//           <span className="font-satoshi font-semibold text-base text-gray-700">
//             Tags
//           </span>
//           <textarea
//             value={post.tag}
//             onChange={(e) => setPost({ ...post, tag: e.target.value })}
//             placeholder="#tags"
//             required
//             className="form_input"
//           ></textarea>
//         </label>

//         <div className="flex-end mx-3 mb-5 gap-4">
//           <Link href="/explore">
//             Cancel
//           </Link>

//           <button type="submit"
//           disabled={submitting}
//           className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white "
//           >
//             {submitting?`${type}...`:type}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Form;

import Link from "next/link";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoReload } from "react-icons/io5";

const Form = ({ type, post, setPost, handleSubmit, submitting }) => {
  return (
    <section className=" flex-start flex-col max-w-[620px] mx-auto border-[2px] border-white rounded-lg px-6 py-10 ">
      <h1 className="head_text text-left">
        <span className=" text-3xl font-semibold my-3 ">Create a Post</span>
      </h1>
      <p className="desc text-left mt-2 ">Share your thoughts with the world</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message-2" className="mb-2" >Write Your Thougt</Label>
          <Textarea
            placeholder="Type your message here"
            id="message-2"
            value={post.thought}
            onChange={(e) => setPost({ ...post, thought: e.target.value })}
            required
          />
        </div>

        <div className=" w-full items-center gap-1.5">
          <Label htmlFor="text" className="mb-2">Tags</Label>
          <Input
            type="text"
            name="tags"
            id="tags"
            autoComplete="tags"
            placeholder=" #Quirky"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/explore">
            <Button variant="destructive" className=" rounded-full">
              Cancel
            </Button>
          </Link>
          {submitting ? (
            <Button disabled className="rounded-full ">
              <IoReload className="mr-2 h-4 w-4 animate-spin " />
              {type}...
            </Button>
          ) : (
            <Button variant="outline" type="submit" className="rounded-full ">
              {type}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Form;

"use client";

import Link from "next/link";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoReload } from "react-icons/io5";
import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

const Form = ({
  type,
  post,
  setPost,
  handleSubmit,
  submitting,
  handleImageControl,
  removeImage,
  uploadedImages,
}) => {
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
          <Label htmlFor="message-2" className="mb-2">
            Write Your Thougt
          </Label>
          <Textarea
            placeholder="Type your message here"
            id="message-2"
            value={post.thought}
            onChange={(e) => setPost({ ...post, thought: e.target.value })}
            required
          />
        </div>

        <div className=" w-full items-center gap-1.5">
          <Label htmlFor="text" className="mb-2">
            Tags
          </Label>
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
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{sources: ['local', 'url', 'unsplash']}}
          onUpload={handleImageControl} // Use onUpload instead of onClick
        >
          Upload..
        </CldUploadButton>

        {uploadedImages.map((image, index) => (
  <div key={index}>
    <div className="mt-4 relative w-[25rem] h-[25rem] overflow-hidden">
      {image?.url && (
        <Image
          src={image?.url}
          fill
          className="absolute object-cover w-[30rem] h-[30rem]"
          alt={""}
        />
      )}
    </div>
    <div>
      {image?.public_id && (
        <button
          onClick={() => removeImage(image?.public_id)}
          className="py-2 px-4 rounded-full text-black bg-white"
          type="button"
        >
          Remove
        </button>
      )}
    </div>
  </div>
))}
        {/* <div className="mt-4 relative w-[25rem] h-[25rem] overflow-hidden  ">
            {uploadedImages?.url && (
              <Image
                src={uploadedImages?.url}
                fill
                className="absolute object-cover w-[30rem] h-[30rem] "
                alt={""}
              />
            )}
          </div>
          <div>
            {uploadedImages?.public_id && (
              <button
                onClick={removeImage(uploadedImages?.public_id)}
                className="py-2 px-4 rounded-full text-black bg-white "
              >
                Remove
              </button>
            )}
          </div> */}
      </form>
    </section>
  );
};

export default Form;

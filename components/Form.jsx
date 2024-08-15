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
import SwiperImage from "./SwiperImage";

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
            Write Your Thoughts
          </Label>
          <Textarea
            placeholder="Type your thoughts here"
            id="message-2"
            value={post.thought}
            onChange={(e) => setPost({ ...post, thought: e.target.value })}
            // required
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
            // required
          />
        </div>
        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{ sources: ["local", "url", "unsplash"] }}
              onUpload={handleImageControl} // Use onUpload instead of onClick
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </CldUploadButton>
          </div>

          <div className="flex gap-3">
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
              <Button variant="outline" type="submit" className="rounded-full px-6 text-md ">
                {type} 
              </Button>
            )}
          </div>
        </div>
        <div className="  flex gap-3 overflow-hidden justify-center ">
          {/* <SwiperImage postImage={uploadedImages} removeImage={removeImage} /> */}
          {uploadedImages.length > 0 && (
  <SwiperImage postImage={uploadedImages} removeImage={removeImage} />
)}
        </div>
      </form>
    </section>
  );
};

export default Form;

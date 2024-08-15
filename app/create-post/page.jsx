"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, session, router]);

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tag = post.tag.startsWith("#") ? post.tag.slice(1) : post.tag;
      const response = await fetch("api/thought/new", {
        method: "POST",
        body: JSON.stringify({
          thought: post.thought,
          userId: session?.user.id,
          tag: tag,
          images:uploadedImages,
        }),
      });
      if (response.ok) {
        router.push("/explore");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const [uploadedImages, setUploadedImages] = useState([]); // Initialize as an empty array

  const handleImageControl = (result) => {
    // Log the result of the upload
    console.log("Upload Result: ", result);

    if (result && result.event === "success") {
      const newImage = {
        public_id: result.info.public_id,
        url: result.info.secure_url,
      };

      setUploadedImages((prevImages) => [...prevImages, newImage]); // Add new image object to the state
    }

    console.log("Uploaded Images: ", uploadedImages);
  };

  const removeImage = async (publicId) => {
    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        // Remove the image from the uploadedImages state
        setUploadedImages((prevImages) => prevImages.filter(image => image.public_id !== publicId));
        console.log("remove successfully");
      }

    } catch (error) {
      console.error("Error removing image:", error);
    }
  };


  return (
    <>
      <Form
        type="Post"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
        removeImage={removeImage}
        handleImageControl={handleImageControl}
        uploadedImages={uploadedImages}
      />
    </>
  );
};

export default CreatePost;

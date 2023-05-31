"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Form from "@components/Form";

const CreateShortLink = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ url: "", alias: "" });
  const { data: session } = useSession();
  const router = useRouter();

  const createShortLink = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links`,
        {
          url: post.url,
          alias: post.alias,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = response.data;
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createShortLink}
      />
    </div>
  );
};

export default CreateShortLink;

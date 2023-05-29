"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

import Form from "@components/Form";

const CreateShortLink = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ url: "", alias: "" });
  const { data: session } = useSession();

  const createShortLink = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = axios.post(
        `${process.env.BACKEND_URL}/short-links`,
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

      data = response.data;
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

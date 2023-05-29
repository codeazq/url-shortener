"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Form from "@components/Form";

const CreateShortLink = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ url: "", alias: "" });

  const createShortLink = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:4000/short-links", {
        method: "POST",
        body: JSON.stringify({
          url: post.url,
          alias: post.alias,
        }),
        headers: { Authentication: "Bearer {token}" },
      });

      if (response.ok) Router.push("/");
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

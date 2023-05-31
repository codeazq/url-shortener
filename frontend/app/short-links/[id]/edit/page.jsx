"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Form from "@components/Form";

const EditShortLink = ({ params }) => {
  const [submitting, setSubmitting] = useState(false);
  const [shortLink, setShortLink] = useState({ url: "", alias: "" });
  const { data: session } = useSession();
  const router = useRouter();
  const shortLinkId = params.id;

  useEffect(() => {
    const getShortLink = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links/${shortLinkId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        setShortLink({ url: data.url, alias: data.alias });
      } catch (error) {
        console.log(error);
      }
    };

    if (session) getShortLink();
  }, [session]);

  const updateShortLink = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links/${shortLinkId}`,
        {
          url: shortLink.url,
          alias: shortLink.alias,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = response.data;
      router.push("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Edit"
        post={shortLink}
        setPost={setShortLink}
        submitting={submitting}
        handleSubmit={updateShortLink}
      />
    </div>
  );
};

export default EditShortLink;

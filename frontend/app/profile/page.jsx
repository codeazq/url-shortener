"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import ShortLinkCard from "@components/ShortLinkCard";

const MyProfile = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [shortLinks, setShortLinks] = useState([]);

  useEffect(() => {
    const getShortLinks = async () => {
      const { data: shortLinks } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setShortLinks(shortLinks);
    };

    if (session?.accessToken) getShortLinks();
  }, [session]);

  const handleDelete = async (shortLink) => {
    const hasConfirmedDelete = confirm(
      "Are you sure you want to delete this Short Link"
    );
    if (hasConfirmedDelete) {
      try {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links/${shortLink.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (
          response.status == 200 ||
          response.status == 204 ||
          response.status == 202
        ) {
          const filteredShortLinks = shortLinks.filter(
            (l) => l.id !== shortLink.id
          );
          setShortLinks(filteredShortLinks);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    session?.user && (
      <section className="w-full">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{session.user.username} Profile</span>
        </h1>
        <p className="desc text-left">welcome your profile page</p>

        <div className="mt-10 short_link_layout">
          {shortLinks.map((shortLink) => (
            <ShortLinkCard
              key={shortLink.id}
              shortLink={shortLink}
              handleDelete={() => handleDelete && handleDelete(shortLink)}
            />
          ))}
        </div>
      </section>
    )
  );
};

export default MyProfile;

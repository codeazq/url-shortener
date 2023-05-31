"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ShortLinkCard from "./ShortLinkCard";
import axios from "axios";

const ShortLinkCardList = ({ data, handleClick }) => {
  console.log("data in lost");
  console.log(data);
  return (
    <div className="mt-16 short_link_layout">
      {data.map((shortLink) => (
        <ShortLinkCard
          key={shortLink.id}
          shortLink={shortLink}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [shortLinks, setShortLinks] = useState([]);
  const { data: session } = useSession();

  const handleSearchChange = (e) => {};

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

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search short links"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <ShortLinkCardList data={shortLinks} handleClick={() => {}} />
    </section>
  );
};

export default Feed;

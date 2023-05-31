"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const ShortLinkCard = ({ shortLink, handleClick, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(shortLink.alias);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL_FOR_REDIRECT}/${shortLink.alias}`
    );
    setTimeout(() => {
      setCopied("");
    }, 3500);
  };

  return (
    <div className="short_link_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src="https://lh3.googleusercontent.com/a/AAcHTtdwXqdgYUBPdS6d__vWNSEPh1HOPknSFz9HVE5C=s96-c"
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              UserName
            </h3>
            <p className="font-inter text-sm text-gray-500">Email</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === shortLink.alias
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gr">{shortLink.alias}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">
        {shortLink.url}
      </p>

      {/* TODO: if you are removing feed from the home page 
      there is no need to check if this is the profile page */}
      {/* TODO: allows add a private bool to shortLinks table to
      allow public see the shortlink belonging to sertain users */}
      {session?.user.id === shortLink.userId && pathName === "/profile" && (
        <div className="flex mt-6 justify-around border-t-2 border-gray-100 pt-3">
          <Link
            className="font-inter text-sm green_gradient cursor-pointer"
            href={`short-links/${shortLink.id}/edit`}
          >
            Edit
          </Link>

          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ShortLinkCard;

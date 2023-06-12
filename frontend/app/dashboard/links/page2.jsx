"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createElement, useState, useEffect } from "react";
import cx from "classnames";
import CloseIcon from "@public/assets/icons/close.svg";
import Form from "@components/Form";
import {
  FaPlus,
  FaThumbsDown,
  FaGg,
  FaEnvelopeOpenText,
  FaFilter,
  FaPencilAlt,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaLink,
} from "react-icons/fa";

const Links = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: session } = useSession();
  const [shortLinks, setShortLinks] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ url: "", alias: "" });
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
      setShowCreateModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

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
  const filterItems = [
    {
      _uid: "BUY6Drn9e1",
      component: FaGg,
      title: "Published",
    },
    {
      _uid: "gJZoSLkfZ23V",
      component: FaEnvelopeOpenText,
      title: "Draft",
    },
    {
      _uid: "BUY6Drn9e145",
      component: FaGg,
      title: "Hidden",
    },
    {
      _uid: "gJZoSLkfZV16",
      component: FaThumbsDown,
      title: "Rejected",
    },
    {
      _uid: "gJZoSLkfZV23",
      component: FaLink,
      title: "Under Review",
    },
  ];

  const tableData = [
    {
      name: "Organic Landing Page",
      category: "Web Design",
      imageUrl: "/assets/images/atirira_in_laptop.png",
      price: 28,
      downloaded: 100,
      rating: 4.9,
      platformIcons: [FaEnvelopeOpenText, FaThumbsDown],
      createdAt: "12/02/22",
    },

    {
      name: "Traffic Landing Page",
      category: "Web Design",
      imageUrl: "/assets/images/hostel_booking_in_laptop.png",
      price: 28,
      downloaded: 20,
      rating: 4.9,
      platformIcons: [FaEnvelopeOpenText, FaThumbsDown],
      createdAt: "12/02/23",
    },

    {
      name: "Organic Landing Page",
      category: "Web Design",
      imageUrl: "/assets/images/atirira_in_laptop.png",
      price: 28,
      downloaded: 100,
      rating: 4.9,
      platformIcons: [FaEnvelopeOpenText, FaThumbsDown],
      createdAt: "12/02/22",
    },

    {
      name: "Figma Landing Page",
      category: "Web Development",
      imageUrl: "/assets/images/hostel_booking_in_laptop.png",
      price: 28,
      downloaded: 100,
      rating: 4.9,
      platformIcons: [FaEnvelopeOpenText, FaThumbsDown],
      createdAt: "12/02/22",
    },
  ];

  return (
    <>
      {/* Modal toggle */}
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          console.log("button was clicked");
          setShowCreateModal(!showCreateModal);
        }}
      >
        Toggle modal
      </button>

      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <div className="flex items-center gap-x-4">
                <input type="checkbox" />
                <span>Product Name</span>
              </div>
            </td>
            <td className="py-4 px-4 text-center">Pricing</td>
            <td className="py-4 px-4 text-center">Clicks</td>
            <td className="py-4 px-4 text-center">Rating</td>
            <td className="py-4 px-4 text-center">Platforms</td>
            <td className="py-4 pr-10 pl-4 text-center">
              <FaFilter className="w-6 h-6 fill-current" />
            </td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            // {shortLinks.map((shortLink) => {
            return (
              <tr className="hover:bg-gray-100 transition-colors group">
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <input type="checkbox" name="" id="" />
                  <Image
                    src="/assets/images/atirira_in_laptop.png"
                    alt={item.name}
                    width={160}
                    height={160}
                    className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
                    // className="object-contain"
                  />
                  <div>
                    <Link
                      className="text-lg font-semibold text-gray-700"
                      href={""}
                    >
                      {item.name}
                      {/* full short link */}
                    </Link>
                    <div className="font-medium text-gray-400">
                      {item.category}
                      {/* full url */}
                    </div>
                  </div>
                </td>
                <td className="font-medium text-center">{item.price}</td>
                <td className="font-medium text-center">{item.downloaded}</td>
                <td className="text-center">
                  <span className="font-medium">{item.rating}</span>
                  <span className="text-gray-400">/5</span>
                </td>
                <td>
                  <div className="flex gap-x-2 justify-center items-center">
                    {item.platformIcons.map((icon) => {
                      return (
                        <Link
                          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                          href={""}
                        >
                          {createElement(icon, {
                            className: "w-6 h-6 fill-current",
                          })}
                        </Link>
                      );
                    })}
                  </div>
                </td>
                <td>
                  <span className="inline-block w-20 group-hover:hidden">
                    {item.createdAt}
                  </span>
                  <div className="hidden group-hover:flex group-hover:items-center group-hover:w-20 group-hover:text-gray-500 group-hover:gap-x-2">
                    <button className="p-2 hover:rounded-md hover:bg-gray-200 group-hover:gap-x-2">
                      <FaPencilAlt className="w-6 h-6 fill-current" />
                    </button>
                    <button className="p-2 hover:rounded-md hover:bg-gray-200">
                      <FaTrash className="w-6 h-6 fill-current" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Main modal */}
      <div
        id="create-link-modal"
        tabindex="-1"
        aria-hidden={!showCreateModal}
        aria-modal={showCreateModal}
        className={cx(
          "fixed",
          "top-0",
          "left-0",
          "right-0",
          "z-50",
          "w-full",
          "p-4",
          "overflow-x-hidden",
          "overflow-y-auto",
          "md:inset-0",
          "h-[calc(100%-1rem)]",
          "max-h-full",
          {
            "hidden ": showCreateModal === false,
            "flex justify-center items-center": showCreateModal === true,
          }
        )}
        onClickCapture={(event) => {
          console.log("event.target.id");
          console.log(event.target.id);
          if (event.target.id == "create-link-modal") setShowCreateModal(false);
        }}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={() => {
                setShowCreateModal(false);
              }}
            >
              <Image src={CloseIcon} alt="Short Up logo" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Create and share short links with the world
              </h3>

              <form className="space-y-6" action="#">
                <div>
                  <label
                    for="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your URL
                  </label>
                  <input
                    type="text"
                    id="url"
                    placeholder="Enter the URL here"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={post.alias}
                    onChange={(e) =>
                      setPost({ ...post, alias: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    for="alias"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Short Link
                  </label>
                  <input
                    type="text"
                    id="alias"
                    placeholder="Enter the short link or alias here"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={post.alias}
                    onChange={(e) =>
                      setPost({ ...post, alias: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={createShortLink}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {submitting ? "Creating..." : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={cx(
          "fixed",
          "inset-0",
          "bg-gray-600",
          "bg-opacity-50",
          "overflow-y-auto",
          "h-full",
          "w-full",
          {
            "hidden ": showCreateModal === false,
          }
        )}
        id="modal-backdrop"
      />
    </>
  );
};

export default Links;

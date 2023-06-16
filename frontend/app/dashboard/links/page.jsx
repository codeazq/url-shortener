"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { createElement, useState, useEffect } from "react";
import cx from "classnames";
import CloseIcon from "@public/assets/icons/close.svg";
import {
  FaPlus,
  FaGg,
  FaEnvelopeOpenText,
  FaPencilAlt,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaLink,
  FaCheck,
  FaRegTimesCircle,
} from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Links = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: session } = useSession();
  const [shortLinks, setShortLinks] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [shortLinkData, setShortLinkData] = useState({
    id: 0,
    url: "",
    alias: "",
    published: true,
  });
  const [copied, setCopied] = useState("");

  const [shortLinkAction, setShortLinkAction] = useState("create");

  console.log("inside links page");
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
      console.log(shortLinks);
      setShortLinks(shortLinks);
    };

    if (session?.accessToken) getShortLinks();
  }, [session]);

  const createShortLink = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links`,
        {
          url: shortLinkData.url,
          alias: shortLinkData.alias,
          published: shortLinkData.published,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        const data = response.data;
        const newLinks = [data, ...shortLinks];
        setShortLinks(newLinks);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateShortLink = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/short-links/${shortLinkData.id}`,
        {
          url: shortLinkData.url,
          alias: shortLinkData.alias,
          published: shortLinkData.published,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = response.data;
      if (
        response.status == 200 ||
        response.status == 204 ||
        response.status == 202
      ) {
        const newShortLinks = shortLinks;
        for (let i = 0; i < newShortLinks.length; i++) {
          if (newShortLinks[i].id === shortLinkData.id) {
            newShortLinks[i].url = shortLinkData.url;
            newShortLinks[i].alias = shortLinkData.alias;
            newShortLinks[i].published = shortLinkData.published;
          }
        }
        setShortLinks(newShortLinks);
        setShowCreateModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
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

  const handleCopy = (shortLink) => {
    setCopied(shortLink.alias);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL_FOR_REDIRECT}/${shortLink.alias}`
    );
    setTimeout(() => {
      setCopied("");
    }, 3500);
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
  ];

  return (
    <>
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Links
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Create and Share shortlinks
          </p>
        </div>

        {/* Modal toggle */}
        <button
          className="py-2.5 px-6 text-white bg-indigo-600 rounded-xl inline-flex gap-x-2 items-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          onClick={() => {
            setShortLinkAction("Create");
            setShowCreateModal(!showCreateModal);
          }}
        >
          <FaPlus className="w-6 h-6 fill-current" />
          <span className="text-sm font-semibold tracking-wide">
            Create Link
          </span>
        </button>
      </div>

      <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
        {filterItems.map((item, index) => {
          return (
            <li>
              <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
                {createElement(item.component, {
                  className: "w-6 h-6 fill-current",
                })}
                <span className="font-medium">{item.title}</span>
                <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out" />
              </button>
            </li>
          );
        })}
      </ul>

      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="pl-10">
              <div className="flex items-center gap-x-4">
                <span>Short Links</span>
              </div>
            </td>

            <td className="py-4 px-4 text-center">Clicks</td>
            <td className="py-4 px-4 text-center">Status</td>
            <td className="py-4 px-4 text-center">Date Created</td>
            <td className="py-4 pr-10 pl-4 text-center">Actions</td>
          </tr>
        </thead>
        <tbody>
          {shortLinks.map((shortLink) => {
            return (
              <tr className="hover:bg-gray-100 transition-colors group">
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <Image
                    src="/assets/images/atirira_in_laptop.png"
                    alt={`${shortLink.url} screenshot`}
                    width={160}
                    height={160}
                    className="w-40 aspect-[3/2] rounded-lg object-cover object-top border border-gray-200"
                    // className="object-contain"
                  />
                  <div>
                    <div className="flex justify-between items-start gap-5">
                      <Link
                        className="text-lg font-semibold text-gray-700"
                        href={""}
                      >
                        {`${process.env.NEXT_PUBLIC_BACKEND_URL}/${shortLink.alias}`}
                      </Link>
                      <div
                        className="copy_btn"
                        onClick={() => handleCopy(shortLink)}
                      >
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

                    <div className="font-medium text-gray-400">
                      {shortLink.url}
                    </div>
                  </div>
                </td>
                <td className="font-medium text-center">{shortLink.count}</td>
                <td className="text-center">
                  <div className="flex items-center justify-center">
                    {shortLink.published ? (
                      <FaCheck className="fill-green-600 w-5 h-5" />
                    ) : (
                      <FaRegTimesCircle className="fill-red-600 w-5 h-5" />
                    )}
                  </div>
                </td>
                <td class="text-center">
                  <span className="inline-block w-20">
                    {dayjs(shortLink.createdAt).fromNow()}
                  </span>
                </td>
                <td>
                  <div className="flex items-center w-20 text-gray-500 gap-x-2">
                    <button
                      className="p-2 hover:rounded-md hover:bg-gray-200 gap-x-2"
                      onClick={() => {
                        setShortLinkData({
                          id: shortLink.id,
                          url: shortLink.url,
                          alias: shortLink.alias,
                          published: shortLink.published,
                        });
                        setShortLinkAction("Edit");
                        setShowCreateModal(true);
                      }}
                    >
                      <FaPencilAlt className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      className="p-2 hover:rounded-md hover:bg-gray-200"
                      onClick={() => {
                        handleDelete(shortLink);
                      }}
                    >
                      <FaTrash className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex gap-x-2 justify-center pt-8">
        <button className="flex justify-center items-center w-8 h-8">
          <FaArrowLeft className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600" />
        </button>
        {[1, 2, 3, 4, 5].map((number) => {
          return (
            <button
              className={cx(
                "flex",
                "items-center",
                "justify-center",
                "w-8",
                "h-8",
                "font-medium",
                "rounded-full",
                {
                  "text-gray-400 hover:text-indigo-600": number != 1,
                  "bg-gray-800 text-white": number === 1,
                }
              )}
            >
              {number}
            </button>
          );
        })}

        <button className="flex justify-center items-center w-8 h-8">
          <FaArrowRight className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600" />
        </button>
      </div>

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
                {`${shortLinkAction} Short Link`}
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
                    value={shortLinkData.url}
                    onChange={(e) =>
                      setShortLinkData({
                        ...shortLinkData,
                        url: e.target.value,
                      })
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
                    value={shortLinkData.alias}
                    onChange={(e) =>
                      setShortLinkData({
                        ...shortLinkData,
                        alias: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <label class="relative inline-flex items-center mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        checked={shortLinkData.published}
                      />
                      <div
                        class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                        onClick={() =>
                          setShortLinkData({
                            ...shortLinkData,
                            published: !shortLinkData.published,
                          })
                        }
                      ></div>
                      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Published
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  onClick={(e) => {
                    if (shortLinkAction == "Create") {
                      createShortLink(e);
                    } else {
                      console.log("inside the update on click");
                      updateShortLink(e);
                    }
                  }}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {submitting ? `${shortLinkAction}...` : `${shortLinkAction}`}
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

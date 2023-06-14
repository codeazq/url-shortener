"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLink, FaBuromobelexperte } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <div className="flex w-full min-h-screen font-sans text-gray-900 bg-gray-50">
      <aside className="py-6 px-10 w-56 border-r border-gray-200">
        {/* <Link href="/dashboard" className="flex gap-2 flex-center"> */}
        <Link href="/dashboard">
          <Image
            src="/assets/images/logo.svg"
            alt="Short Up logo"
            width={50}
            height={50}
          />
        </Link>

        <ul className="flex flex-col gap-y-6 pt-20">
          <li>
            <Link
              href="/dashboard/links"
              className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group"
            >
              <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
              <FaLink className="w-6 h-6 fill-current" />
              <span>Links</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group"
            >
              <span className="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
              <FaBuromobelexperte className="w-6 h-6 fill-current" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 py-6">
        <div className="flex flex-row-reverse px-10">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              <div>not signed in</div>
            </>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}

"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <section
      className="background-light900_dark200 light-border
    sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto
    border-r p-6 pt-36 shadow-light-300 dark:shadow-none
    max-sm:hidden lg:w-[266px] custom-scrollbar"
    >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            }
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 p-4 rounded-lg
              hover:bg-transparent/5`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button
              className="small-medium btn-secondary
                  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Image
                src="assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-color lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button
              className="small-medium light-border-2 btn-tertiary
                  min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none
                  text-dark-400_light900"
            >
              <Image
                src="assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Sign Up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;

"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export default function ShoppingList() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Single Image Component - Animates from preview to modal */}
      <div
        className={clsx(
          "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-all ease-out",
          isOpen
            ? "-translate-y-10"
            : "translate-y-[82%] hover:translate-y-[70%]"
        )}
        onClick={isOpen ? undefined : handleOpen}
      >
        <div className="relative">
          <Image
            src="/shopping-list.png"
            alt="Shopping List"
            width={250}
            height={250}
            className="shadow-lg rounded-xl"
          />

          {/* Close */}
          <button
            onClick={handleClose}
            className={clsx(
              "absolute cursor-pointer -top-2 -right-2 z-10 p-2 bg-white rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all",
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

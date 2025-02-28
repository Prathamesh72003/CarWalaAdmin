"use client";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 py-3 md:py-4 bg-gray-200/30 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-black">
          Dr. CarWala
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={() => console.log("Clicked")}
          className="rounded-full h-8 px-3 w-32 bg-[#71C9CE] text-black text-base hover:bg-[#71C9CE] cursor-pointer"
        >
          <span className="inline">Log out</span>
        </Button>

        <div
          className="hidden sm:block h-6 w-px bg-border"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

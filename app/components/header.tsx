"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef<number>(window!.scrollY);

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY < lastScrollY.current) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      lastScrollY.current = window.scrollY;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <header
      className={`p-2 flex justify-center fixed top-2 left-1/2 -translate-x-1/2 rounded-full bg-white/30 backdrop-blur-lg z-[999] transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-[calc(100%_+_2rem)]"
      }`}
    >
      <nav>
        <ul className="flex gap-2">
          <button className="btn btn-primary">Home</button>
          <button className="btn btn-primary">About</button>
          <button className="btn btn-primary">Projects</button>
          <button className="btn btn-primary">Contact</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

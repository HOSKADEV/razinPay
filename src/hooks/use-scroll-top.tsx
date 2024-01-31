"use client";
import { useState, useEffect } from "react";

/**
 * Custom React Hook to track scroll position.
 *
 * @param {number} [threshold=10] - The scroll threshold to determine if the user has scrolled down.
 * @returns {boolean} - A boolean indicating whether the user has scrolled down beyond the threshold.
 */
export const useScrollTop = (threshold: number = 10): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove the 'handleScroll' function from the 'scroll' event when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};

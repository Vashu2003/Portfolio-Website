"use client";

import { motion, useAnimate, stagger } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowDownTrayIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { SocialIcons } from "./SocialIcons";

const titles = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
];

export function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isTyping, setIsTyping] = useState(false);

  const typeWriter = useCallback(
    async (text: string) => {
      if (!scope.current) return;

      setIsTyping(true);
      scope.current.innerHTML = ""; // Clear previous content

      // Create cursor element
      const cursor = document.createElement("span");
      cursor.className = "inline-block ml-1 h-8 w-[2px] bg-current cursor";
      scope.current.appendChild(cursor);

      // Type out the text character by character
      for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement("span");
        charSpan.className = "char opacity-0";
        charSpan.textContent = text[i];
        
        // Insert before cursor
        scope.current.insertBefore(charSpan, cursor);
        
        // Animate the character
        await animate(
          charSpan,
          { opacity: 1, x: [10, 0] },
          { duration: 0.1, ease: "easeOut" }
        );
      }

      // Blink cursor animation
      await animate(
        cursor,
        { opacity: [1, 0] },
        { duration: 0.5, repeat: 3, ease: "easeInOut" }
      );

      // Remove cursor after animation
      cursor.remove();

      setIsTyping(false);
    },
    [animate, scope]
  );

  const eraseText = useCallback(async () => {
    if (!scope.current) return;
    
    const chars = scope.current.querySelectorAll(".char");
    if (chars.length === 0) return;

    await animate(
      chars,
      { opacity: 0, x: -10 },
      { delay: stagger(0.03), duration: 0.1 }
    );

    // Remove all characters
    chars.forEach(char => char.remove());

    // Remove cursor if it exists
    const cursor = scope.current.querySelector(".cursor");
    if (cursor) cursor.remove();

    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay before next title
  }, [animate, scope]);

  const cycleTitles = useCallback(async () => {
    if (isTyping) return;

    await eraseText();
    setCurrentTitleIndex((prev) => (prev + 1) % titles.length); 
  }, [eraseText, isTyping]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isTyping && scope.current) {
      const currentTitle = titles[currentTitleIndex];
      typeWriter(currentTitle);
      timeout = setTimeout(cycleTitles, 3000);
    }

    return () => clearTimeout(timeout);
  }, [currentTitleIndex, isTyping, typeWriter, cycleTitles]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-center lg:order-2"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 order-1 md:order-2">
            <motion.div variants={item}>
              <p className="mt-4 text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100">
                Hi, I'm{" "}
                <span className="text-blue-600 dark:text-blue-400 pb-4">
                  Vashu Singh
                </span>
              </p>
              <motion.div className="relative text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight min-h-[4rem] flex items-center">
                <span
                  className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                  ref={scope}
                />
              </motion.div>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
              variants={item}
            >
              Aspiring full stack developer with a passion for building
              scalable, efficient, and beautiful web applications. Currently
              learning and experimenting with new technologies.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={item}>
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Work
                <ArrowDownTrayIcon className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <EnvelopeIcon className="h-5 w-5" />
                Contact Me
              </Link>

              <SocialIcons />
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div className="pt-8 flex gap-3 flex-wrap" variants={item}>
              {["React", "TypeScript", "Next.js", "Tailwind CSS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            className="relative order-2 md:order-1 mx-auto"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 h-96 w-80">
              <Image
                src="/assets/profilepic.jpeg"
                alt="Vashu Singh"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

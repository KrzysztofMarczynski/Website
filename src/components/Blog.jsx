"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Database,
  Server,
  MonitorSmartphone,
  Ticket,
  Lock,
  Activity,
  X,
} from "lucide-react";
const blogPosts = [

{
  title: "Flash Sale Ticket Reservation System",
  category: "Full Stack",
  image: "flash_sale/Main page.png",
  github: "https://github.com/KrzysztofMarczynski/intern-flash-sale-task",
  gallery: [
    "flash_sale/ticekt lock.png",
    "flash_sale/buy.png",
    "flash_sale/reservation faild.png",
  ],
  date: "June 2026",
  readTime: "6 min read",
  excerpt:
    "A full-stack reservation system built to handle high-concurrency ticket sales using database transactions, pessimistic locking, real-time updates, and automatic reservation expiration.",
  content: [
    "This project was created as a backend-focused recruitment task simulating a flash sale where many users try to reserve a limited number of tickets simultaneously. The main challenge was ensuring data consistency while preventing overselling under concurrent requests.",
    
    "The backend was built with NestJS, TypeORM and PostgreSQL. Every reservation is processed inside a database transaction using pessimistic row locking, guaranteeing that only one request can modify the available ticket count at a time. This approach eliminates race conditions without relying on in-memory synchronization.",
    
    "Each successful reservation creates a temporary booking that expires after five minutes if payment is not completed. Scheduled background jobs automatically detect expired reservations, restore ticket availability and notify connected clients in real time.",
    
    "The frontend was developed with Next.js, React and TanStack React Query. Users can browse events, reserve tickets and immediately see ticket availability updates thanks to Server-Sent Events (SSE), providing a responsive experience without refreshing the page.",
    
    "Throughout the project I focused on writing clean, modular code, separating business logic from controllers and ensuring that every critical operation remains transactional. The application demonstrates practical knowledge of concurrency handling, database locking strategies and real-time communication in modern web applications."
  ],
  tags: [
    "NestJS",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "TypeORM",
    "React Query",
    "SSE",
    "Docker",
    "Transactions",
    "Pessimistic Locking",
    "Concurrency",
    "REST API",
  ],
},
];

export default function Blog() {
  const [activePost, setActivePost] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activePost]);

  return (
    <section id="Blog" className="relative bg-white px-4 py-10 text-zinc-950 sm:px-5 md:px-10 md:py-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} className="mb-8 border-t border-zinc-200 pt-6 md:mb-10">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="text-center lg:text-left">
              <p className="mb-3 text-sm font-bold uppercase text-zinc-400">Blog</p>
              <h2 className="text-2xl font-black uppercase leading-[0.98] tracking-normal text-zinc-950 sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl">Notes & process</h2>
            </div>
            <div className="hidden max-w-2xl lg:block">
              <p className="mb-3 text-xs font-bold uppercase text-zinc-400">Behind the work</p>
              <p className="text-base leading-relaxed text-zinc-600">This is where I share the projects I'm currently working on, along with detailed breakdowns of their architecture, implementation, challenges, and the decisions made throughout the development process.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <button key={post.title} type="button" onClick={() => setActivePost(post)} className="group flex min-h-[18rem] flex-col rounded-[1.75rem] border border-zinc-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-zinc-950">
              <div className="mb-5 overflow-hidden rounded-2xl border border-zinc-200">
                <img src={post.image} alt={post.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950">
                  <Ticket className="h-5 w-5" />
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950">
                  <Server className="h-5 w-5" />
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950">
                  <Database className="h-5 w-5" />
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950">
                  <Lock className="h-5 w-5" />
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950">
                  <Activity className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-950" />
              </div>
              <p className="mb-3 text-xs font-bold uppercase text-zinc-400">{post.category}</p>
              <h3 className="text-xl font-black leading-tight text-zinc-950 md:text-2xl">{post.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-600">{tag}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {isMounted && createPortal(
        <AnimatePresence>
          {activePost && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6" onMouseDown={() => setActivePost(null)}>
              <motion.article initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }} onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-6xl h-[94dvh] overflow-y-auto rounded-3xl bg-white shadow-xl">
<div className="sticky top-0 z-10 border-b border-zinc-100 bg-white p-6 sm:p-8">
  <div className="flex flex-col gap-5">
    <div className="flex justify-end gap-3">
      <a
        href={activePost.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800"
      >
        GITHUB
        <ArrowUpRight className="h-4 w-4" />
      </a>

      <button
        type="button"
        onClick={() => setActivePost(null)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white transition hover:border-zinc-950 active:scale-95"
      >
        <X className="h-6 w-6" />
      </button>
    </div>

    <div>
      <p className="mb-3 text-xs font-bold uppercase text-zinc-400">
        {activePost.category}
      </p>

      <h3 className="text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
        {activePost.title}
      </h3>
    </div>
  </div>
</div>
                <div className="p-6 sm:p-8 lg:p-12">
                  <div className="mb-10 overflow-hidden rounded-3xl border border-zinc-200">
  <img
    src={activePost.image}
    alt={activePost.title}
    className="w-full h-auto"
  />
</div>
                  <div className="mb-10 flex flex-wrap gap-3 text-xs font-bold uppercase text-zinc-500">
                    <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {activePost.date}</span>
                    <span className="inline-flex items-center gap-2"><Clock3 className="h-4 4" /> {activePost.readTime}</span>
                  </div>
                  <div className="space-y-6 text-base leading-relaxed text-zinc-700 sm:text-lg">
                    {activePost.content.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
  {activePost.gallery.map((img, i) => (
    <div
      key={i}
      className="flex items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
    >
      <img
        src={img}
        alt={`${activePost.title} ${i + 1}`}
        className="max-h-[500px] w-auto max-w-full object-contain"
      />
    </div>
  ))}
</div>
                </div>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
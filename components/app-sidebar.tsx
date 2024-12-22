"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineForm,
} from "react-icons/ai";
import { ModeToggle } from "@/components/mode-toggle";

export function AppSidebar() {
  return (
    <Sidebar>
      <aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Logo Section */}
        <div className="p-4 text-center font-bold text-lg border-b dark:border-gray-700">
          <span className="text-green-600 dark:text-green-400">QuizSphere</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <AiOutlineHome size={20} />
            Home
          </Link>

          <Link
            href="/ai-quiz"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <AiOutlineAppstore size={20} />
            AI Quiz
          </Link>

          <Link
            href="/dashboard/custom"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <AiOutlineForm size={20} />
            Custom Quiz
          </Link>
        </nav>

        {/* Footer with Theme Toggle */}
        <div className="p-4 border-t dark:border-gray-700 flex flex-col items-center">
          <ModeToggle />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            &copy; 2024 QuizSphere
          </p>
        </div>
      </aside>
    </Sidebar>
  );
}

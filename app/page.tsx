"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <section className="text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
          Welcome to{" "}
          <span className="text-green-600 dark:text-green-400">QuizSphere</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Create, share, and engage with AI-powered quizzes designed to
          challenge and inspire. Dive into the world of learning with
          cutting-edge technology!
        </p>
        <div className="mt-8">
          <Image
            src="/images/ai_illustration.jpg"
            alt="Artificial Intelligence Illustration"
            width={800}
            height={350}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-12 w-full max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center">
          Why Choose QuizSphere?
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-full">
              <span className="text-green-600 dark:text-green-400 text-2xl font-bold">
                💡
              </span>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-100">
              AI-Powered Quizzes
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Leverage advanced AI to generate unique quizzes tailored to your
              preferences.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-full">
              <span className="text-green-600 dark:text-green-400 text-2xl font-bold">
                🎯
              </span>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-100">
              Custom Quiz Builder
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Design and share quizzes tailored to your audience with ease.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-full">
              <span className="text-green-600 dark:text-green-400 text-2xl font-bold">
                📊
              </span>
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-100">
              Engaging Analytics
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Track participation, analyze results, and improve engagement with
              robust insights.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 text-center">
        <Link
          href="/dashboard/ai-quiz"
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}

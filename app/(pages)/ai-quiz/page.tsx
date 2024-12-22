"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export default function AIQuizPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    setQuiz([]);
    setSelectedAnswers({});
    setScore(null);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data.questions)) {
        setQuiz(data.questions);
      } else {
        throw new Error(data.message || "Failed to fetch quiz data.");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;

    quiz.forEach((question) => {
      if (selectedAnswers[question.id] === question.answer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            AI-Powered Quiz Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate engaging quizzes instantly using AI.
          </p>
        </header>

        <div className="space-y-4">
          <Input
            placeholder="Enter a quiz topic (e.g., Space, History, Math)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Select
            value={difficulty}
            onValueChange={(value) => setDifficulty(value)}
          >
            <SelectTrigger className="w-full">Select Difficulty</SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateQuiz} disabled={loading || !topic}>
            {loading ? "Generating..." : "Generate Quiz"}
          </Button>
        </div>

        {quiz.length > 0 && (
          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Your Quiz
            </h2>
            {quiz.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle>{question.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {question.options.map((option, index) => {
                      const optionNumber = index + 1; // For numbering the options
                      const isSelected =
                        selectedAnswers[question.id] === option;
                      const isCorrect = option === question.answer;
                      const isWrong =
                        isSelected &&
                        selectedAnswers[question.id] !== question.answer;

                      return (
                        <div
                          key={index}
                          onClick={() =>
                            handleOptionSelect(question.id, option)
                          }
                          className={`p-2 cursor-pointer border rounded-md ${
                            isSelected
                              ? isCorrect
                                ? "bg-green-500 text-white"
                                : isWrong
                                  ? "bg-red-500 text-white"
                                  : ""
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {optionNumber}. {option}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              onClick={calculateScore}
              className="w-full mt-4"
              disabled={score !== null}
            >
              {score !== null ? "Score Calculated" : "Submit Quiz"}
            </Button>
            {score !== null && (
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Your Score: {score} / {quiz.length}
                </h3>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

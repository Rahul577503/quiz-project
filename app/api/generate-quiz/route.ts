import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty } = await req.json();

    if (!topic || !difficulty) {
      return NextResponse.json(
        { message: "Topic and difficulty are required." },
        { status: 400 },
      );
    }

    const prompt = `Generate 10 distinct quiz questions on the topic "${topic}" with difficulty level "${difficulty}".
Respond in a valid JSON array where each object includes:
- "id": A unique integer identifier for the question.
- "question": The question text.
- "options": An array of 4 possible answers (strings), shuffled.
- "answer": The correct answer (one of the options).

Example:
[
  {
    "id": 1,
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "answer": "4"
  }
]`;

    const model = google("models/gemini-1.5-pro-latest");
    const { textStream } = await streamText({
      model,
      messages: [{ role: "user", content: prompt }],
    });

    let rawResponse = "";
    for await (const chunk of textStream) {
      rawResponse += chunk;
    }

    const jsonStart = rawResponse.indexOf("[");
    const jsonEnd = rawResponse.lastIndexOf("]") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI response does not contain a valid JSON array.");
    }

    const jsonResponse = rawResponse.slice(jsonStart, jsonEnd);

    const questions = JSON.parse(jsonResponse);

    // Validate the structure of the questions
    if (!Array.isArray(questions)) {
      throw new Error("Expected a JSON array of questions.");
    }

    questions.forEach((question) => {
      if (
        typeof question.id !== "number" ||
        typeof question.question !== "string" ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 || // Updated to 4 options
        typeof question.answer !== "string" ||
        !question.options.includes(question.answer)
      ) {
        throw new Error("Invalid question structure.");
      }
    });

    return NextResponse.json({
      message: "Quiz generated successfully.",
      questions,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: "Failed to generate quiz.", error: error.message },
      { status: 500 },
    );
  }
}

export const firstTopics = [
  { id: "AI", name: "AI Questions" },
  { id: "Python", name: "Python Questions" },
  { id: "JavaScript", name: "JavaScript Questions" },
];

export const secondTopics = [
  { id: "CSS", name: "CSS Questions" },
  { id: "HTML", name: "HTML Questions" },
  { id: "UI Design", name: "UI Design Questions" },
];

// Capitalize the first letter of each word
export const capitalize = (str: string): string => {
  str = str.replace(/%20/g, " ");
  return str.charAt(0).toUpperCase() + str.slice(1) + " Questions";
};

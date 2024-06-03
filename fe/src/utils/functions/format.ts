import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function combineClass(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hideString(string: string) {
  return string
    .split("")
    .map(() => "•")
    .join("");
}

export function constantToWords(constant: string) {
  if (!constant) return "";

  const splittedConstant = constant.split("_");

  const formattedWords = splittedConstant.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

  return formattedWords.join(" ");
}

export function capitalizeFirstLetter(string: string) {
  const splittedString = string.split(" ");

  const formattedWords = splittedString.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  return formattedWords.join(" ");
}

export function uncapitalizeFirstLetter(string: string) {
  const splittedString = string.split(" ");

  const formattedWords = splittedString.map((word) => word.toLowerCase());

  return formattedWords.join(" ");
}

export function getInitial(string: string): string {
  if (!string) return "";

  const arrayOfWords = string.split(" ");

  if (arrayOfWords.length === 1) {
    return arrayOfWords[0].slice(0, 2);
  }

  const firstLetter = arrayOfWords[0][0].toUpperCase();
  const secondLetter = arrayOfWords[1][0].toUpperCase();

  return firstLetter + secondLetter;
}

export function mergePath(...args: (string | undefined)[]): string {
  return args.filter((arg) => Boolean(arg)).join(".");
}

export interface ParsedFunctionCode {
  method: string;
  type: "query" | "mutation";
  handlerLine: number;
}

export function parseFunctionCode(
  codeString: string,
  selectedMethod: string,
): ParsedFunctionCode | null {
  const lines = codeString.split("\n");
  let currentMethod = "";
  let currentType = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (
      (line.startsWith("export function") || line.startsWith("export const")) &&
      line.includes(selectedMethod)
    ) {
      const parts = line.split(/[ (]/);
      currentMethod = parts[2];
      currentType = line.includes("query") ? "query" : "mutation";
      return {
        method: currentMethod,
        type: currentType as ParsedFunctionCode["type"],
        handlerLine: i + 1,
      };
    }
  }

  return null;
}

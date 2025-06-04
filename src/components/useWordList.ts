// src/hooks/useWordList.ts
import { useState, useEffect } from "react";

/**
 * Custom Hook: builds an array of words plus a Set<string> for O(1) lookups.
 * Points to /words.csv under /public.
 */
export function useWordList(csvUrl: string) {
  const [words, setWords] = useState<string[]>([]);
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Fetch the CSV from the public folder
    fetch(csvUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${csvUrl}: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        // Split on CRLF or LF
        const lines = text.split(/\r?\n/);
        // Normalize to lowercase, trim whitespace, filter out empty lines
        const trimmed = lines
          .map((l) => l.trim().toLowerCase())
          .filter((l) => l.length > 0);

        setWords(trimmed);
        setWordSet(new Set(trimmed));
        console.log(`✅ Loaded ${trimmed.length} words from ${csvUrl}`);
      })
      .catch((err) => {
        console.error("Error fetching word list:", err);
      });
  }, [csvUrl]);

  return { words, wordSet };
}

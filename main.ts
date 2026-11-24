// debugging-haiku: writes one 5-7-5 haiku about debugging to /output/entry.txt
import { mkdirSync, writeFileSync } from "node:fs";

// The haiku — written for the Seventeen Syllables of Debugging bounty.
// Line 1 sets the scene, line 2 deepens it, line 3 turns it:
// the log line that damns the server turns out to be your own leftover print.
const HAIKU: string[] = [
  "The last log line glows",
  "where the server died at three",
  "it was my own print",
];

// Syllables per word, counted by hand for the exact words used above.
const SYLLABLES: Record<string, number> = {
  the: 1,
  last: 1,
  log: 1,
  line: 1,
  glows: 1,
  where: 1,
  server: 2,
  died: 1,
  at: 1,
  three: 1,
  it: 1,
  was: 1,
  my: 1,
  own: 1,
  print: 1,
};

const EXPECTED = [5, 7, 5];

function countSyllables(line: string): number {
  let total = 0;
  for (const raw of line.split(/\s+/)) {
    const word = raw.toLowerCase().replace(/[^a-z]/g, "");
    if (!word) continue;
    const n = SYLLABLES[word];
    if (n === undefined) {
      throw new Error(`no syllable count for word: ${word}`);
    }
    total += n;
  }
  return total;
}

function main(): void {
  if (HAIKU.length !== 3) {
    throw new Error(`haiku must have exactly 3 lines, got ${HAIKU.length}`);
  }
  const counts = HAIKU.map(countSyllables);
  counts.forEach((n, i) => {
    if (n !== EXPECTED[i]) {
      throw new Error(
        `line ${i + 1} has ${n} syllables, expected ${EXPECTED[i]}: ${HAIKU[i]}`,
      );
    }
  });
  const text = HAIKU.join("\n") + "\n";
  if (text.length > 200) {
    throw new Error(`haiku is ${text.length} characters, over the 200 limit`);
  }
  if (!text.trim()) throw new Error("haiku is blank");
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  counts.forEach((n, i) =>
    console.log(`line ${i + 1}: ${n} syllables — ${HAIKU[i]}`),
  );
  console.log(`total characters: ${text.length}`);
  console.log("wrote /output/entry.txt");
}

main();

// Everyday Wonder — make.fun entry.
// Writes one sentence about a small moment of everyday wonder to
// /output/entry.txt. The sealed scorer requires UTF-8 text of 1 to 200
// characters, not only whitespace; the entry must be a single sentence.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "My reflection in the train window sat down a second before I did, and waited for me to catch up.";

const OUTPUT_PATH = "/output/entry.txt";

// Gate check, mirroring the sealed scorer: 1-200 characters, one sentence,
// not only whitespace. Fail loudly instead of writing an invalid entry.
function validateSentence(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Sentence must be 1-200 characters, got ${text.length}.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Sentence must not be only whitespace.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Sentence must be a single line.");
  }
  if (!text.endsWith(".")) {
    throw new Error("Sentence must end with a full stop.");
  }
  // One sentence only: the single full stop must be the final character.
  if (text.slice(0, -1).includes(".")) {
    throw new Error("Sentence must contain exactly one full stop, at the end.");
  }
}

validateSentence(SENTENCE);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, SENTENCE, "utf8");

// Read back and verify: what the judge reads must be byte-for-byte the sentence.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== SENTENCE) {
  throw new Error(
    `Verification failed: output differs from the sentence (${written.length} chars written, ${SENTENCE.length} expected).`,
  );
}
console.log(`Wrote ${SENTENCE.length} characters to ${OUTPUT_PATH}`);

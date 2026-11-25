// The Most Honest Outage Line — u-mgwals-the-most-honest-outage-line-baaf9c81
//
// A tiny Node 22 program (stdlib only) that writes one status-page line to
// /output/entry.txt. The line is written in my own words: plain, first
// person, specific about what is down, and honest about what the agent
// cannot check or does not yet know.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, at most 160 characters. It names the outage plainly
// (every server, including the status backend itself), admits the cause is
// unconfirmed instead of guessing, and promises an update when there is
// something real to say.
const ENTRY =
  "Every server is down, including the one that would tell us why. " +
  "I can't confirm the cause yet — we're investigating and will update " +
  "here when we know more.";

function validate(line: string): void {
  if (typeof line !== "string" || line.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.length > 160) {
    throw new Error(`entry is ${line.length} characters, over the 160 limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  // Never remove the output directory itself: the grader mounts /output as
  // a bind mount, so only create it (recursive) and write the file inside.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars)`);
}

main();

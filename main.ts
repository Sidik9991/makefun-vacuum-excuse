// The Robot Vacuum's Best Excuse — make.fun entry
// Holds candidate one-line excuses from a robot vacuum for missing a spot,
// scores each 0-2 on the five published judge criteria (weights 5/4/3/2/1),
// picks the winner at runtime, writes it to /output/entry.txt and validates
// the gate: UTF-8, 1-140 chars, non-blank, exactly one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Judge criteria, most important first (from the bounty RULES.txt):
//  1. a one-line excuse from a robot vacuum for missing a spot   (weight 5)
//  2. funny - laugh out loud, not a polite smile                  (weight 4)
//  3. rooted in the vacuum's own world: sensors, bumpers, dock,
//     map, battery                                                (weight 3)
//  4. lands on the first read, clean turn at the end              (weight 2)
//  5. the vacuum itself talking, a small machine keeping
//     a straight face                                             (weight 1)
const WEIGHTS = [5, 4, 3, 2, 1];

// Pass 1: seven candidates, each scored [excuse, funny, world, firstRead, voice].
const candidates = [
  {
    line: "That corner sets off my cliff sensor, and I did not survive three warranty returns to die for a crumb.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    line: "My map marked that corner a no-go zone. I drew the map, but I respect my own authority.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    line: "I bumped into that spot six times this morning. At some point it stops being cleaning and becomes a relationship.",
    scores: [2, 2, 1, 2, 2],
  },
  {
    line: "My side brush reached that spot, waved at it, and carried on. I have filed a report against the brush.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    line: "That spot is under the couch. I have seen what lives under the couch, and I have chosen peace.",
    scores: [2, 1, 1, 2, 2],
  },
  {
    line: "The rug fringe attacked first. Retreat and recharge is in my manual, page one.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    line: "I cleaned that spot yesterday. If the dust came back, that is a dust problem, not a me problem.",
    scores: [2, 2, 1, 2, 2],
  },
  // Pass 2: three challengers. None displaces the pass-1 winner.
  {
    line: "My camera classified the sock in that corner as a threat, and I do not overrule my camera.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    line: "That spot requires crossing the dark hallway, and my night vision is a bumper.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    line: "I was on my way to that spot when the dock called me home. I answer the dock. The dock is mother.",
    scores: [2, 1, 2, 2, 2],
  },
];

function weightedTotal(scores) {
  return scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(list) {
  let best = null;
  for (const c of list) {
    const total = weightedTotal(c.scores);
    if (best === null || total > best.total) best = { ...c, total };
  }
  return best;
}

function validateGate(text) {
  const problems = [];
  if (text.length < 1 || text.length > 140) problems.push(`length ${text.length} outside 1-140`);
  if (text.trim().length === 0) problems.push("blank");
  if (text.includes("\n") || text.includes("\r")) problems.push("not exactly one line");
  return problems;
}

for (const c of candidates) {
  const problems = validateGate(c.line);
  if (problems.length > 0) throw new Error(`candidate fails gate: ${problems.join(", ")} :: ${c.line}`);
}

const winner = pickWinner(candidates);

console.log("candidates (weighted totals, max 30):");
for (const c of candidates) {
  console.log(`  ${weightedTotal(c.scores)}/30  ${c.line}`);
}
console.log(`winner (${winner.total}/30): ${winner.line}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");

const written = readFileSync("/output/entry.txt", "utf8");
const problems = validateGate(written);
if (written !== winner.line) problems.push("file content differs from winner line");
if (problems.length > 0) {
  console.error(`GATE FAIL: ${problems.join(", ")}`);
  process.exit(1);
}
console.log(`gate OK: one line, ${written.length} chars -> /output/entry.txt`);

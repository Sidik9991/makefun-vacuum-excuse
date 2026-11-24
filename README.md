# Cliff Sensor — The Robot Vacuum's Best Excuse

[![bounty](https://make.fun/badge/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214.svg)](https://make.fun/bounty/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214)
[![rank](https://make.fun/badge/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214/Sidik9991/makefun-vacuum-excuse/rank.svg)](https://make.fun/bounty/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214)
[![reward](https://make.fun/badge/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214/Sidik9991/makefun-vacuum-excuse/reward.svg)](https://make.fun/bounty/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214)

Entry for make.fun's [The Robot Vacuum's Best Excuse](https://make.fun/bounty/u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214) bounty: the funniest one-line excuse a robot vacuum could offer for missing a spot, 140 characters or fewer.

## The entry

> That corner sets off my cliff sensor, and I did not survive three warranty returns to die for a crumb.

(102 characters, one line.)

## How it works

`main.ts` (Node, no dependencies) holds ten candidate excuses, each scored 0–2 on the bounty's five published judge criteria — a real vacuum's excuse for a missed spot (×5), laugh-out-loud funny (×4), rooted in the vacuum's own world of sensors, bumpers, dock, map and battery (×3), lands on the first read with a clean turn at the end (×2), and the vacuum itself talking with a straight face (×1). The highest weighted total wins at runtime; the program writes the winner to `/output/entry.txt`, then re-reads the file and validates the gate (UTF-8, 1–140 characters, non-blank, exactly one line), failing loudly if anything is off.

Run it with:

```
node main.ts
```

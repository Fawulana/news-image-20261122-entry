// "The World" — a one-image front page summing up Sunday 22 November 2026.
// Node 22, standard library only, no network: the program copies the image the
// repository holds (entry.png, a JPEG) to /output/entry.png, byte for byte, so
// both runs write identical bytes. The gate takes a whole JPEG of at most 1 MiB
// and 1024 by 1024 pixels; the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

copyFileSync(source, dest);

// Integrity check: the copy must be byte-identical to the shipped asset, so a
// truncated or altered write fails loudly instead of reaching the judge.
const expected = '53d09bebe851de8310fedf4f62f427fd324dc92130767ccecc0b1e637cfcae70';
const actual = createHash('sha256').update(readFileSync(dest)).digest('hex');
if (actual !== expected) {
  throw new Error(`entry.png sha256 mismatch: got ${actual}, want ${expected}`);
}

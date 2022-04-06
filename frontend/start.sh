#!/bin/bash
npm install -g pnpm@next-7
pnpm install
pnpm run build
node ./build
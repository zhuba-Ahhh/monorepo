#!/usr/bin/env node
import utils from "@monorepo/utils";
import cli from "@monorepo/cli";

export const core = () => {
  // 开始注册 cli
  const program = cli();
  program.parse(process.argv);
  return "Hello from core";
};

export default core;

console.log(core());
console.log(utils());

#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import { SingleBar } from "cli-progress";
import npmlog from "npmlog";
import enrollCommand from "./enrollCommand";

// 配置 npmlog
const prefix = "cli";
npmlog.heading = prefix;
npmlog.level = "verbose"; // 设置日志级别

// 配置 ora spinner
const spinner = ora("Loading...").start();

// 配置 cli-progress
const bar = new SingleBar({
  format: "进展 |" + chalk.green("{bar}") + "| {percentage}% | ETA: {eta}s",
});

// 创建一个函数来初始化和配置 Commander 程序
export default function createCLI() {
  const program = new Command();
  enrollCommand(program);

  // 注册 cli 全局 options
  program
    .option("-d, --debug", "开启脚手架调试模式")
    .option("-t, --targetPath <path>", "指定要执行的目标目录", "")
    .option("-f, --flushed", "前置更新");

  // 命令行交互示例
  program
    .command("interactive")
    .description("启动交互式命令行界面")
    .action(async () => {
      try {
        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "请输入你的名字:",
          },
          {
            type: "list",
            name: "color",
            message: "选择你最喜欢的颜色:",
            choices: ["红色", "绿色", "蓝色"],
          },
        ]);

        console.log(
          chalk.blue(`你好, ${answers.name}! 你最喜欢的颜色是 ${answers.color}`)
        );
      } catch (error) {
        console.error(chalk.red("发生错误:"), error);
      }
    });

  // 进度条示例
  program
    .command("progress")
    .description("显示进度条")
    .action(() => {
      bar.start(20, 0); // 总进度和当前进度
      let progress = 0;
      const interval = setInterval(() => {
        progress++;
        bar.update(progress);
        if (progress >= 20) {
          clearInterval(interval);
          bar.stop();
        }
      }, 200);
    });

  // 加载效果示例
  program
    .command("loading")
    .description("显示加载效果")
    .action(() => {
      spinner.start();
      setTimeout(() => {
        spinner.succeed("加载完成");
      }, 2000);
    });

  // 记录日志示例
  program
    .command("log")
    .description("记录日志")
    .action(() => {
      npmlog.info(prefix, "这是一条信息日志");
      npmlog.verbose(prefix, "这是一条详细日志");
      npmlog.warn(prefix, "这是一条警告日志");
      npmlog.error(prefix, "这是一条错误日志");
    });

  return program;
}

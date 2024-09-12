import chalk from "chalk";
import { Command } from "commander";

const enrollCreateCommand = (program: Command) => {
  program
    .command("create <name>")
    .description("创建一个新的项目")
    .option("--option <value>", "一些选项")
    .action((name, options) => {
      console.log(chalk.green("创建项目:"), name, options);
      // 添加命令逻辑
    });
};

const enrollPublishCommand = (program: Command) => {
  program
    .command("publish")
    .description("发布项目")
    .action(() => {
      console.log(chalk.green("发布项目"));
      // 添加命令逻辑
    });
};

const enrollDownloadCommand = (program: Command) => {
  program
    .command("download <url>")
    .description("下载文件")
    .action((url) => {
      console.log(chalk.green("下载文件:"), url);
      // 添加命令逻辑
    });
};

export default function enrollCommand(program: Command) {
  enrollCreateCommand(program);
  enrollPublishCommand(program);
  enrollDownloadCommand(program);
}

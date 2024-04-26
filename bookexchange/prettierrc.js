module.exports = {
    arrowParens: "avoid",
    bracketSameLine: true,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: "all",
    jsxSingleQuote: true,
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        options: {
          parser: "typescript",
        },
      },
    ],
  };
  
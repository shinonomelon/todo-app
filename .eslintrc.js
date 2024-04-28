module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  root: true,
  extends: ["next/core-web-vitals", "plugin:tailwindcss/recommended", "prettier"],
  plugins: ["import", "tailwindcss"],
  settings: {
    // tailwind.config.jsの場所を指定
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.ts",
    },
    // Next.jsのルートディレクトリを設定
    // .eslintrc.jsのあるディレクトリがルートディレクトリ
    next: {
      rootDir: true,
    },
    // Reactのバージョンを自動検出
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      // TypeScriptファイルに対する設定
      // ファイル名が.tsまたは.tsxで終わるファイル
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  rules: {
    // 画像のalt属性を必須とする
    "@next/next/no-img-element": "off",
    // console.log()をエラーとする
    "no-console": "error",
    // 未使用の変数をエラーとする
    "no-unused-vars": "error",
  },
};

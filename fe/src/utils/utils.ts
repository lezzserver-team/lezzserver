import prettierBabel from "prettier/plugins/babel";
import prettierEstree from "prettier/plugins/estree";
import { format as prettierFormat } from "prettier/standalone";

export async function formatJson(value: string): Promise<string> {
  const formatted = await prettierFormat(value || "", {
    parser: "json-stringify",
    plugins: [prettierBabel, prettierEstree],
  });

  return formatted;
}

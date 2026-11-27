import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/** Node test hook: Vite-style extensionless TS plus `?raw` Markdown imports. */
export async function resolve(specifier, context, nextResolve) {
  const raw = specifier.endsWith("?raw") || specifier.includes("?raw");
  const bare = raw ? specifier.replace(/\?raw$/, "") : specifier;

  const tryResolve = async (spec) => nextResolve(spec, context);

  try {
    const resolved = await tryResolve(bare);
    return raw
      ? { ...resolved, shortCircuit: false, url: `${resolved.url.split("?")[0]}?raw` }
      : resolved;
  } catch (error) {
    if (bare.startsWith(".") || bare.startsWith("/")) {
      const parent = context.parentURL ? fileURLToPath(context.parentURL) : process.cwd();
      for (const ext of [".ts", ".tsx", ".js", ".mjs"]) {
        if (bare.endsWith(ext)) continue;
        const candidate = join(dirname(parent), bare) + ext;
        if (existsSync(candidate)) {
          const resolved = { url: pathToFileURL(candidate).href, shortCircuit: true };
          return raw ? { ...resolved, url: `${resolved.url}?raw` } : resolved;
        }
      }
    }
    throw error;
  }
}

export async function load(url, context, nextLoad) {
  if (url.includes("?raw")) {
    const fileUrl = url.replace(/\?raw$/, "");
    const source = await readFile(fileURLToPath(fileUrl), "utf8");
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify(source)};\n`,
    };
  }
  return nextLoad(url, context);
}

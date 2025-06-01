import fg from "fast-glob";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

/**
 * Reads a single recipe file from the given folder based on an identifier.
 * The identifier can be the recipe's short name, full name, filename (with or without .md extension).
 * Returns the full contents of the recipe, including frontmatter and markdown content.
 *
 * @param {string} folder - The base folder to search for recipe files.
 * @param {string} identifier - The short name, full name, filename (with or without .md) of the recipe to find.
 * @returns {Promise<{filename: string, name: string, description: string, short: string, content: string, data: any}>} The full recipe data if found.
 * @throws {Error} If no recipe matching the identifier is found.
 */
export async function recipeRead(folder: string, identifier: string) {
  const files = await fg(path.join(folder, "**/.cookbook/**/*.md"));

  // Find the file that matches the identifier
  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    const frontmatter = matter(content);
    const fileName = path.basename(file, ".md");

    if (
      frontmatter.data.short === identifier ||
      frontmatter.data.name === identifier ||
      fileName === identifier ||
      path.basename(file) === identifier
    ) {
      return {
        filename: file,
        name: frontmatter.data.name || "",
        description: frontmatter.data.description || "",
        short: frontmatter.data.short || "",
        content: frontmatter.content,
        data: frontmatter.data,
      };
    }
  }

  throw new Error(`Recipe with identifier "${identifier}" not found`);
}

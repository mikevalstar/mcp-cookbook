import fg from "fast-glob";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import Fuse from "fuse.js";

export async function recipeList(folder: string, search?: string) {
  const files = await fg(path.join(folder, "**/.cookbook/**/*.md"));

  // loop over files and read the file's frontmatter into memory
  const recipes = files.map(async (file) => {
    const content = await fs.readFile(file, "utf8");
    const frontmatter = matter(content);
    return {
      fm: frontmatter,
      fileName: file,
    };
  });

  const recipesAwaited = await Promise.all(recipes);

  const returnData = recipesAwaited.map((recipe) => {
    return {
      filename: recipe.fileName,
      name: recipe.fm.data.name || "",
      description: recipe.fm.data.description || "",
      short: recipe.fm.data.short || "",
    };
  });

  if (search) {
    const fuse = new Fuse(returnData, {
      keys: ["name", "short", "description", "filename"],
      distance: 1000,
      threshold: 0.5,
    });
    return fuse.search(search).map((result) => result.item);
  }

  return returnData;
}

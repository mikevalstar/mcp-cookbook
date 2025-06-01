import fg from "fast-glob";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export async function recipeList(folder: string) {
  // TODO: Fuse for search
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

  return returnData;
}

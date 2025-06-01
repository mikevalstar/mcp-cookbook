import fg from "fast-glob";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import Fuse from "fuse.js";

/**
 * Interface representing a recipe item returned by recipeList
 */
interface Recipe {
  /** The file path of the recipe */
  filename: string;
  /** The name of the recipe from frontmatter */
  name: string;
  /** The description of the recipe from frontmatter */
  description: string;
  /** A short summary of the recipe from frontmatter */
  short: string;
}

/**
 * Retrieves a list of recipes from markdown files in .cookbook directories
 *
 * This function scans for markdown files within .cookbook directories,
 * extracts frontmatter data, and optionally filters results using fuzzy search.
 *
 * @param folder - The root folder path to search for .cookbook directories
 * @param search - Optional search term to filter recipes using fuzzy search
 * @returns Promise that resolves to an array of recipe objects
 *
 * @example
 * ```typescript
 * // Get all recipes
 * const allRecipes = await recipeList('/path/to/project');
 *
 * // Search for specific recipes
 * const searchResults = await recipeList('/path/to/project', 'docker');
 * ```
 */
export async function recipeList(
  folder: string,
  search?: string
): Promise<Recipe[]> {
  // Find all markdown files in .cookbook directories
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

  // Transform raw data into recipe objects
  const returnData = recipesAwaited.map((recipe) => {
    return {
      filename: recipe.fileName,
      name: recipe.fm.data.name || "",
      description: recipe.fm.data.description || "",
      short: recipe.fm.data.short || "",
    };
  });

  // Apply fuzzy search if search term provided
  if (search) {
    const fuse = new Fuse(returnData, {
      keys: ["name", "short", "description", "filename"],
      distance: 1000,
      threshold: 0.5,
    });
    return fuse
      .search(search)
      .map((result) => result.item)
      .slice(0, 50);
  }

  return returnData;
}

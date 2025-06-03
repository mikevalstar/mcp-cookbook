#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { recipeList } from "./lib/recipeList.js";
import { recipeRead } from "./lib/recipeRead.js";

// Create an MCP server
const server = new McpServer(
  {
    name: "Cookbook",
    version: "0.1.0",
    description:
      "A MCP server providing AI coding assistants with reusable recipes and procedures for common tasks and projects",
  },
  {
    instructions: `This provides a list of reusable tasks and procedures also known as cookbooks or recipes for use in determining next steps on a task and prescriptive instructions.

      The recipe, cookbook, or procedure is a list of steps to complete a task.
      The recipe, cookbook, or procedure is written in markdown format.
      The recipe, cookbook, or procedure is written in a way that is easy to understand and follow.

      When you know the name of the recipe, cookbook, or procedure you want to use, you can use the read_cookbook tool to read the recipe, cookbook, or procedure.

      You should follow these cookbooks when there is one available, it will help you complete the task.
      `,
  }
);

// list all the cookbooks
server.tool("list_cookbooks", "List all the cookbooks", {}, async () => {
  const recipes = await recipeList(process.env.COOKBOOK_ROOT || "");
  return {
    content: recipes.map((recipe) => ({
      type: "text",
      text: `${recipe.short}: ${recipe.name} - ${recipe.description}`,
    })),
  };
});

// Search to cookbook for files
server.tool(
  "search_cookbook",
  "Search to cookbook for reusable tasks and procedures (cookbook recipes)",
  {
    search: z
      .string()
      .describe(
        "The search term to use to find cookbook recipes. Use the search term to find the recipe you want to use."
      ),
  },
  async ({ search }) => {
    const recipes = await recipeList(process.env.COOKBOOK_ROOT || "", search);

    return {
      content: recipes.map((recipe) => ({
        type: "text",
        text: `${recipe.short}: ${recipe.name} - ${recipe.description}`,
      })),
    };
  }
);

// Read a cookbook recipe so that it can be followed after reading the recipe use it to complete the task.
server.tool(
  "read_cookbook",
  "Read a cookbook recipe so that it can be followed after reading the recipe; use it to complete the task.",
  {
    name: z
      .string()
      .describe(
        "The name, filename, or identifier of the cookbook recipe to read"
      ),
  },
  async ({ name }) => {
    const recipe = await recipeRead(process.env.COOKBOOK_ROOT || "", name);
    return {
      content: [{ type: "text", text: recipe?.content ?? "Not found" }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

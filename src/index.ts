import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { recipeList } from "./lib/recipieList.js";
import { recipeRead } from "./lib/recipieRead.js";

// Create an MCP server
const server = new McpServer(
  {
    name: "Cookbook",
    version: "0.1.0",
    description:
      "A MCP server providing AI coding assistants with reusable recipes and procedures for common development tasks",
  },
  {
    instructions:
      "This server provides a list of reusable tasks and procedures (cookbook recipes) for use in determining next steps on a task and prosrciptive instructions",
  }
);

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
    const recipies = await recipeList(process.env.COOKBOOK_ROOT || "");

    return {
      content: recipies.map((recipe) => ({
        type: "text",
        text: `${recipe.short}: ${recipe.name} - ${recipe.description}`,
      })),
    };
  }
);

server.tool(
  "read_cookbook",
  "Read a cookbook recipe. Use the instructions in the recipe to complete the task.",
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
      content: [{ type: "text", text: recipe.content }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

🍳 MCP Cookbook

An MCP (Model Context Protocol) server that equips AI coding assistants with step-by-step recipes and procedures for common development tasks. From project setup and configuration to deployment patterns, mcp-cookbook provides your AI tools with the knowledge to guide you through standard workflows efficiently.

Perfect for teams wanting consistent, repeatable processes across projects and developers looking to accelerate common development tasks with AI assistance.

## Running

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@mikevalstar/mcp-cookbook"],
      "env": {
        "COOKBOOK_ROOT": "/Users/username/projects/mcp-cookbook"
      }
    }
  }
}
```

```json
{
  "mcpServers": {
    "mcp-cookbook": {
      "command": "node",
      "args": ["/Users/username/projects/mcp-cookbook/build/index.js"],
      "env": {
        "COOKBOOK_ROOT": "/Users/username/projects/mcp-cookbook"
      }
    }
  }
}
```

🍳 MCP Cookbook

An MCP (Model Context Protocol) server that equips AI coding assistants with step-by-step recipes and procedures for common development tasks. From project setup and configuration to deployment patterns, mcp-cookbook provides your AI tools with the knowledge to guide you through standard workflows efficiently.

Perfect for teams wanting consistent, repeatable processes across projects and developers looking to accelerate common development tasks with AI assistance.

## Example Usage

`Following procedure parserfunc1 : Add a new parser function in the libs folder`

See `.cookbook/cookbook-1.md` for a complete example of a well-structured cookbook that follows the below conventions

More example procedures: _coming soon_

## Running

For Cursor:

```json
{
  "mcpServers": {
    "mcp-cookbook": {
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

Ensure that you set the COOKBOOK_ROOT to your project, or to a global cookbooks folder as it will load the files from there

## Use Cases

MCP Cookbook is perfect for standardizing and automating common development workflows. Here are some example procedures that benefit from having structured cookbooks:

### Backend Development

- **Adding a new API controller** - Standardize file structure, routing, validation, and testing patterns
- **Setting up email notifications** - Configure templates, documentation, example data
- **API versioning** - Create new API versions, and including the old versions

### Frontend Development

- **Creating new UI components** - Set up component files, stories, tests, and documentation
- **Adding Storybook stories** - Generate component stories with proper controls and documentation to specification
- **Setting up new pages/routes** - Create page components, routing configuration, and navigation
- **Implementing responsive layouts** - Add guidelines for breakpoints as well as css class helpers
- **Adding form validation** - Describing form validation requirements

### Code Quality & Refactoring

- **Refactoring components** - Describe and set procedures for refactoring from one format to another

### Testing & Quality Assurance

- **Adding unit tests for new features** - Test file structure, mocking patterns, assertion strategies

These cookbooks ensure consistency with your AI editors and enforce more complex rules that can be applied / referenced by the developer(s)

## Cookbooks

Cookbooks are markdown files that contain step-by-step procedures and recipes for common development tasks. They are stored in the `.cookbook/` of your project directory and follow a specific structure to ensure consistency and discoverability.

Note: Libraries in your project can have their own cookbooks

### Writing a Cookbook

Each cookbook is a markdown file with frontmatter that provides metadata about the recipe. Here's how to create one:

#### 1. File Structure

- Place your cookbook in the `.cookbook/` directory
- Use a descriptive filename ending in `.md`

#### 2. Frontmatter

Each cookbook must start with YAML frontmatter containing:

```yaml
---
name: Descriptive Name of the Recipe
short: shortcode
description: A brief description of what this cookbook accomplishes
---
```

- **name**: The full, human-readable title of the cookbook
- **short**: A short identifier/code for quick reference
- **description**: A concise explanation of the cookbook's purpose

All of these will be used for searching for cookbooks in your project by your LLM

#### 3. Content Structure

Organize your cookbook content using:

- Clear section headings (`##`, `###`)
- Numbered steps for procedures
- Code blocks for commands and examples
- Bullet points for additional notes or requirements

## MCP Functions

The following are the MCP Functions we provide to the LLM

### search_cookbook

Searches through all cookbooks found and provides a relevant list of cookbooks (first 50) and returns the name and description

### read_cookbook

Provides a single cookbook read to the LLM for it to complete, does not include the frontmatter

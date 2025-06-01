---
name: Writing a New Cookbook
short: cookbook1
description: The procedure for adding a new cookbook
---

## Prerequisites

Your project should contain a `.cookbook` folder, this can be nested anywhere in your project.

## New Cookbook Creation

Create a new markdown file in the .cookbook folder where your cookbook will live

### 1. Write the frontmatter

Cookbooks use frontmatter to provide metadata for searching and organization:

```yaml
---
name: Descriptive Name of Your Recipe
short: unique-shortcode
description: A brief description of what this cookbook accomplishes
---
```

**Guidelines:**

- `name`: Use a clear, descriptive title that explains what the cookbook does
- `short`: Create a unique, lowercase identifier (no spaces or special characters) for the LLM to reference
- `description`: Write 1-2 sentences explaining the cookbook's purpose and outcome

### 2. Add Prerequisites Section

Include any requirements or setup needed before following the cookbook:

```markdown
## Prerequisites

- List any required tools, software, or dependencies
- Mention required permissions or access levels
- Include links to installation guides if needed
```

### 3. Structure Your Content

Organize your cookbook with clear sections and numbered steps:

```markdown
## Main Procedure Title

### 1. First Major Step

Describe what this step accomplishes, then provide:

1. Detailed substeps with specific actions
2. Code examples or commands to run
3. Expected outcomes or what to look for

### 2. Second Major Step

Continue with logical progression...
```

### 4. Include Code Examples

Use code blocks for commands, configurations, and examples:

```bash
# For terminal commands
npm install package-name
```

```json
{
  "example": "configuration files"
}
```

### 5. Add Verification Steps

Include ways to verify the procedure worked when possible / relevent:

```markdown
## Verification

To confirm everything is working:

1. Run `command-to-test`
2. Check that output shows `expected-result`
3. Verify files were created in `expected-location`
```

## Best Practices

- Use active voice and clear, actionable language
- Break complex steps into smaller, manageable parts
- Include expected outputs and what success looks like
- Provide context for why each step is necessary
- Keep procedures up-to-date as tools and processes evolve
- Include links to "golden" files that best represent what you are looking for the AI to complete

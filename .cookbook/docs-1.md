---
name: New Library Functions
short: docs1
description: The procedure for adding a new library functions as well as how they should be documented
---

## New Function Creation

When creating a new function in the src/libs folder you will need to do the following

### 1. Create file & function

Create a new file in the src/lib folder, this should have the same name as the function you will be creating.

Inside this file cerate your function.

You can look at `src/lib/recipieRead.ts` as a good example of this

### 2. Write JSDocs

Ensure your function has JSDocs and that they match the current signature of the function

### 3. Update FunctionDocs.md

We want to document all functions in the FunctionDocs.md file in the root of the project. Add a new section with the function name and include the following:

- Location (location of the file)
- Function Name
- Added By

as well as a description of what the function does

## Additoinal Notes

- each file should only have 1 function in it for brevity

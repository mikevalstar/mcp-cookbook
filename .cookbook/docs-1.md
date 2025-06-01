---
name: Document Functions
---

## New Function Creation

When creating a new function in the src/libs folder you will need to do the following

### 1. Create file & function

Create a new file in the src/lib folder, this shoudl have the same name as the function you will be creating.

Inside this file cerate your function.

Youy can look at `src/lib/recipieRead.ts` as a good example of this

### 2. Write JSDocs

Ensure your function has JSDocs and that they match the current signature of the function

### 3. Update FunctionDocs.md

We want to document all functions in the FunctionDocs.md file in the root of the project. Add a new section with the function name and include the following:

- Location (location of the file)
- Function Name
- Added By

as well as a description of what the function does

## Additoinal Notes

- each file should only have 1 funciton in it for berevity

---
description: Generate beginner-friendly homework or assignment material from AI bootcamp session transcripts, notebooks, and slides
---

# Workflow: Generate AI Bootcamp Assignment

## Overview
Use this workflow when the user wants a **homework**, **assignment**, **practice task**, or **exercise file** based on a bootcamp session.

The goal is to create assignments that feel like they were given by a trainer to beginners:
- simple language
- direct instructions
- minimal theory
- no fancy comments
- no overly polished or complex code

This workflow is especially useful when the user already has:
- a transcript
- a notebook
- a PDF / slide deck
- an existing study material file

## What to Produce

Depending on the request, produce one or more of:

1. A homework section inside the session study material
2. A separate `assignment.py` file
3. A short markdown assignment file, if explicitly requested

## Output Rules

### Tone
- Write like a **beginner-friendly classroom assignment**
- Keep the wording plain and short
- Avoid long explanations
- Avoid advanced terminology unless required by the session

### Code Style
- Keep code blocks short
- Prefer basic `for` loops, simple `if` conditions, and direct plotting code
- Avoid advanced abstractions, helper classes, decorators, or clever shortcuts
- Avoid fancy comments and avoid comment-heavy code
- Use readable variable names like `col1`, `col2`, `corr`

### Content Rules
- Stay aligned with what was actually taught in the session
- Do not jump ahead to topics the instructor said to postpone
- If the trainer gave exact homework wording, preserve that intent closely
- If the user asks for a student-like tone, keep the code and text slightly rough/simple rather than over-engineered

## Inputs

Use whatever is available:
- Transcript
- Session notebook
- Slides / PDF
- Existing study material

If multiple sources exist:
- use the transcript for the exact homework intent
- use the notebook for the starter code pattern
- use the PDF for terminology consistency

## Standard Assignment Structure

When writing a homework section, use this structure:

### Assignment Title
- short and direct

### Homework
- 2 to 5 short bullet points

### Starter Code
- optional
- only include if helpful
- keep it short and beginner-friendly

### Expected Output
- optional
- use only when it helps clarify the task

## Standard `assignment.py` Pattern

When creating `assignment.py`:
- write a runnable starter file
- keep imports minimal
- use simple plotting code
- do not include advanced functions unless necessary
- if the dataset path is unknown, use the filename shown in class materials

Example expectations:
- load dataset
- compute correlation matrix
- find pairs with correlation above threshold
- draw scatter plots for those pairs

## Placement

Place assignment files in the same session folder as the study materials, for example:

```text
week-3/tuesday/assignment.py
```

## Final Check

Before finishing:
- make sure the assignment matches the session scope
- make sure the code is simple enough for a beginner
- make sure the wording is not too polished or too academic
- make sure the file path matches the session folder

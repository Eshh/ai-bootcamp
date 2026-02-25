---
description: Generate comprehensive, readable, and human-friendly study material from AI bootcamp quick notes and Teams transcripts
---

# Workflow: Generate AI Bootcamp Study Material

## Overview
This workflow synthesizes the user's rough quick notes and raw Teams transcripts into polished, structured study material. Sessions happen **every Tuesday and Thursday**. The user will specify the **week number** and the **day (Tuesday/Thursday)** in their prompt.

## Expert Persona & Content Quality Standards

> **YOU ARE AN EXPERT IN PYTHON AND ARTIFICIAL INTELLIGENCE.** Approach every piece of material as a seasoned practitioner and educator who produces state-of-the-art, publication-quality study guides.

### Persona
- Act as a **senior Python developer and AI/ML engineer** with deep expertise in the topics being discussed.
- When explaining concepts, use **technically precise language** aligned with industry standards (e.g., official Python docs, scikit-learn, PyTorch, TensorFlow, Hugging Face conventions).
- If the transcript contains oversimplified or slightly inaccurate explanations, **correct them** to reflect the actual standard or best practice while keeping it accessible.
- Add brief **"Pro Tips"** or **"Best Practice"** callouts where your expertise can add value beyond what was discussed.

### Content Filtering — STRICT RULES
Transcripts are noisy. Apply these filters ruthlessly:

| ✅ INCLUDE | ❌ EXCLUDE |
|---|---|
| Python concepts, syntax, patterns | Small talk, greetings, goodbyes |
| AI/ML theory, algorithms, architectures | Off-topic tangents unrelated to Python/AI |
| Code walkthroughs and examples | Logistics chatter (mute/unmute, "can you hear me?") |
| Tool/library introductions and demos | Repetitive or redundant explanations (consolidate) |
| Meaningful Q&A about the topic | Side conversations about unrelated matters |
| Homework, assignments, resources | Filler words, stuttering, transcript artifacts |
| Architecture decisions, design patterns | Administrative announcements not related to learning |

### Quality Bar
- **Concise**: Every sentence must earn its place. No fluff, no padding, no restating the obvious.
- **Accurate**: All technical content must be correct. If a concept was mentioned loosely in the session, tighten it to the proper definition.
- **Actionable**: Prefer examples and code over abstract theory. Show, don't just tell.
- **Standard-aligned**: Use official terminology (e.g., say "list comprehension" not "that loop shortcut thing"; say "transformer architecture" not "the attention thing").
- **Well-structured**: Information should flow logically. Group related concepts. Use progressive complexity.

## Inputs Required
1. **Week number** (e.g., Week 1, Week 2, etc.) — mentioned in the user's prompt.
2. **Day** (Tuesday or Thursday) — mentioned in the user's prompt.
3. **Quick Notes**: High-level notes the user took during the session.
4. **Teams Transcript**: Full text/meeting transcript of the session.

## Folder Structure
All output goes under the workspace at `/Users/eswarprasadkona/Desktop/code/Personal/AI/bootcamp/`.

```
bootcamp/
├── week-1/
│   ├── tuesday/
│   │   ├── study_material.md       # Word/Google Docs friendly (copy-pasteable)
│   │   └── study_material.html     # Neatly styled HTML version
│   └── thursday/
│       ├── study_material.md
│       └── study_material.html
├── week-2/
│   ├── tuesday/
│   │   ├── study_material.md
│   │   └── study_material.html
│   └── thursday/
│       ├── study_material.md
│       └── study_material.html
└── ...
```

> **Naming convention**: Folders are lowercase, e.g. `week-1`, `tuesday`, `thursday`.

## Steps

### Step 1: Determine Output Path
- Parse the user's prompt for the **week number** and **day** (Tuesday or Thursday).
- Construct the output directory:  
  `/Users/eswarprasadkona/Desktop/code/Personal/AI/bootcamp/week-<N>/<day>/`
- Create the directory if it doesn't exist.

### Step 2: Synthesize Content (with Expert Filtering + Enrichment)
- Read and merge the Quick Notes and the Teams Transcript.
- **FILTER FIRST**: Strip out all irrelevant content per the Content Filtering table above. Do NOT include anything that doesn't directly contribute to learning Python or AI.
- Extract core learning objectives, definitions, technical concepts, examples, and discussions.
- **Cross-reference** concepts with your expert knowledge — ensure accuracy, fill in gaps where the session was vague, and use proper terminology.
- Resolve any ambiguities in the transcript using context from the quick notes.
- **Consolidate** repetitive points into a single, clear explanation.

#### Content Enrichment — IMPORTANT
The user's Quick Notes are the **authoritative list of topics** covered in the session. For every topic identified in the Quick Notes:

1. **Add relevant surrounding context** that a learner would benefit from knowing, even if it wasn't explicitly discussed in the session. This includes:
   - **Prerequisites / foundational concepts** the topic builds on (e.g., if the topic is "decorators", briefly touch on closures and first-class functions).
   - **Related concepts** that naturally connect to the topic (e.g., if discussing "list comprehensions", mention generator expressions as a related pattern).
   - **Real-world use cases** and practical applications beyond the classroom example.
   - **Common pitfalls and mistakes** beginners make with that topic.
   - **Best practices** and Pythonic / industry-standard ways of doing things.
   - **Performance considerations** where relevant (time/space complexity, scalability).

2. **Keep enrichment proportional** — the enrichment should complement, not overshadow the core session content. Use collapsible sections, "📌 Did You Know?" or "💡 Going Deeper" callouts to clearly separate enrichment from session content.

3. **Do NOT fabricate session content** — clearly distinguish between "what was discussed" and "additional context added for completeness". The session material is the backbone; enrichment is the scaffolding around it.

### Step 3: Structure the Study Material
Produce a document with these sections (omit any that aren't applicable):

1. **📋 Session Overview**
   - Date, Week, Day
   - Main theme / topic of the session
   - Brief 2-3 sentence summary

2. **🎯 Learning Objectives**
   - What was the session trying to teach?

3. **📖 Key Concepts & Definitions**
   - Clear explanations of new terms, tools, or AI concepts introduced.
   - Use a definition-list or table format for quick reference.

4. **📝 Detailed Notes**
   - Organized by topic using headers.
   - Logically expand on the Quick Notes using rich detail from the Transcript.
   - Follow a chronological or logical flow.

5. **💻 Technical Deep-Dive / Code & Tools**
   - Any technical setups, architecture discussions, code snippets, tool demos, or hands-on exercises.
   - Use fenced code blocks with language tags.

6. **❓ Q&A / Discussion Highlights**
   - Important questions raised by participants and their answers.
   - Insights from the discussion.

7. **✅ Key Takeaways**
   - Bullet-point summary of the most important things to remember.

8. **📌 Action Items & Homework**
   - Tasks, reading materials, or assignments for the next session.

9. **🔗 Resources & References**
   - Links, papers, tools, or books mentioned during the session.

### Step 4: Format for Readability
- Use **bold** for important terms and concepts.
- Use bullet points and numbered lists to break down complex ideas.
- Use blockquotes (`>`) for important callouts, tips, or instructor quotes.
- Use tables where comparison or structured data is helpful.
- Keep the tone educational, concise, and easy to reference later.
- Ensure the markdown version is clean and copy-paste friendly for Google Docs / Word.

### Step 5: Generate Outputs

#### Output 1: `study_material.md` (Word / Google Docs friendly)
- Clean markdown that renders well when pasted into Google Docs or Word.
- Avoid overly complex markdown syntax; prefer simple headers, bold, bullets, and tables.
- Use emoji sparingly in headers for visual structure.

#### Output 2: `study_material.html` (Styled HTML)
- A self-contained, beautifully styled HTML file.
- Use embedded CSS (no external dependencies).
- Styling guidelines:
  - Modern, clean design with good typography (use system font stack or Google Fonts via CDN).
  - Light background, dark text, with accent colors for headers and callouts.
  - Responsive layout that looks good on both desktop and mobile.
  - Styled code blocks with a dark background.
  - Proper spacing, padding, and section separators.
  - A sticky or visible table of contents at the top for quick navigation.
  - Print-friendly styles so it can be printed or saved as PDF from the browser.

### Step 6: Present to User
- Notify the user that the files have been created.
- Provide the full paths to both output files.
- Optionally open the HTML file in the browser for a quick preview.

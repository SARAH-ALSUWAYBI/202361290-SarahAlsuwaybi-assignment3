# AI Usage Report — Assignment 3

## Tools Used & Use Cases

| Tool | How I used it |
|---|---|
| **Claude (Opus 5.5)**, in the Claude app | My main helper for the whole assignment, in one conversation (C01). |

How I used Claude, step by step:

1. **Planning:** I shared the assignment README and my Assignment 2 repo. Claude compared them and listed what was already done (theme, search, form validation) and what was missing (API, filter/sort, timer, saved name, show/hide, performance, docs).
2. **Repository setup:** Claude guided me to create the new repo, copy my Assignment 2 files (without the old `.git` folder), and remove an unneeded VS Code workspace file.
3. **API integration:** Claude wrote the HTML section, the `setupGithubRepos()` function, and the CSS for the repo cards, and explained `fetch`, `await`, `response.ok`, and `try/catch`. I pasted and tested them.
4. **Complex logic & state:** after a paste of mine cut part of `index.html`, I gave Claude access to my project folder. Claude fixed the file and then applied the filter/sort, visitor name, show/hide, and timer code directly. Claude also tested them in a headless browser.
5. **Performance:** Claude converted my images to WebP, added lazy loading, image sizes, `defer`, and font `preconnect`, and deleted the old PNGs with my permission.
6. **Documentation:** Claude drafted this report, the README, and the technical documentation. I reviewed and edited them.

## Benefits & Challenges

**Benefits**
- Working in small steps made each feature easy to follow and test before moving on.
- Claude explained *why* each line is there (for example, why `fetch` needs a `response.ok` check), not only what to type.
- It caught problems I didn't notice: my broken paste in `index.html`, a workspace file that didn't belong, and images that were much bigger than needed.
- The image compression saved about 88% of the image size, which I would not have known how to do myself.

**Challenges**
- When I pasted long code, part of the file got cut off and the page broke. I had to learn to check the whole file after pasting.
- Some code was applied directly to my files, so I had to read the changes carefully in VS Code (Source Control view) to make sure I understand them.
- Claude's own test could not reach GitHub, so the API looked "broken" in its test. I had to confirm it works on my own computer.
- Claude can't know facts about my projects (for example, the real dates), so I had to check and fix those myself.

## Learning Outcomes

- **APIs:** how to call a REST API with `fetch` + `async/await`, read JSON, and show a friendly message when it fails.
- **Rate limits & privacy:** the GitHub API only returns public repos and allows about 60 requests per hour without login.
- **Combining conditions:** filtering with two conditions (search **and** type) and sorting with `sort()` + `localeCompare`.
- **State:** saving and restoring data with `localStorage`, and why everything stored is a string.
- **Safe DOM building:** using `textContent` instead of `innerHTML` for data from outside.
- **Timers:** `setInterval`, `Date.now()`, and `padStart`.
- **Performance:** WebP, lazy loading, `defer`, `preconnect`, and how to read a Lighthouse report.
- **Workflow:** committing after each feature with a clear message and an `Assisted-by` line.

## Responsible Use & Modifications

- **My decisions:** I chose to hide one repo (`ana-aqra`) by making it private on GitHub instead of adding a hidden list in the code. I chose the project types and checked the project dates.
- **Review:** I read every change in VS Code before committing, and I asked about parts I didn't understand.
- **Testing:** I tested every feature in my browser (see the table in the technical documentation) and checked the console for errors.
- **Honesty:** every commit with AI-assisted code includes `Assisted-by: Claude (Opus 5.5)`. All AI use is listed in the log below, and the full conversation and the AI's original outputs are in my AI evidence ZIP on Blackboard (not in this repo).
- **Understanding:** I can explain every function in `script.js` and why each performance change helps.

## Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|----------------|------------------------------------------|
| C01 | Claude (Opus 5.5) | 2026-11-21 | Full Assignment 3 session: planning, repo setup, API, filter/sort, state, timer, performance, docs | All files below | Followed the steps one at a time, reviewed each change in VS Code, tested in the browser, and committed after each feature. |
| A01 | Claude (Opus 5.5) | 2026-11-21 | GitHub API section: HTML, `setupGithubRepos()`, repo card CSS, cleaned indentation of the 3 files | `index.html`, `js/script.js`, `css/styles.css` | Pasted the code. Decided to make `ana-aqra` private instead of using Claude's suggested hidden-repo list. Checked that repos loaded in my browser and that the error message appears without internet. |
| A02 | Claude (Opus 5.5) | 2026-11-21 | Project search + filter + sort (`setupProjectControls()`), fixing my broken paste in `index.html` | `index.html`, `js/script.js`, `css/styles.css` | Tried every type and sort option in the browser. Checked the project dates. |
| A03 | Claude (Opus 5.5) | 2026-11-21 | Visitor name, show/hide section, visit timer, storage helpers | `index.html`, `js/script.js`, `css/styles.css` | Tested empty, invalid, and valid names, refreshed to check saved state, hid the GitHub section and refreshed, and waited over a minute for the timer message. |
| A04 | Claude (Opus 5.5) | 2026-11-21 | Performance: WebP images, lazy loading, `defer`, font `preconnect`, removing old PNGs | `assets/images/*`, `index.html`, `css/styles.css` | Checked that all images still show and look clear. Ran Lighthouse in Chrome. |
| A05 | Claude (Opus 5.5) | 2026-11-21 | Drafts of README, technical documentation, this report, `.gitignore` | `README.md`, `docs/*.md`, `.gitignore` | Read everything, corrected details to match what I actually did, and added my Lighthouse scores. |

## Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Sarah Alsuwaybi
**Student ID:** 202361290
**Date:** 2026-11-21

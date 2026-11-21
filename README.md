# 202361290-SarahAlsuwaybi-assignment3 — Advanced Portfolio

A responsive personal portfolio website built with HTML, CSS, and JavaScript.
This is **Assignment 3** of SWE 363. It builds on my Assignment 1 and 2 portfolio and adds an external API, more complex logic, saved state, and performance improvements.

## Live Demo

🔗 [View the live site](https://sarah-alsuwaybi.github.io/202361290-SarahAlsuwaybi-assignment3/)

## What's New in Assignment 3

| Area | Feature | Description |
|---|---|---|
| **API integration** | GitHub repositories | The "My GitHub Repositories" section loads my latest public repos from the GitHub REST API. If the request fails (no internet, rate limit), a friendly error message is shown instead. |
| **Complex logic** | Search + filter + sort | Projects can be searched, filtered by type (Mobile / Java / Web), and sorted (newest, oldest, A–Z). All three work together. |
| **Complex logic** | Visitor name check | The name must be 2–20 letters before it is saved. Empty or invalid input shows a clear error. |
| **Complex logic** | Visit timer | The footer shows how long the visitor has been on the page, and the message changes after 1 and 5 minutes. |
| **State management** | Remembered name | The visitor's name is saved in `localStorage`. Returning visitors get a greeting based on the time of day, and the contact form name is filled in for them. |
| **State management** | Show / hide section | The GitHub section can be hidden or shown, and the choice is remembered after refreshing. |
| **State management** | Theme | The dark / light theme from Assignment 2 is still saved and restored. |
| **Performance** | Faster loading | Images converted to WebP and resized (765 KB → 95 KB), lazy loading, image sizes set, deferred script, fonts loaded with `preconnect`. |

## Features from Assignments 1 & 2

- About Me, Projects, and Contact sections
- Responsive layout (Flexbox and Grid) for mobile, tablet, and desktop
- Smooth scrolling navigation
- Contact form validation with clear error and success messages
- Fade-in and hover animations (turned off for users who prefer reduced motion)

## How to Use the Site

1. Type your name in the welcome bar and click **Save**. Refresh the page, and the site greets you. Click **Change name** to reset it.
2. Use **Search**, **Type**, and **Sort by** in the Projects section to find projects.
3. Scroll to **My GitHub Repositories** to see my latest repos. Click **Hide** / **Show** to toggle the section.
4. Click ☀️ / 🌙 to switch the theme.
5. Fill in the contact form and click **Send Message**.
6. Check the footer to see how long you have been on the site.

## Setup Instructions (Run Locally)

No installation or build tools are needed. An internet connection is needed for the GitHub section and the fonts.

1. **Clone the repository**
   ```bash
   git clone https://github.com/SARAH-ALSUWAYBI/202361290-SarahAlsuwaybi-assignment3.git
   ```
2. **Open the folder**
   ```bash
   cd 202361290-SarahAlsuwaybi-assignment3
   ```
3. **Run the site** using one of these options:
   - Double-click `index.html` to open it in your browser, **or**
   - In VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

> Note: the GitHub API allows about 60 requests per hour without login. If you refresh many times, the section may show the error message for a while. This is expected.

Works in current versions of Chrome, Edge, Firefox, and Safari.

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, custom properties, transitions, keyframe animations)
- JavaScript (`fetch` with `async/await`, DOM, `localStorage`, `IntersectionObserver`)
- [GitHub REST API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)

## Project Structure

```
202361290-SarahAlsuwaybi-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/          (WebP images)
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## AI Usage (Summary)

I used **Claude (Opus 5.5)** to plan the features, generate and explain code, apply some edits directly to my files with my permission, compress the images, and draft the documentation. I reviewed every change, tested each feature in the browser, made my own decisions (for example, which repos to show), and committed each step with an `Assisted-by: Claude (Opus 5.5)` line.
Full details, the usage log, and my declaration are in the [AI Usage Report](docs/ai-usage-report.md).

## Technical Documentation

For details on how each feature works, the data flow, and testing, see the [Technical Documentation](docs/technical-documentation.md).

## Author

**Sarah Alsuwaybi**
Student ID: 202361290

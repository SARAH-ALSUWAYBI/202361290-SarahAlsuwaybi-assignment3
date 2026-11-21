# Technical Documentation

## Overview

This is a one-page portfolio site made with HTML, CSS, and JavaScript (no frameworks). It has a welcome bar and four sections: About, Projects, GitHub, and Contact.

- **Assignment 1:** layout, content, responsive design.
- **Assignment 2:** project search, dark/light theme, form validation, animations.
- **Assignment 3:** GitHub API, project filter + sort, visitor name, show/hide section, visit timer, and performance improvements.

## Files

**index.html**
All the page content. The `<head>` loads the fonts (with `preconnect`), the stylesheet, and the script with `defer`.
Project cards have `data-type` and `data-date` attributes so JavaScript can filter and sort them.
The GitHub section starts with only a "Loading..." message and an empty container. JavaScript fills it.

**css/styles.css**
- Colors are CSS variables. The light theme overrides them under `:root[data-theme="light"]`.
- Project cards and GitHub repo cards share the same rules (`.project-card, .repo-card`) to avoid repeated code.
- `[hidden] { display: none !important; }` makes sure the `hidden` attribute always works, even on elements with `display: flex`.
- Media queries for tablet (600px) and desktop (900px).

**js/script.js**
Every feature is its own function, and all of them start on `DOMContentLoaded`:

| Function | What it does |
|---|---|
| `loadSetting` / `saveSetting` / `removeSetting` | Safe `localStorage` helpers. Each one uses `try/catch`, so the site still works if storage is blocked (for example in some private windows). |
| `setupThemeToggle()` | Dark/light theme, saved in `localStorage` (`theme`). |
| `setupSmoothScroll()` | Smooth scrolling for nav links. |
| `setupProjectControls()` | Search + filter by type + sort for the project cards. |
| `setupContactForm()` | Validates the contact form and shows messages. |
| `setupFadeIn()` | Fades sections in on scroll with `IntersectionObserver`. |
| `setupGithubRepos()` | Loads repos from the GitHub API and handles errors. |
| `setupVisitorName()` | Asks for, validates, saves, and greets the visitor's name. |
| `setupSectionToggle()` | Shows/hides the GitHub section and remembers the choice. |
| `setupVisitTimer()` | Shows how long the visitor has been on the page. |

## How the Features Work

### 1. API integration (GitHub)

```
GET https://api.github.com/users/SARAH-ALSUWAYBI/repos?sort=updated&per_page=6
```

1. `fetch` is called with `await` inside an `async` function.
2. `fetch` only fails on network errors, so the code also checks `response.ok`. A 403 (rate limit) or 404 is turned into an error with `throw`.
3. If the list is empty, it shows "No public repositories yet."
4. Otherwise, it builds one card per repo with `createElement` and `textContent` (not `innerHTML`, so no HTML from the API can run on the page). Each card shows the name, description (or "No description provided."), language, last update date, and a link.
5. Any error goes to `catch`. The visitor sees: *"Sorry, my GitHub projects could not be loaded right now. Please try again later."* and the details are logged to the console.

Only public repos are returned without login, so private repos are never shown.

### 2. Complex logic

**Project search + filter + sort** — one function, `updateProjects()`, runs whenever the search text, type, or sort changes:
1. **Filter:** a card is shown only if its text includes the search word **and** its `data-type` matches the selected type (or the type is "All").
2. **Sort:** cards are sorted by `data-date` (newest or oldest) or by title (`localeCompare` for A–Z), then moved into the new order with `appendChild`.
3. **Empty state:** if no card is visible, "No projects match your search or filter." is shown.

**Visitor name validation** — before saving, the name is trimmed and checked:
- empty → "Please type your name first."
- does not match `/^[A-Za-z؀-ۿ ]{2,20}$/` (2–20 English or Arabic letters) → "Use 2–20 letters only."
- otherwise → saved and the greeting is shown.

**Greeting by time of day** — before 12:00 "Good morning", before 18:00 "Good afternoon", otherwise "Good evening".

**Visit timer** — saves the start time with `Date.now()`, and every second `setInterval` calculates minutes and seconds (`padStart` turns 5 into "05"). After 60 seconds it adds "Thanks for looking around!", and after 300 seconds "Thanks for staying so long!".

**Contact form** (from Assignment 2) — name not empty, email not empty and valid, message at least 10 characters. It only submits when every check passes.

### 3. State management

| Key in `localStorage` | Values | Used by |
|---|---|---|
| `theme` | `"dark"` / `"light"` | Theme toggle |
| `visitorName` | the visitor's name | Welcome bar + contact form name |
| `reposHidden` | `"true"` / `"false"` | Show/hide button on the GitHub section |

On page load each feature reads its key and restores the page to the same state. `localStorage` only stores strings, so `reposHidden` is compared with `'true'`. "Change name" removes the key with `removeSetting`, and the form appears again.

### 4. Performance

| Change | Why |
|---|---|
| PNG → WebP, resized to display size (profile 428 KB → 11 KB, bus 261 KB → 24 KB, clinic 76 KB → 60 KB) | About 88% less image data to download |
| Old PNG files deleted | No unused files |
| `loading="lazy"` on project images | They load only when the visitor scrolls near them |
| `width` / `height` on images | The browser reserves space, so the layout doesn't jump |
| Fonts moved from CSS `@import` to `<link>` with `preconnect` | The browser starts downloading fonts earlier |
| `<script defer>` | The script doesn't block the page from rendering |
| Shared CSS rules and storage helpers | Less repeated code |

**Lighthouse results** (Chrome DevTools, desktop, run locally with Live Server on 2026-11-21):

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 99 | 100 | 96 | 100 |

## Error Handling & User Feedback

- GitHub API failure → friendly red message, no broken section.
- `localStorage` blocked → the site still works with default values (the error is only logged).
- Invalid name or form input → error under the field and a red border. The error clears when the user starts typing.
- No matching projects → empty-state message.

## Compatibility

- Uses standard features supported by current Chrome, Edge, Firefox, and Safari (`fetch`, `async/await`, WebP, `loading="lazy"`, `IntersectionObserver`).
- If `IntersectionObserver` is missing, all sections are shown without animation.
- Content is still visible if JavaScript is off (the fade-in only hides sections when JS runs).
- Responsive for phone, tablet, and desktop. Animations are turned off for users who prefer reduced motion.

## Testing

I tested in the browser and with DevTools device sizes:

| Feature | Test | Result |
|---|---|---|
| GitHub API | Page load with internet | Repos shown as cards ✅ |
| GitHub API | Wi-Fi off, then refresh | Friendly error message ✅ |
| Filter | Type = Java | Only Clinic System shown ✅ |
| Filter | Type = Web | Empty-state message ✅ |
| Sort | Newest ↔ Oldest | Cards swap order ✅ |
| Name | Empty / "S1" / "Sarah" | Two errors, then greeting ✅ |
| Name | Refresh after saving | Greeting stays, contact name filled ✅ |
| Show/hide | Hide, then refresh | Section stays hidden ✅ |
| Timer | Wait 1 minute | Count goes up, message appears ✅ |
| Theme | Switch, then refresh | Theme remembered ✅ |
| Console | All of the above | No JavaScript errors ✅ |

## Design Decisions

- **GitHub API** because it keeps the portfolio up to date without editing HTML, and it needs no API key.
- **Building cards with `textContent`** instead of `innerHTML` for safety.
- **Hiding a repo by making it private** on GitHub instead of hard-coding a list of names in the code, which keeps the code simpler.
- **One `updateProjects()` function** for search, filter, and sort, so they never conflict.
- **Storage helpers** so the `try/catch` code is written once, not in every feature.
- **No frameworks**, to keep the site small and fast and to practice plain JavaScript.

## Possible Improvements Later

- Connect the contact form to a real service so messages are actually sent.
- Add more projects (for example web projects) so the filter has more to show.
- Cache the GitHub response for a few minutes to stay under the API rate limit.

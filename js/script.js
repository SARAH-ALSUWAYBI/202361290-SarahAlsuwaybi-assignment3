// Mark that JavaScript is running (used by CSS for the fade-in effect)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupSmoothScroll();
  setupProjectControls();
  setupContactForm();
  setupFadeIn();
  setupGithubRepos();
  setupVisitorName();
  setupSectionToggle();
  setupVisitTimer();
});

/* =========================================================
   Safe localStorage helpers
   (storage can be blocked, e.g. in some private windows,
   so every read/write is wrapped in try/catch in one place)
   ========================================================= */
function loadSetting(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (error) {
    console.warn(`Could not read "${key}":`, error);
    return fallback;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Could not save "${key}":`, error);
  }
}

function removeSetting(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Could not remove "${key}":`, error);
  }
}

/* =========================================================
   Smooth scrolling for navigation links
   ========================================================= */
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href'); // e.g. "#about"
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* =========================================================
   Dark / light theme toggle saved in localStorage
   ========================================================= */
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');

  // Load the saved theme (default is dark)
  applyTheme(loadSetting('theme', 'dark'));

  // Switch theme on click and save it
  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    saveSetting('theme', next);
  });

  // Updates the page colors and the button icon
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    toggleBtn.textContent = isLight ? '🌙' : '☀️';
    toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
}

/* =========================================================
   Projects: search + filter by type + sort (work together)
   ========================================================= */
function setupProjectControls() {
  const searchInput = document.getElementById('project-search');
  const filterSelect = document.getElementById('project-filter');
  const sortSelect = document.getElementById('project-sort');
  const grid = document.querySelector('.project-grid');
  const noResults = document.getElementById('no-results');
  const cards = Array.from(document.querySelectorAll('.project-card'));

  // Runs every time any control changes
  function updateProjects() {
    const query = searchInput.value.trim().toLowerCase();
    const type = filterSelect.value;
    const sortBy = sortSelect.value;

    // Step 1: decide which cards are visible (search AND type must match)
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesSearch = card.textContent.toLowerCase().includes(query);
      const matchesType = type === 'all' || card.dataset.type === type;
      const show = matchesSearch && matchesType;
      card.hidden = !show;
      if (show) visibleCount++;
    });

    // Step 2: sort the cards and put them back in the new order
    const sorted = [...cards].sort((a, b) => {
      if (sortBy === 'az') {
        return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
      }
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    sorted.forEach((card) => grid.appendChild(card)); // appendChild moves the card to the end

    // Step 3: show the empty message only when nothing matches
    noResults.hidden = visibleCount > 0;
  }

  searchInput.addEventListener('input', updateProjects);
  filterSelect.addEventListener('change', updateProjects);
  sortSelect.addEventListener('change', updateProjects);

  updateProjects(); // apply the default sort on page load
}

/* =========================================================
   Contact form validation + confirmation message
   ========================================================= */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
  };

  // Simple email pattern: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // no backend, so stay on the page

    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const message = fields.message.value.trim();

    let isValid = true;

    // Name: must not be empty
    if (name === '') {
      showError('name', 'Please enter your name.');
      isValid = false;
    } else {
      clearError('name');
    }

    // Email: must not be empty and must look like an email
    if (email === '') {
      showError('email', 'Please enter your email.');
      isValid = false;
    } else if (!emailPattern.test(email)) {
      showError('email', 'Please enter a valid email, like name@example.com.');
      isValid = false;
    } else {
      clearError('email');
    }

    // Message: at least 10 characters
    if (message.length < 10) {
      showError('message', 'Your message should be at least 10 characters.');
      isValid = false;
    } else {
      clearError('message');
    }

    if (!isValid) {
      showStatus('Please fix the highlighted fields and try again.', 'fail');
      return;
    }

    // All good: confirm and reset the form
    showStatus(`Thank you, ${name}! Your message has been sent.`, 'success');
    form.reset();
  });

  // Remove a field's error as soon as the user starts fixing it
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener('input', () => clearError(key));
  });

  function showError(key, text) {
    fields[key].classList.add('invalid');
    document.getElementById(`${key}-error`).textContent = text;
  }

  function clearError(key) {
    fields[key].classList.remove('invalid');
    document.getElementById(`${key}-error`).textContent = '';
  }

  function showStatus(text, type) {
    status.className = '';    // reset so the animation can replay
    void status.offsetWidth;  // forces the browser to restart the animation
    status.textContent = text;
    status.className = type;
  }
}

/* =========================================================
   Fade-in sections when they scroll into view
   ========================================================= */
function setupFadeIn() {
  const sections = document.querySelectorAll('.fade-in');

  // Older browsers without IntersectionObserver: just show everything
  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('visible'));
    return;
  }

  // Watches sections and adds "visible" when they appear on screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   GitHub API: load and show my latest public repositories
   ========================================================= */
async function setupGithubRepos() {
  const status = document.getElementById('repos-status');
  const list = document.getElementById('repos-list');
  const url = 'https://api.github.com/users/SARAH-ALSUWAYBI/repos?sort=updated&per_page=6';

  try {
    const response = await fetch(url);

    // fetch only throws on network errors, so check the HTTP status too
    if (!response.ok) {
      throw new Error(`GitHub responded with status ${response.status}`);
    }

    const repos = await response.json();

    // No repos: show a friendly empty message
    if (repos.length === 0) {
      status.textContent = 'No public repositories yet.';
      return;
    }

    status.textContent = ''; // hide "Loading..."

    repos.forEach((repo) => {
      const card = document.createElement('article');
      card.className = 'repo-card';

      const title = document.createElement('h3');
      title.textContent = repo.name;

      const desc = document.createElement('p');
      desc.textContent = repo.description || 'No description provided.';

      const meta = document.createElement('p');
      meta.className = 'repo-meta';
      const updated = new Date(repo.updated_at).toLocaleDateString();
      meta.textContent = `${repo.language || 'Other'} · Updated ${updated}`;

      const link = document.createElement('a');
      link.href = repo.html_url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View on GitHub';

      card.append(title, desc, meta, link);
      list.appendChild(card);
    });
  } catch (error) {
    // User-friendly message instead of a broken section
    console.error('Could not load repositories:', error);
    status.textContent = 'Sorry, my GitHub projects could not be loaded right now. Please try again later.';
    status.classList.add('fail');
  }
}

/* =========================================================
   Visitor name: ask once, remember it, greet by time of day
   ========================================================= */
function setupVisitorName() {
  const form = document.getElementById('name-form');
  const input = document.getElementById('visitor-name');
  const error = document.getElementById('visitor-name-error');
  const greeting = document.getElementById('greeting');
  const greetingText = document.getElementById('greeting-text');
  const changeBtn = document.getElementById('change-name');
  const contactName = document.getElementById('name');

  // 2–20 letters and spaces (English or Arabic)
  const namePattern = /^[A-Za-z؀-ۿ ]{2,20}$/;

  function showGreeting(name) {
    // Different message depending on the visitor's local time
    const hour = new Date().getHours();
    let partOfDay = 'Good evening';
    if (hour < 12) {
      partOfDay = 'Good morning';
    } else if (hour < 18) {
      partOfDay = 'Good afternoon';
    }

    greetingText.textContent = `${partOfDay}, ${name}! Welcome to my portfolio.`;
    greeting.hidden = false;
    form.hidden = true;

    // Save the visitor some typing in the contact form
    if (contactName.value.trim() === '') {
      contactName.value = name;
    }
  }

  function showForm() {
    greeting.hidden = true;
    form.hidden = false;
    input.value = '';
    error.textContent = '';
    input.classList.remove('invalid');
  }

  // On load: greet a returning visitor, or ask a new one
  const savedName = loadSetting('visitorName', '');
  if (savedName) {
    showGreeting(savedName);
  } else {
    showForm();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = input.value.trim().replace(/\s+/g, ' ');

    if (name === '') {
      error.textContent = 'Please type your name first.';
      input.classList.add('invalid');
      return;
    }
    if (!namePattern.test(name)) {
      error.textContent = 'Use 2–20 letters only (no numbers or symbols).';
      input.classList.add('invalid');
      return;
    }

    saveSetting('visitorName', name);
    showGreeting(name);
  });

  // Clear the error as soon as the visitor edits the field
  input.addEventListener('input', () => {
    error.textContent = '';
    input.classList.remove('invalid');
  });

  // Forget the saved name and ask again
  changeBtn.addEventListener('click', () => {
    removeSetting('visitorName');
    showForm();
    input.focus();
  });
}

/* =========================================================
   Show / hide the GitHub section (choice is remembered)
   ========================================================= */
function setupSectionToggle() {
  const toggleBtn = document.getElementById('toggle-repos');
  const content = document.getElementById('repos-content');

  function applyVisibility(isHidden) {
    content.hidden = isHidden;
    toggleBtn.textContent = isHidden ? 'Show' : 'Hide';
    toggleBtn.setAttribute('aria-expanded', String(!isHidden));
  }

  // localStorage only stores strings, so compare with 'true'
  applyVisibility(loadSetting('reposHidden', 'false') === 'true');

  toggleBtn.addEventListener('click', () => {
    const willHide = !content.hidden;
    applyVisibility(willHide);
    saveSetting('reposHidden', String(willHide));
  });
}

/* =========================================================
   Visit timer: how long the visitor has been on the page
   ========================================================= */
function setupVisitTimer() {
  const timer = document.getElementById('visit-timer');
  const startTime = Date.now();

  function updateTimer() {
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0'); // 5 -> "05"

    // The message changes the longer the visitor stays
    let note = '';
    if (totalSeconds >= 300) {
      note = ' Thanks for staying so long!';
    } else if (totalSeconds >= 60) {
      note = ' Thanks for looking around!';
    }

    timer.textContent = `You've been here for ${minutes}:${seconds}.${note}`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

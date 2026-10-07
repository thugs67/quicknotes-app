// DOM Element Selection

const noteText = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

// LocalStorage Keys
const DRAFT_STORAGE_KEY = "notes_toolkit_draft";
const THEME_STORAGE_KEY = "notes_toolkit_theme";

// Helper Functions

function updateCounts() {
  const text = noteText.value;
  const numChars = text.length;

  // Calculate word count (splitting by whitespace and ignoring empty strings)
  const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
  const numWords = words.length;

  // Update text content
  charCount.textContent = `${numChars} / 200 characters`;
  wordCount.textContent = `${numWords} ${numWords === 1 ? "word" : "words"}`;

  // Reset classes on char-count
  charCount.classList.remove("warning", "over");

  // Apply warning (> 180 chars) or over (> 200 chars) classes
  if (numChars > 200) {
    charCount.classList.add("over");
  } else if (numChars > 180) {
    charCount.classList.add("warning");
  }
}

function handleInput() {
  updateCounts();
  localStorage.setItem(DRAFT_STORAGE_KEY, noteText.value);
}

function clearAll() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_STORAGE_KEY);
  updateCounts();
  noteText.focus();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
}

function init() {
  // Restore theme preference
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "Dark mode";
  }

  // Restore saved draft text
  const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (savedDraft !== null) {
    noteText.value = savedDraft;
  }

  // Initial calculation for restored content
  updateCounts();
}

//Event Listeners

// Input event for live counting and autosaving
noteText.addEventListener("input", handleInput);

// Clear button click event
clearBtn.addEventListener("click", clearAll);

// Theme toggle click event
themeToggle.addEventListener("click", toggleTheme);

// Keyboard shortcut: Pressing Escape inside the textarea clears it
noteText.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearAll();
  }
});

// Initialize app on load
init();

// DOM Element Selection

const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Key used for saving data in browser storage

const LOCAL_STORAGE_KEY = "notes-toolkit-app-notes";

// Application State (Loaded from LocalStorage)

let notes = loadNotes();

// LocalStorage Helper Functions

function loadNotes() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error("Failed to parse notes from localStorage:", e);
      return [];
    }
  }

    // Default seed notes if running for the first time

    return [
    { id: 1, text: "Buy groceries for dinner", category: "personal", createdAt: new Date().toISOString() },
    { id: 2, text: "Finish quarterly report", category: "work", createdAt: new Date().toISOString() },
    { id: 3, text: "Read Chapter 4 of JavaScript book", category: "study", createdAt: new Date().toISOString() }
  ];
}

function saveNotes() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

//Render Function (Safely Rebuilds DOM)

function render() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  // Filter notes based on search keyword
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  // Clear existing list items safely
  notesList.textContent = "";
  // Update note counter message with proper pluralization
  updateNoteCount(filteredNotes.length, notes.length);

  // Render filtered list items
  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    // Note content wrapper
    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";

    const textParagraph = document.createElement("p");
    textParagraph.textContent = note.text; // XSS-safe text rendering

    const metaSmall = document.createElement("small");
    const dateFormatted = new Date(note.createdAt).toLocaleDateString();
    metaSmall.textContent = `Category: ${note.category} | Created: ${dateFormatted}`;

    contentDiv.appendChild(textParagraph);
    contentDiv.appendChild(metaSmall);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", `Delete note: ${note.text}`);

    // Event listener for note deletion
    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

// Formats and updates the note count text for zero, one, and many notes.

function updateNoteCount(filteredCount, totalCount) {
  if (totalCount === 0) {
    noteCount.textContent = "0 notes";
    return;
  }

  const isFiltered = searchInput.value.trim() !== "";
  
  if (isFiltered) {
    const countText = filteredCount === 1 ? "1 note" : `${filteredCount} notes`;
    noteCount.textContent = `Showing ${countText} (filtered from ${totalCount} total)`;
  } else {
    noteCount.textContent = totalCount === 1 ? "1 note" : `${totalCount} notes`;
  }
}

// Features (Add, Delete, Search)

// Validates inputs and adds a new note object.

function addNote(text, category) {
  // Clear any active error message
  errorMessage.textContent = "";

  const trimmedText = text.trim();

  // Validation: Empty text
  if (trimmedText.length === 0) {
    errorMessage.textContent = "Error: Note text cannot be empty.";
    return false;
  }

  // Validation: Exceeds 200 characters
  if (trimmedText.length > 200) {
    errorMessage.textContent = `Error: Note cannot exceed 200 characters (currently ${trimmedText.length} characters).`;
    return false;
  }

  // Create new note object
  const newNote = {
    id: Date.now(), // Unique ID based on timestamp
    text: trimmedText,
    category: category,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  saveNotes();
  render();
  return true;
}

// Deletes a note by its ID and refreshes storage and UI.

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Event Listeners

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const success = addNote(noteInput.value, noteCategory.value);
  if (success) {
    noteInput.value = ""; // Reset input field on successful addition
    noteInput.focus();
  }
});

// Real-time search handler
searchInput.addEventListener("input", () => {
  render();
});

// 7. Initial Render Execution
render();

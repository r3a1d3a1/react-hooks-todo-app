import React from "react";

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
  todos: [
    // Initial Data
    { title: "Buy milk", completed: false, tags: [1] },
    { title: "Some eggs", completed: false, tags: [1] },
    { title: "Go to work", completed: false, tags: [] },
    { title: "Blah blah", completed: false, tags: [0,1] }
  ],
  tags: [
    "Home", "Shopping"
  ],
  show_completed: false,
  show_tags: false
});

export default Store;

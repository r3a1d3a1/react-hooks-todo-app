import React from "react";

// Store Context is the global context that is managed by reducers.

const Store = React.createContext({
  todos: [
    // Initial Data
    { title: "Buy milk", completed: false },
    { title: "Some eggs", completed: false },
    { title: "Go to work", completed: false }
  ],
  show_completed: false
});

export default Store;

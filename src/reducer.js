export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate
      if (state.todos.map(x => x.title).includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        todos: [...state.todos, {title: action.payload, completed: false}]
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: [...state.todos.filter(t => t !== action.payload), {title: action.payload.title, completed: !action.payload.completed}]
      };
    case "TOGGLE_COMPLETED_VISIBILITY":
      return {
        ...state,
        show_completed: !state.show_completed
      };
    default:
      return state;
  }
}

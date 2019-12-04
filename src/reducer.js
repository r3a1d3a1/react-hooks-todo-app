export default function reducer(state, action) {
  let x;
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
        todos: [...state.todos, {title: action.payload, completed: false, tags: []}]
      };
    case "ADD_TAG":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate
      if (state.tags.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        tags: [...state.tags, action.payload]
      };
    case "TOGGLE_COMPLETE":
      x = [...state.todos];
      for( let i=0; i< x.length; ++i ){
        if( x[i].title === action.payload ){
          x[i].completed = !x[i].completed;
          break;
        }
      }
      return {
        ...state,
        todos: x
      };
    case "CHANGE_TODO_TAGS":
      x = [...state.todos];
      x[action.payload.selected_idx].tags = action.payload.tags;
      return {
        ...state,
        todos: x
      };
    case "TOGGLE_COMPLETED_VISIBILITY":
      return {
        ...state,
        show_completed: !state.show_completed
      };
    case "TOGGLE_TAGS_VISIBILITY":
      return {
        ...state,
        show_tags: !state.show_tags,
        selected_todo_idx: action.payload
      };
    default:
      return state;
  }
}

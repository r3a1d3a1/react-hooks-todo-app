import React, { useContext } from "react";
import Store from "../context";
import { TodoHeader } from "./TodoHeader";

export default function TodoList() {
  const { state, dispatch } = useContext(Store);

  const pluralize = count =>
    count > 1 ? `There are ${count} todos.` : `There is ${count} todo.`;

  let header =
    state.todos.length === 0 ? (
      <h4>Yay! All todos are done! Take a rest!</h4>
    ) : (
      <TodoHeader>
        <span className="float-right">{pluralize(state.todos.length)}</span>
      </TodoHeader>
    );
  let toggle_completed_visibility_label =
    state.show_completed ? "Hide completed" : "Show completed";
  let completed_section = 
    !state.show_completed ? null : (
      <div>
      <div style={{ marginTop: 20, marginBottom:10 }}> Completed: </div>
      <ul className="list-group">
        {state.todos.filter(t => t.completed === true).map(t => (
          <li key={t.title} className="list-group-item" style={{backgroundColor: "lightGray"}}>
            {t.title}
            <button
              className="float-right btn-default btn-sm"
              style={{ marginLeft: 10 }}
              onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: t.title })}
            >
              Not Complete
            </button>
          </li>
        ))}
      </ul>
      </div>
    );

  const hasCompletedTodos = state.todos.find(x => x.completed);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <br />
            {header}
          </div>
        </div>
        { hasCompletedTodos &&
          <div className="row">
            <div className="col-md-12">
              <button
                className="float-right btn-info"
                style={{ marginBottom: 12 }}
                onClick={() => dispatch({ type: "TOGGLE_COMPLETED_VISIBILITY" })}
              >
                {toggle_completed_visibility_label}
              </button>
            </div>
          </div>
        }
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {state.todos
                .filter(t => t.completed === false)
                .map(t => (
                  <li key={t.title} className="list-group-item">
                    <div className="row">
                      <div className="col-md-6">{t.title}</div>
                      <div className="col-md-3">
                        {tags(state.todos.indexOf(t))}
                      </div>
                      <div className="col-md-3">
                        <button
                          className="float-right btn-danger btn-sm"
                          style={{ marginLeft: 10 }}
                          onClick={() =>
                            dispatch({ type: "TOGGLE_COMPLETE", payload: t.title })
                          }
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            { hasCompletedTodos && completed_section }
          </div>
        </div>
      </div>
    </div>
  );
}

function tags( todoIdx ){
  const { state, dispatch } = useContext(Store);
  const list = state.todos[todoIdx].tags

  if (list.length === 0){
    return (
      <button 
        className="btn-link btn-sm"
        onClick={() =>
          dispatch({ type: "TOGGLE_TAGS_VISIBILITY", payload: todoIdx })
        }
      >
        Add tags
      </button>
    );
  }

  return (
    <div>
    {list.map( tagUID => 
      <button 
        key={tagUID}
        className="btn-info btn-sm" 
        style={{ marginRight: 3 }}
      >
        {state.tags[tagUID]}
        <div
          className="btn btn-sm"
          style={{ marginRight: -7, marginTop: -2, color: "red", backgroundColor: "transparent" }}
          onClick={() =>
            dispatch({ type: "CHANGE_TODO_TAGS", payload: {selected_idx: todoIdx, tags: state.todos[todoIdx].tags.filter(x => x !== tagUID) } })
          }
        >
          🅧
        </div>
      </button>
    )}
    <button 
      className="btn btn-lg" 
      style={{ marginLeft: -10, backgroundColor: "transparent" }}
      onClick={() =>
        dispatch({ type: "TOGGLE_TAGS_VISIBILITY", payload: todoIdx })
      }
    > + </button>
    </div>
  );
}

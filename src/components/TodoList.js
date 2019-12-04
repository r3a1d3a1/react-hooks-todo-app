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
              onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: t })}
            >
              Not Complete
            </button>
          </li>
        ))}
      </ul>
      </div>
    );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <br />
            {header}
          </div>
        </div>
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
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {state.todos.filter(t => t.completed === false).map(t => (
                <li key={t.title} className="list-group-item">
                  {t.title}
                  <button
                    className="float-right btn-danger btn-sm"
                    style={{ marginLeft: 10 }}
                    onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: t })}
                  >
                    Complete
                  </button>
                </li>
              ))}
            </ul>
            {completed_section}
          </div>
        </div>
      </div>
    </div>
  );
}

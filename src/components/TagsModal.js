import React, { useContext } from "react";
import Store from "../context";
import TagForm from "./TagForm";

export default function TagsModal() {
  const { state, dispatch } = useContext(Store);

  let formattedTags = [];
  const todoIdx = state.selected_todo_idx;

  for( let i=0; i< state.tags.length; ++i){
	  let text = "";
	  if( state.todos[todoIdx].tags.includes(i) )
		 text += "✅ "
	  text += state.tags[i];
	  formattedTags.push(text);
  }

  return (
	<div className="tagsModal text-center">
		<ul className="list-group">
			{formattedTags
			.map((t,tagUID) => (
				<li key={t} className="list-group-item" onClick={()=>{
          let newTags;
          if( t.startsWith("✅ "))
            newTags = state.todos[todoIdx].tags.filter(x => x !== tagUID);
          else
            newTags = [...state.todos[todoIdx].tags, tagUID];
          dispatch({ type: "CHANGE_TODO_TAGS", payload: {selected_idx: todoIdx, tags: newTags} });
				}}>
					{t}
				</li> ))
			}
		</ul>
    <TagForm />
		<button className="btn-default btn-sm" style={{marginTop: 25}} onClick={()=>dispatch({ type: "TOGGLE_TAGS_VISIBILITY" })}>Close</button>
  	</div>
  );
}

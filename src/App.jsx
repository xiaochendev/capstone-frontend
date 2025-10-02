import './App.css'
import { useReducer, useState } from "react"
import TextInput from "./components/TextInput.jsx"
import ActionButton from "./components/ActionButton.jsx"
import ListsItem from "./components/ListsItem.jsx"
import ListsReducer from "./components/ListsReducer.jsx"

// 1. A heading labeling it as a "todo list."
// 2. A list of "todo" items, which are strings listing activities to be accomplished (e.g. "find that missing sock"). Each "todo" item should have:
    // 1. A checkbox next to it which indicates whether it is "complete."
    // 2. A "delete" button next to it which removes it from the list.
        // - The "delete" button should be disabled unless the todo is complete!
    // 3. An "edit" button that replaces the todo string with a text input used to edit the todo.
        // - Hint: bind the value of this text input to a piece of state so that it is always accurate, even when first displayed!
        // - When this text input is active, the "delete" and "edit" buttons should be hidden, and a "save" button should appear. The "save" button should save any changes made to the todo within the text input.
// 3. An input element that creates new todo items and adds them to the list.
// 4. New todos should be added to the top of the list visually; the oldest todos should be at the bottom.

export default function App() {
  const [todos, setTodos] = useState("");
  const [lists, dispatch] = useReducer(ListsReducer, initialState);
  const [filter, setFilter] = useState("all");    // all | active | completed filter

  // const todosList = lists.map((item) => {
  //   return (
  //     <ListsItem key={item.id} item={item} dispatch={dispatch} />
  //   );
  // });

  // use filteredTodo instead
  const filteredTodos = lists.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const todosList = filteredTodos.map((item) => (
    <ListsItem key={item.id} item={item} dispatch={dispatch} />
  ));

  return (
    <>
      <h1>To Do List</h1>
      <div>
        <TextInput state={todos} setState={setTodos} />
        <ActionButton
          type="add_todo"
          payload={{ todos }}
          dispatch={dispatch}
        >
          Add New Todo
        </ActionButton>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>  <br /> 

      <div> 
        {todosList}
      </div>
    </>
  );
}

const initialState = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  },
  {
    "userId": 1,
    "id": 11,
    "title": "vero rerum temporibus dolor",
    "completed": true
  },
  {
    "userId": 1,
    "id": 12,
    "title": "ipsa repellendus fugit nisi",
    "completed": true
  },
  {
    "userId": 1,
    "id": 13,
    "title": "et doloremque nulla",
    "completed": false
  },
  {
    "userId": 1,
    "id": 14,
    "title": "repellendus sunt dolores architecto voluptatum",
    "completed": true
  },
  {
    "userId": 1,
    "id": 15,
    "title": "ab voluptatum amet voluptas",
    "completed": true
  },
  {
    "userId": 1,
    "id": 16,
    "title": "accusamus eos facilis sint et aut voluptatem",
    "completed": true
  },
  {
    "userId": 1,
    "id": 17,
    "title": "quo laboriosam deleniti aut qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 18,
    "title": "dolorum est consequatur ea mollitia in culpa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 19,
    "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "completed": true
  },
  {
    "userId": 1,
    "id": 20,
    "title": "ullam nobis libero sapiente ad optio sint",
    "completed": true
  }
];

import { useEffect, useState } from "react";
import { TodoItem } from "./@types/Type.todoitem";

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>(
    localStorage.getItem("todoList")
      ? // @ts-expect-error - error expected
        JSON.parse(localStorage.getItem("todoList"))
      : []
  );
  const [newTodo, setNewTodo] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.trim().length === 0) {
      alert("Please enter a value!");
      return;
    }

    const newTodoItem: TodoItem = {
      id: Date.now(),
      text: newTodo,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodoItem]);
    setNewTodo("");
  };

  const handleChangeChecked = (todo: TodoItem) => {
    // index of the todo
    const index = todoList.indexOf(todo);
    // change todo completed status
    todo.isCompleted = !todo.isCompleted;
    // then we need to replace it with one in todoList
    todoList.splice(index, 1, todo);
    // update the state
    setTodoList([...todoList]);
  };

  const handleDelete = (id: number) => {
    // find index of todo from id
    const index = todoList.findIndex((todo) => todo.id === id);

    // remove todo
    todoList.splice(index, 1);

    // update the state
    setTodoList([...todoList]);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="flex-col justify-center ">
      <h1 className="text-cyan-600 text-center text-5xl pt-6 hover:cursor-pointer hover:underline">
        todo-list
      </h1>
      <form onSubmit={handleFormSubmit} className="text-center pt-6">
        <input
          type="text"
          name="newTodo"
          onChange={handleInput}
          className="border-2 border-gray-700 w-[400px]"
          placeholder="write your task"
          value={newTodo ? newTodo : ""}
        />
        <button type="submit" className="bg-lime-400 p-1 ml-2">
          Submit
        </button>
      </form>
      <ul>
        {todoList.map((todo) => (
          <li className="flex justify-center gap-3 pt-4" key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleChangeChecked(todo)}
            />
            <p className="font-semibold text-lg">{todo.text}</p>
            <button
              className="bg-red-600 p-1"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

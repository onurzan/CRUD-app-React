import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/Todo";
import Modal from "./components/Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState({});

  //add buttons function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText) {
      toast.warn("*Fill the blank", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // necessary info for todos in an object
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date().toLocaleString(),
      isDone: false,
    };

    //transfering todos object to states
    setTodos([...todos, newTodo]);

    //reset form
    setTodoText("");
  };

  // delete action
  // matching id
  const handleDelete = (deletedTodo) => {
    const filtered = todos.filter((item) => item.id !== deletedTodo.id);
    setTodos(filtered);

    toast.error("*Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // done button
  // finding index , reverse isDone value, edited vers
  const handleDone = (todo) => {
    const index = todos.findIndex((item) => item.id === todo.id);

    const newValue = !todos[index].isDone;
    const changedTodo = { ...todo, isDone: newValue };

    const newTodos = [...todos];

    newTodos.splice(index, 1, changedTodo);

    setTodos(newTodos);
  };

  // clicking to edit-save button refreshing with the new one
  const handleSaveEdit = () => {
    console.log(editingTodo);
    //the form is empty, modal is alerting
    if (!editingTodo.title) {
      toast.warn("*Requirements", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    //changing the index with splice method
    let index = todos.findIndex((item) => item.id === editingTodo.id);

    // create a todos copies
    const cloneTodos = [...todos];

    //replacing with new todos
    cloneTodos.splice(index, 1, editingTodo);

    // refreshed the printscreen
    setTodos(cloneTodos);

    //closing modal
    setShowModal(false);

    //updating modal
    toast.success("*Updated", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="bg-dark">CRUD APP</h1>
      <div className="container border p-4 mt-4">
        <form onClick={handleSubmit} className="d-flex gap-3">
          <input
            className="form-control"
            type="text"
            placeholder="Enter your value.."
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          <button className="btn btn-secondary btn-lg">ADD</button>
        </form>

        <div className="d-flex flex-column gap-3 py-5">
          {/* if input value is empty */}
          {todos.length === 0 && (
            <h4 className="text-center">There is "No Event".</h4>
          )}
          {/* if state has to element, print screen */}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              handleDelete={handleDelete}
              todo={todo}
              handleDone={handleDone}
              setShowModal={setShowModal}
              setEditingTodo={setEditingTodo}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <Modal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          setShowModal={setShowModal}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;

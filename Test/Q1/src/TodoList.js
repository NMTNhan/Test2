import { useState, useEffect } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";


const TodoList = () => {
  const [tasks, setTasks] = useState([]);


  // 3. Store the task
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 4. calculating day left
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTaskTitle = formData.get("task");
    const newDueDate = formData.get("dueDate");
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      done: false,
      dueDate: newDueDate // Add the dueDate property
    };
    setTasks([...tasks, newTask]);
    event.target.reset();
  };

  // 1. Toggle complete
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      <form className="form" onSubmit={handleSubmit}>
        <input name="task" placeholder="Enter task ..." />
        <input type="date" name="dueDate" /> {/* Due date */}
        <button type="submit">Submit</button>
      </form>
      {tasks.map(task => (
        <div key={task.id} className={`todo-item-container ${task.done ? 'done' : ''}`}>
          {task.done ? (
            <FaRegCheckCircle className="item-done-button" color="#9a9a9a" onClick={() => toggleTaskCompletion(task.id)} />
          ) : (
            <FaRegCircle className="item-done-button" color="#9a9a9a" onClick={() => toggleTaskCompletion(task.id)} />
          )}
          <div className="item-title">
            {task.title}
            {task.dueDate && (
              <span> - Due in {calculateDaysLeft(task.dueDate)} days</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

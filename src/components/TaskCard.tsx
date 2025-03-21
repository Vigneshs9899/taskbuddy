const TaskCard = ({ task }: { task: { title: string; category: string; dueDate: string } }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.category}</p>
        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      </div>
    );
  };
  
  export default TaskCard;
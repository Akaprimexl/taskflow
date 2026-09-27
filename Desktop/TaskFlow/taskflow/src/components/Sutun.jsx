import TaskKart from "./TaskKart";

function Sutun({
  title,
  tasks,
}) {
  return (
    <section className="column">
      <div className="column-header">
        <h3>{title}</h3>

        <span>
          {tasks.length}
        </span>
      </div>

      <div className="column-content">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <p>
              Bu sütunda vəzifə yoxdur
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskKart
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Sutun;

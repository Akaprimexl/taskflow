import useTaskStore from "../store/useTaskStore";

const priorityNames = {
  asagi: "Aşağı",
  orta: "Orta",
  yuksek: "Yüksək",
};

function TaskKart({ task }) {
  const removeTask = useTaskStore(
    (state) => state.removeTask
  );

  const updateTaskStatus = useTaskStore(
    (state) => state.updateTaskStatus
  );

  const handleDelete = () => {
    const confirmed = window.confirm(
      `"${task.basliq}" tapşırığını silmək istəyirsiniz?`
    );

    if (confirmed) {
      removeTask(task.id);
    }
  };

  return (
    <article className="task-card">
      <div className="task-card-top">
        <h4>{task.basliq}</h4>

        <button
          type="button"
          className="task-delete"
          onClick={handleDelete}
        >
          ×
        </button>
      </div>

      {task.tesvir && (
        <p className="task-description">
          {task.tesvir}
        </p>
      )}

      <div className="task-info">
        <span
          className={`priority priority-${task.prioritet}`}
        >
          {priorityNames[task.prioritet]}
        </span>
      </div>

      <div className="task-actions">
        {task.status !== "edilecek" && (
          <button
            onClick={() =>
              updateTaskStatus(
                task.id,
                "edilecek"
              )
            }
          >
            Ediləcək
          </button>
        )}

        {task.status !== "icrada" && (
          <button
            onClick={() =>
              updateTaskStatus(
                task.id,
                "icrada"
              )
            }
          >
            İcraya keçir
          </button>
        )}

        {task.status !== "bitdi" && (
          <button
            onClick={() =>
              updateTaskStatus(
                task.id,
                "bitdi"
              )
            }
          >
            Bitir
          </button>
        )}
      </div>
    </article>
  );
}

export default TaskKart;

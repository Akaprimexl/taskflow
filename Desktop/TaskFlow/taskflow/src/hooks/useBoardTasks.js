import { useMemo } from "react";

import useTaskStore from "../store/useTaskStore";

function useBoardTasks(boardId) {
  const tasks = useTaskStore(
    (state) => state.tasks
  );

  const boardTasks = useMemo(() => {
    return tasks.filter(
      (task) => task.boardId === boardId
    );
  }, [tasks, boardId]);

  const statistics = useMemo(() => {
    const total = boardTasks.length;

    const edilecek = boardTasks.filter(
      (task) => task.status === "edilecek"
    ).length;

    const icrada = boardTasks.filter(
      (task) => task.status === "icrada"
    ).length;

    const bitdi = boardTasks.filter(
      (task) => task.status === "bitdi"
    ).length;

    const completion =
      total === 0
        ? 0
        : Math.round((bitdi / total) * 100);

    return {
      total,
      edilecek,
      icrada,
      bitdi,
      completion,
    };
  }, [boardTasks]);

  return {
    tasks: boardTasks,
    statistics,
  };
}

export default useBoardTasks;

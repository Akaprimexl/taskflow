import { useMemo } from "react";

import {
  Link,
  useParams,
  useSearchParams,
} from "react-router";

import TaskForma from "../components/TaskForma";
import Sutun from "../components/Sutun";

import useBoardStore from "../store/useBoardStore";
import useBoardTasks from "../hooks/useBoardTasks";

function BoardDetal() {
  const { id } = useParams();

  const boards = useBoardStore(
    (state) => state.boards
  );

  const board = boards.find(
    (item) => item.id === id
  );

  const {
    tasks,
    statistics,
  } = useBoardTasks(id);

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const search =
    searchParams.get("search") || "";

  const priority =
    searchParams.get("prioritet") ||
    "hamisi";

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.basliq
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesPriority =
        priority === "hamisi" ||
        task.prioritet === priority;

      return (
        matchesSearch &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    priority,
  ]);

  const handleSearch = (value) => {
    const params = new URLSearchParams(
      searchParams
    );

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const handlePriority = (value) => {
    const params = new URLSearchParams(
      searchParams
    );

    if (value === "hamisi") {
      params.delete("prioritet");
    } else {
      params.set(
        "prioritet",
        value
      );
    }

    setSearchParams(params);
  };

  if (!board) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>
            Lövhə tapılmadı
          </h1>

          <p>
            Bu lövhə mövcud deyil.
          </p>

          <Link
            to="/"
            className="primary-button"
          >
            Lövhələrə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const edilecek = filteredTasks.filter(
    (task) =>
      task.status === "edilecek"
  );

  const icrada = filteredTasks.filter(
    (task) =>
      task.status === "icrada"
  );

  const bitdi = filteredTasks.filter(
    (task) =>
      task.status === "bitdi"
  );

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link to="/">
          Lövhələr
        </Link>

        <span>/</span>

        <strong>
          {board.ad}
        </strong>
      </div>

      <header className="board-header">
        <div>
          <span className="eyebrow">
            Lövhə
          </span>

          <h1>{board.ad}</h1>
        </div>
      </header>

      <section className="statistics">
        <div>
          <span>Ümumi</span>
          <strong>
            {statistics.total}
          </strong>
        </div>

        <div>
          <span>Ediləcək</span>
          <strong>
            {statistics.edilecek}
          </strong>
        </div>

        <div>
          <span>İcrada</span>
          <strong>
            {statistics.icrada}
          </strong>
        </div>

        <div>
          <span>Bitdi</span>
          <strong>
            {statistics.bitdi}
          </strong>
        </div>

        <div>
          <span>Tamamlanma</span>
          <strong>
            {statistics.completion}%
          </strong>
        </div>
      </section>

      <div className="task-layout">
        <TaskForma boardId={id} />

        <div className="tasks-section">
          <div className="filters">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                handleSearch(
                  event.target.value
                )
              }
              placeholder="Vəzifə axtar..."
            />

            <select
              value={priority}
              onChange={(event) =>
                handlePriority(
                  event.target.value
                )
              }
            >
              <option value="hamisi">
                Bütün prioritetlər
              </option>

              <option value="yuksek">
                Yüksək
              </option>

              <option value="orta">
                Orta
              </option>

              <option value="asagi">
                Aşağı
              </option>
            </select>
          </div>

          <div className="columns">
            <Sutun
              title="Ediləcək"
              tasks={edilecek}
            />

            <Sutun
              title="İcrada"
              tasks={icrada}
            />

            <Sutun
              title="Bitdi"
              tasks={bitdi}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardDetal;

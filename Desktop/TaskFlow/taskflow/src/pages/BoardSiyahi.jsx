import { useState } from "react";

import BoardKart from "../components/BoardKart";

import useBoardStore from "../store/useBoardStore";

function BoardSiyahi() {
  const boards = useBoardStore(
    (state) => state.boards
  );

  const addBoard = useBoardStore(
    (state) => state.addBoard
  );

  const removeBoard = useBoardStore(
    (state) => state.removeBoard
  );

  const [boardName, setBoardName] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = boardName.trim();

    if (!name) {
      return;
    }

    addBoard(name);

    setBoardName("");
  };

  const handleDelete = (id) => {
    removeBoard(id);
  };

  return (
    <div className="container">
      <section className="hero">
        <span className="eyebrow">
          TaskFlow
        </span>

        <h1>
          Vəzifələrinizi
          <br />
          idarə edin
        </h1>

        <p>
          Layihələrinizi lövhələr
          üzərindən rahat şəkildə
          idarə edin.
        </p>
      </section>

      <section className="create-board">
        <h2>
          Yeni lövhə yarat
        </h2>

        <form
          onSubmit={handleSubmit}
          className="board-form"
        >
          <input
            type="text"
            value={boardName}
            onChange={(event) =>
              setBoardName(
                event.target.value
              )
            }
            placeholder="Lövhənin adı..."
          />

          <button
            type="submit"
            className="primary-button"
          >
            + Lövhə yarat
          </button>
        </form>
      </section>

      <section>
        <div className="section-header">
          <h2>
            Lövhələriniz
          </h2>

          <span>
            {boards.length} lövhə
          </span>
        </div>

        {boards.length === 0 ? (
          <div className="empty-state">
            <h3>
              Hələ lövhə yoxdur
            </h3>

            <p>
              İlk lövhənizi yaradın.
            </p>
          </div>
        ) : (
          <div className="boards-grid">
            {boards.map((board) => (
              <BoardKart
                key={board.id}
                board={board}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BoardSiyahi;

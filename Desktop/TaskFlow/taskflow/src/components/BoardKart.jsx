import { Link } from "react-router";

function BoardKart({
  board,
  onDelete,
}) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `"${board.ad}" lövhəsini silmək istəyirsiniz?`
    );

    if (confirmed) {
      onDelete(board.id);
    }
  };

  return (
    <article className="board-card">
      <Link
        to={`/board/${board.id}`}
        className="board-link"
      >
        <div className="board-icon">
          📋
        </div>

        <h3>{board.ad}</h3>

        <p>
          {new Date(
            board.tarix
          ).toLocaleDateString("az-AZ")}
        </p>
      </Link>

      <button
        type="button"
        className="delete-button"
        onClick={handleDelete}
      >
        Sil
      </button>
    </article>
  );
}

export default BoardKart;

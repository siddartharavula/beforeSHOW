const CommentBox = ({
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
  loading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-1 grid w-full grid-cols-[5fr_2fr] gap-1 rounded-2xl border border-gray-800 bg-gray-900 p-2 sm:grid-cols-[7fr_1fr]"
    >
      {/* COMMENT */}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        rows={2}
        maxLength={500}
        className="h-full w-full resize-none rounded-xl bg-gray-950 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:ring-1 focus:ring-green-500 sm:px-4"
      />

      {/* RATING + BUTTON */}

      <div className="grid grid-rows-2 gap-2">

        <input
          type="number"
          min="1"
          max="10"
          step="0.01"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rate"
          required
          className="w-full min-w-0 rounded-xl bg-gray-950 px-2 py-2 text-center text-xs text-white outline-none focus:ring-1 focus:ring-green-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none sm:px-3 sm:text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full min-w-0 rounded-xl bg-green-500 px-1 text-xs font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          {loading ? "..." : "Comment"}
        </button>

      </div>
    </form>
  );
};

export default CommentBox;
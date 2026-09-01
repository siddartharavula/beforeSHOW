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
      className="mt-1 grid w-full grid-cols-[7fr_1fr] gap-1 rounded-2xl border border-gray-800 bg-gray-900 p-2"
    >
      {/* COMMENT - 7/8 */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        rows={2}
        maxLength={500}
        className="h-full w-full resize-none rounded-xl bg-gray-950 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:ring-1 focus:ring-green-500"
      />

      {/* RATING + BUTTON - 1/8 */}
      <div className="grid grid-rows-2 gap-2">
        <input
          type="number"
          min="1"
          max="10"
          step="0.01"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rate Here"
          required
          className="w-full rounded-xl bg-gray-950 px-3 py-2 text-center text-sm text-white outline-none focus:ring-1 focus:ring-green-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-500 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "..." : "Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentBox;

export default function GoalDetail({
  selectedGoal,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <div className="input-group vertical container">
      <p>{selectedGoal.title}</p>
      <div className="row fluid">
        <button onClick={handleEditClick} className="tertiary col-sm">
          Edit
        </button>
        <button onClick={handleDeleteClick} className="secondary col-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

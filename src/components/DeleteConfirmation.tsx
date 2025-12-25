interface DeleteConfirmationProps {
  handleDeleteConfirm: () => void;
  handleDeleteCancel: () => void;
}

export default function DeleteConfirmation({
  handleDeleteConfirm,
  handleDeleteCancel,
}: DeleteConfirmationProps) {
  return (
    <div>
      <p>Are you sure you want to delete this goal?</p>
      <button onClick={handleDeleteConfirm} className="secondary">
        Yes
      </button>
      <button onClick={handleDeleteCancel}>Cancel</button>
    </div>
  );
}

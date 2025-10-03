type ModalProps = {
  handleCancel: () => void;
  handleConfirm: () => void;
};

export const ModalDelete: React.FC<ModalProps> = ({
  handleCancel,
  handleConfirm,
}) => {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <p>Checkout is not implemented yet. Do you want to clear the Cart?</p>
        <div className="custom-modal-buttons">
          <button onClick={handleConfirm}>Yes, clear cart</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

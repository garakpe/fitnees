import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
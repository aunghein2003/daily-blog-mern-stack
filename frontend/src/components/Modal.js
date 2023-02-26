function Modal({ children, isOpen, onClose }) {
  const open = isOpen ? "block" : "hidden";

  return (
    <div
      className={`fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-zinc-600 opacity-90 flex justify-center items-center ${open}`}
    >
      <div className="my-[8%] max-w-max max-h-max p-5 mx-auto bg-white rounded-md">
        {children}
      </div>
      <div
        className="absolute top-6 right-6 px-4 py-2 font-bold text-xl cursor-pointer
        text-white hover:bg-gray-500"
        onClick={onClose}
      >
        X
      </div>
    </div>
  );
}

export default Modal;

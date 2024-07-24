import React from "react";
 
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center">
            <div className="bg-white h-auto  min-w-80  p-3 rounded border-2 z-10 gap-3">
                {children}
                <div className="flex justify-end mr-2">
                    <div onClick={onClose} className="bg-red-400 pl-3 pr-3 hover:bg-slate-50 active:scale-150 hover:cursor-pointer transition-transform">Close</div>
                </div>
            </div>
        </div>
    );
};
 
export default Modal;
import React, { FC, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Modal component implemented via React portal. Manages focus and ESC/overlay closing.
 */
export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  const dialogRef = useRef<HTMLDivElement>(null);

  // handle ESC key closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // manage focus on open/close
  useEffect(() => {
    const previousFocused = document.activeElement as HTMLElement | null;
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
    return () => {
      previousFocused?.focus();
    };
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 300 }}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};


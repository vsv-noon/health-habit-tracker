import { createPortal } from 'react-dom';

import './Modal.css';
import useEscapeKey from '../../hooks/useEscapeKey';
import useCtrlEnterKey from '../../hooks/useCtrlEnterKey';
import type { ModalProps } from './types';
import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, onConfirm, customClassName, children }: ModalProps) {
  const portalRoot = document.getElementById('modal-root');

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEscapeKey(onClose);
  useCtrlEnterKey(onConfirm);

  // lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // focus trap
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const focusable = contentRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusable.length > 0) {
      focusable[1].focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const onOverlayMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !portalRoot) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onMouseDown={onOverlayMouseDown}
    >
      <div
        ref={contentRef}
        className={`modal-content ${customClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    portalRoot,
  );
}

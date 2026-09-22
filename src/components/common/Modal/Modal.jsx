import { useEffect, useRef } from 'react'
import './Modal.css'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
  showCloseButton = true
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  if (!isOpen) return null

  const classNames = ['modal-container', `modal-container--${size}`, className].filter(Boolean).join(' ')

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick} aria-hidden="true"></div>
      <div
        className={classNames}
        ref={modalRef}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {showCloseButton && (
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        )}
        {title && <h2 id="modal-title" className="modal-title">{title}</h2>}
        <div className="modal-content">{children}</div>
      </div>
    </>
  )
}
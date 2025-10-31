// components/Modal.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-50 p-5"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-primary rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute button button--circle border bg-secondary -top-3 -right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          <X />
        </button>
        {/** Title */}
        {title && (
          <div className="font-bold p-5 border-b border-border">{title}</div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal

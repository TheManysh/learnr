import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, header, length, author }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const transformStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={transformStyle}
      className={`border p-4 rounded-xl shadow-md cursor-pointer transition-transform 
        ${isDragging ? 'z-50 bg-gray-100' : 'bg-white'}`}
      {...attributes}
      {...listeners}
    >
      <h3 className="font-bold text-lg">{header}</h3>
      <p className="text-sm text-gray-600">{length}</p>
      <h3 className="font-bold text-lg">{author}</h3>
    </div>
  );
};
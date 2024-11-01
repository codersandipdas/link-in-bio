import { DroppedElement } from '@/utils/types';
import React from 'react';
import { MdOutlineClose, MdOutlineDragIndicator } from 'react-icons/md';

interface Props {
  dragHandleProps: any;
  selectedElementId: string;
  element: DroppedElement;
  isDragging: boolean;
  children: React.ReactElement;
  onSelect: (selectedElement: DroppedElement) => void;
  onDelete: (selectedElementId: string) => void;
}

const DragHandle = ({
  dragHandleProps,
  selectedElementId,
  element,
  isDragging,
  children,
  onSelect,
  onDelete,
}: Props) => {
  const isSelected = element.id === selectedElementId;

  const handleSelect = () => {
    onSelect(element);
  };

  const handleDelete = () => {
    onDelete(element.id);
  };

  return (
    <div
      className={`relative transition-all !p-1 group min-h-[20px] ${
        isSelected ? '!bg-white' : ''
      }`}
      onClick={handleSelect}
    >
      <div
        className={`hidden absolute top-0 right-0 w-auto h-[20px] px-1 bg-dark-accent text-white rounded-bl-md ${
          isSelected ? '!flex' : ''
        } ${!isDragging ? 'group-hover:!flex' : ''}`}
      >
        <button
          {...dragHandleProps}
          className='flex-1 flex items-center justify-center px-1'
          onClick={handleSelect}
        >
          <MdOutlineDragIndicator className='rotate-90' />
        </button>
        <button
          className='flex-1 flex items-center justify-center text-sm px-1'
          onClick={handleDelete}
        >
          <MdOutlineClose />
        </button>
      </div>

      <div
        className={`hidden absolute left-0 top-0 w-[1px] h-full bg-dark-accent ${
          isSelected ? '!block' : ''
        } ${!isDragging ? 'group-hover:!block' : ''}`}
      ></div>
      <div
        className={`hidden absolute right-0 top-0 w-[1px] h-full bg-dark-accent ${
          isSelected ? '!block' : ''
        } ${!isDragging ? 'group-hover:!block' : ''}`}
      ></div>
      <div
        className={`hidden absolute left-0 top-0 w-full h-[1px] bg-dark-accent ${
          isSelected ? '!block' : ''
        } ${!isDragging ? 'group-hover:!block' : ''}`}
      ></div>
      <div
        className={`hidden absolute left-0 bottom-0 w-full h-[1px] bg-dark-accent ${
          isSelected ? '!block' : ''
        } ${!isDragging ? 'group-hover:!block' : ''}`}
      ></div>

      {children}
    </div>
  );
};

export default DragHandle;

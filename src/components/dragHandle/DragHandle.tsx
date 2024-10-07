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
      className={`relative transition-all !p-0 group  ${
        isSelected ? '!bg-white' : ''
      }`}
      onClick={handleSelect}
    >
      <div
        className={`hidden absolute top-0 left-1/2 w-[60px] h-[20px] bg-dark-accent translate-x-[-50%] text-white px-2 ${
          isSelected ? '!flex' : ''
        } ${!isDragging ? 'group-hover:!flex' : ''}`}
        style={{
          clipPath: 'polygon(0 0, 100% 0, 86% 99%, 16% 100%)',
        }}
      >
        <button
          {...dragHandleProps}
          className='flex-1 flex items-center justify-center'
          onClick={handleSelect}
        >
          <MdOutlineDragIndicator className='rotate-90' />
        </button>
        <button
          className='flex-1 flex items-center justify-center text-sm'
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

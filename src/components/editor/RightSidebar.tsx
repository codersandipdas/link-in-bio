import { DroppedElement, Element } from '@/utils/types';
import React from 'react';
import LinkInput from './LinkInput';

type Props = {
  element: DroppedElement | null;
  widget: Element | null;
};

const RightSidebar: React.FC<Props> = ({ element, widget }) => {
  const getElement = (el: any) => {
    if (el.type === 'text') {
      return (
        <textarea
          placeholder={el.placeholder}
          rows={4}
          className='px-2 py-1.5 rounded border border-white/15 bg-transparent focus:border-white/50 focus:outline-none'
        />
      );
    }

    if (el.type === 'link') {
      return <LinkInput />;
    }

    return <div></div>;
  };

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <div className='shrink-0 px-4 py-3 border-b border-white/15'>
        <h2 className='font-semibold text-center'>Edit {widget?.title}</h2>
      </div>

      <div className='flex-1 flex flex-col gap-4 overflow-x-hidden overflow-y-auto px-4 py-4'>
        {element?.elements?.map((el: any) => (
          <div
            className='flex flex-col gap-2 text-xs'
            key={element.id + '_' + el.id}
          >
            <label>{el.label}</label>
            {getElement(el)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;

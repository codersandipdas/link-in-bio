import { DroppedElement, Element } from '@/utils/types';
import React from 'react';
import Text from '@/controls/Text';
import Link from '@/controls/Link';

type Props = {
  element: DroppedElement | null;
  widget: Element | null;
};

const RightSidebar: React.FC<Props> = ({ element, widget }) => {
  const getElement = (el: any) => {
    switch (el.type) {
      case 'text':
        return <Text placeholder={el.placeholder || ''} />;

      case 'link':
        return <Link />;

      case 'image':
        return <Link />;

      default:
        return <div></div>;
    }
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

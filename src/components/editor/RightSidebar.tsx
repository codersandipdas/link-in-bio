import { DroppedElement, Element } from '@/utils/types';
import React from 'react';
import Text from '@/controls/Text';
import Link from '@/controls/Link';
import { controlType } from '@/utils/enums';

type Props = {
  element: DroppedElement | null;
  widget: Element | null;
  onDataChange: (changedId: string, data: any) => void;
};

const RightSidebar: React.FC<Props> = ({ element, widget, onDataChange }) => {
  const getElement = (control: any, data: any) => {
    switch (control.type) {
      case controlType.TEXT:
        return (
          <Text
            placeholder={control.placeholder || ''}
            data={data[control.id]}
            onChange={(data) => onDataChange(control.id, data)}
          />
        );

      case controlType.LINK:
        return (
          <Link
            placeholder={control.placeholder || ''}
            data={data[control.id]}
            onChange={(data) => console.log('data', data)}
          />
        );

      case controlType.IMAGE:
        return (
          <Link
            placeholder={control.placeholder || ''}
            data={data[control.id]}
            onChange={(data) => console.log('data', data)}
          />
        );

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
        {element?.controls?.map((control: any) => (
          <div
            className='flex flex-col gap-2 text-xs'
            key={element.id + '_' + control.id}
          >
            <label>{control.label}</label>
            {getElement(control, element.data)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;

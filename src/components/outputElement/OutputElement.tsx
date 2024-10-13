import React from 'react';
import { DroppedElement } from '@/utils/types';
import clsx from 'clsx';

type Props = {
  element: DroppedElement;
};

const OutputElement: React.FC<Props> = ({ element }) => {
  switch (element.elType) {
    case 'heading':
      return (
        <h2 className={clsx(element.elClasses || '', element.secClasses || '')}>
          {element?.controls?.[0]?.defaultValue}
        </h2>
      );

    case 'button':
      return (
        <div className={element.secClasses || ''}>
          <button className={element.elClasses || ''}>
            {element?.controls?.[0]?.defaultValue || 'Button Text'}
          </button>
        </div>
      );

    default:
      return <div>Hello</div>;
  }
};

export default OutputElement;

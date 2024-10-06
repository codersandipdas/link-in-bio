import React from 'react';
import { DropedElement } from '@/utils/types';

type Props = {
  element: DropedElement;
};

const OutputElement: React.FC<Props> = ({ element }) => {
  switch (element.elementId) {
    case 'heading':
      return (
        <h2 className={element.data.classes || ''}>{element.data.value}</h2>
      );

    case 'button':
      return (
        <div className={element.data.sectionClasses || ''}>
          <button className={element.data.classes || ''}>
            {element.data.value}
          </button>
        </div>
      );

    default:
      return <div>Hello</div>;
  }
};

export default OutputElement;

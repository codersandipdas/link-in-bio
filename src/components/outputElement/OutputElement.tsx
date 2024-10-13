import React from 'react';
import { DroppedElement } from '@/utils/types';
import clsx from 'clsx';
import Heading from '@/outputs/Heading';
import Button from '@/outputs/Button';

type Props = {
  element: DroppedElement;
};

const OutputElement: React.FC<Props> = ({ element }) => {
  switch (element.elType) {
    case 'heading':
      return <Heading element={element} />;

    case 'button':
      return <Button element={element} />;

    default:
      return <div>No output!</div>;
  }
};

export default OutputElement;

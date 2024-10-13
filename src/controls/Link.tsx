'use client';

type Data = {
  link: string;
  openInNew: boolean;
};

type Props = {
  placeholder: string;
  data: Data;
  onChange: (data: Data) => void;
};

import React, { useEffect, useState } from 'react';
import { IoIosSettings } from 'react-icons/io';

const Link: React.FC<Props> = ({ placeholder, data, onChange }) => {
  const [val, setVal] = useState<Data>(data);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleToggleShowSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal((prev) => ({ ...prev, link: e.target.value }));
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal((prev) => ({
      ...prev,
      openInNew: e.target.checked,
    }));
  };

  useEffect(() => {
    onChange(val);
  }, [val]);

  return (
    <>
      <div className='flex'>
        <input
          type='url'
          placeholder={placeholder}
          className='text-input'
          value={val.link}
          onChange={handleLinkChange}
        />

        <button onClick={handleToggleShowSettings} className='settings-icon'>
          <IoIosSettings />
        </button>
      </div>

      {showSettings && (
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='openinnew'
            name='openinnew'
            value='yes'
            checked={val.openInNew || false}
            onChange={handleTargetChange}
          />
          <label htmlFor='openinnew'>Open in new window</label>
        </div>
      )}
    </>
  );
};

export default Link;

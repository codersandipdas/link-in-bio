'use client';

import React, { useState } from 'react';
import { IoIosSettings } from 'react-icons/io';

const LinkInput = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleToggleShowSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <>
      <div className='flex'>
        <input
          type='url'
          placeholder='Paste URL or type'
          className='flex-1 px-2 py-1.5 rounded-l border border-white/15 bg-transparent focus:border-white/50 focus:outline-none'
        />

        <button
          onClick={handleToggleShowSettings}
          className='shrink-0 border border-l-0 border-white/15 px-2 flex items-center justify-center rounded-r bg-transparent hover:bg-white/15'
        >
          <IoIosSettings />
        </button>
      </div>

      {showSettings && (
        <div className='flex items-center gap-2'>
          <input type='checkbox' id='openinnew' name='vehicle1' value='Bike' />
          <label htmlFor='openinnew'>Open in new window</label>
        </div>
      )}
    </>
  );
};

export default LinkInput;

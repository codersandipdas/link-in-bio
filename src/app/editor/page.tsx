'use client';

import React, { useState } from 'react';
import { CiText } from 'react-icons/ci';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Element {
  id: string;
}

const initialElements: Element[] = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
];

const Editor: React.FC = () => {
  const [droppedElements, setDroppedElements] = useState<Element[]>([]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    if (result.source.droppableId === 'items') {
      // Move element from sidebar to device frame with a new unique ID
      const newElement: Element = {
        id: `${result.draggableId}-${Date.now()}`,
      };
      setDroppedElements((prev) => [...prev, newElement]);
    } else {
      // Reorder dropped elements
      const reorderedElements = Array.from(droppedElements);
      const [movedElement] = reorderedElements.splice(result.source.index, 1);
      reorderedElements.splice(result.destination.index, 0, movedElement);
      setDroppedElements(reorderedElements);
    }
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: '1rem',
    margin: '0 0 1px 0',
    ...draggableStyle,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='h-screen flex flex-col overflow-hidden'>
        <header className='shrink-0 h-[60px] p-4 border-b border-slate-800'>
          Header
        </header>

        <main className='flex-1 flex overflow-hidden'>
          <aside className='w-[300px] shrink-0 border-r bg-[#1f2124] border-slate-800 overflow-x-hidden overflow-y-auto'>
            <div className='p-4'>
              <h2 className='font-semibold'>Elements</h2>
              <div className='font-semibold sticky top-0 bg-[#1f2124] py-3'>
                <input
                  className='w-full rounded py-2 px-3 text-xs font-normal border border-white/15 focus:border-white focus:outline-none bg-transparent'
                  placeholder='Search elements...'
                />
              </div>
              <Droppable droppableId='items' isDropDisabled={true}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className='grid grid-cols-2 gap-4 mt-2 text-white/80'
                  >
                    {initialElements.map((element, index) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className='!p-0 transition-none'
                          >
                            <div className='p-4 rounded border border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'>
                              <CiText size={30} />
                              <p className='text-xs'>Heading {index}</p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </aside>

          <div className='flex-1 p-4 flex items-center justify-center text-black overflow-hidden'>
            {/* <DeviceFrameset device='iPhone X' color='gold' zoom={0.75}> */}
            <div className='h-full bg-white aspect-[9/19] iphone-case'>
              <div className='flex flex-col h-full overflow-hidden bg-white rounded-3xl'>
                <div className='h-[34px] shrink-0'></div>
                <Droppable droppableId='elements'>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='flex-1 Kiosk h-full overflow-x-hidden overflow-y-auto'
                    >
                      {droppedElements.map((element, index) => (
                        <Draggable
                          key={element.id}
                          draggableId={element.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                false,
                                provided.draggableProps.style
                              )}
                              className='p-4 rounded border border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'
                            >
                              <CiText size={30} />
                              <p className='text-xs'>Heading {index + 1}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            {/* </DeviceFrameset> */}
          </div>

          <aside className='shrink-0 p-4 w-[300px] border-l border-slate-800 bg-[#1f2124]'>
            Right sidebar
          </aside>
        </main>
      </div>
    </DragDropContext>
  );
};

export default Editor;

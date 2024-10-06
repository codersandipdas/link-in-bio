'use client';

import React, { useState } from 'react';
import { CiText } from 'react-icons/ci';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DragHandle from '@/components/dragHandle/DragHandle';
import { TbSocial } from 'react-icons/tb';
import { PiCursorClick } from 'react-icons/pi';
import { IoImageOutline } from 'react-icons/io5';
import { BsTextLeft } from 'react-icons/bs';
import { RxVideo } from 'react-icons/rx';

interface Element {
  id: string;
  title: string;
  icon: React.ReactElement;
}

const initialElements: Element[] = [
  { id: '1', title: 'Heading', icon: <CiText /> },
  { id: '2', title: 'Socials', icon: <TbSocial /> },
  { id: '3', title: 'Button', icon: <PiCursorClick /> },
  { id: '4', title: 'Image', icon: <IoImageOutline /> },
  { id: '5', title: 'Text Editor', icon: <BsTextLeft /> },
  { id: '6', title: 'Video', icon: <RxVideo /> },
];

const Editor: React.FC = () => {
  const [droppedElements, setDroppedElements] = useState<Element[]>([]);
  const [placeholderProps, setPlaceholderProps] = useState<any>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedElementId, setSelectedElementId] = useState<string>('');

  const onDragEnd = (result: any) => {
    setPlaceholderProps({});
    setIsDragging(false);

    if (!result.destination) return;

    if (result.source.droppableId === 'items') {
      const newElement: any = {
        id: `${result.draggableId}-${Date.now()}`,
      };
      const updatedElements = [...droppedElements];
      updatedElements.splice(result.destination.index, 0, newElement);
      setDroppedElements(updatedElements);
      setSelectedElementId(newElement.id);
    } else {
      const reorderedElements = [...droppedElements];
      const [movedElement] = reorderedElements.splice(result.source.index, 1);
      reorderedElements.splice(result.destination.index, 0, movedElement);
      setDroppedElements(reorderedElements);
    }
  };

  const queryAttr = 'data-rfd-draggable-id';
  const onDragUpdate = (update: any) => {
    setSelectedElementId(update.draggableId);
    setIsDragging(true);

    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const initialIndex = update.source.index;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM: any = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const arr = [...draggedDOM.parentNode.children];
    if (initialIndex < destinationIndex) {
      arr.splice(initialIndex, 1);
    }

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      arr.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: '1rem',
    margin: '0 0 1px 0',
    ...draggableStyle,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
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
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className='!p-0'
                            >
                              <div className='p-4 rounded border bg-[#1f2124] border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'>
                                <span className='text-2xl'>{element.icon}</span>
                                <p className='text-xs'>{element.title}</p>
                              </div>
                            </div>
                            {snapshot.isDragging && (
                              <div className='p-4 rounded border bg-[#1f2124] border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 !transform-none'>
                                <span className='text-2xl'>{element.icon}</span>
                                <p className='text-xs'>{element.title}</p>
                              </div>
                            )}
                          </>
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
            <div className='h-full bg-white aspect-[9/19] iphone-case'>
              <div className='flex flex-col h-full overflow-hidden bg-white rounded-3xl'>
                <div className='h-[30px] shrink-0'></div>
                <Droppable droppableId='elements'>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='flex-1 Kiosk h-full overflow-x-hidden overflow-y-auto relative'
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
                              //   {...provided.dragHandleProps}
                              style={getItemStyle(
                                false,
                                provided.draggableProps.style
                              )}
                              className='!p-0'
                            >
                              <DragHandle
                                id={element.id}
                                dragHandleProps={provided.dragHandleProps}
                                selectedElementId={selectedElementId}
                                isDragging={isDragging}
                                onSelect={(elementId) =>
                                  setSelectedElementId(elementId)
                                }
                                onDelete={(elementId) =>
                                  console.log('deleted elementId', elementId)
                                }
                              >
                                <div className='p-4 flex flex-col items-center gap-2'>
                                  <CiText size={30} />
                                  <p className='text-xs'>
                                    Heading {element.id}
                                  </p>
                                </div>
                              </DragHandle>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <div
                        id='custom-placeholder'
                        style={{
                          position: 'absolute',
                          top: placeholderProps.clientY,
                          left: 0,
                          height: placeholderProps.clientHeight,
                          background: '#F2542D30',
                          width: '100%',
                        }}
                      />
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
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

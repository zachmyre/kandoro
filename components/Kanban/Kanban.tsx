import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { pink, green } from "../Timer/Timer";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { Modal, Card as CardMUI, Button } from "@mui/material";
import Card from "./Card";
import { v4 as uuid } from 'uuid';

const Kanban = () => {
  let kanbanData: any = [
    {
      id: "1",
      title: "📝 To Do 🖊️",
      tasks: [],
    },
    {
      id: "2",
      title: "⚙️ In Progress 💻",
      tasks: [],
    },
    {
      id: "3",
      title: " ✔️ Completed 💯",
      tasks: [],
    },
  ];

  const [winReady, setwinReady] = useState(false);
  const [data, setData] = useState(kanbanData);
  const [showTaskModal, setShowTaskModal] = useState({
    open: false,
    columnID: '',
  });
  const [currentTaskToAdd, setCurrentTaskToAdd] = useState({
    id: '',
    title: '',
    columnID: '',
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex(
        (e: any) => e.id === source.droppableId
      );
      const destinationColIndex = data.findIndex(
        (e: any) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      localStorage.setItem("data", JSON.stringify(data));
      setData(data);
    }
  };

  const addCurrentTask = () => {
    let newData = data;
    const index = data.findIndex((object: any) => {
      return object.id === currentTaskToAdd.columnID;
    });
    newData[index].tasks.push(currentTaskToAdd);
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
    resetData();
  };

  const deleteTask = ({taskID, columnID}: any) => {
    let newData = data;
    const index = data.findIndex((object: any) => {
      return object.id === columnID;
    });
    const taskIndex = newData[index].tasks.findIndex((object: any) => {
      return object.id === taskID;
    })
    newData[index].tasks.splice(taskIndex, 1);
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
    resetData();
  }

  const resetData = () => {
    setCurrentTaskToAdd({
      id: '',
      title: '',
      columnID: '',
    });
    setShowTaskModal({
      open: false,
      columnID: '',
    });
  };

  useEffect(() => {
    console.log(kanbanData);
    setTimeout(() => {
      setData(JSON.parse(localStorage.getItem("data") || kanbanData));
      setwinReady(true);
    }, 300);
    // setData(kanbanData);
  }, []);

  return (
    <div>
      {winReady ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban rounded-md space-x-6 my-4">
            {data.map((section: any) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className="rounded-md shadow-xl shadow-green-500"
                    style={{ background: pink }}
                    ref={provided.innerRef}
                  >
                    <div className="text-white text-bold text-3xl p-3 rounded-md">
                      {section.title}
                    </div>
                    <div className="">
                      {section.tasks.map((task: any, index: any) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? "0.5" : "1",
                              }}
                            >
                              <Card>{task.title}
                              <MdDelete onClick={() => { deleteTask({taskID: task.id, columnID: section.id})}}
                              className="text-pink-600 w-12 h-12 m-2 hover:cursor-pointer" /></Card>
                              
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setShowTaskModal({
                            open: true,
                            columnID: section.id,
                          });
                        }}
                      >
                        <MdAddCircle className="w-12 h-12  p-1 my-2 text-green-400 hover:text-green-200 hover:cursor-pointer" />
                      </button>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      ) : null}
      <Modal
        open={showTaskModal.open}
        //   onClose={handleClose}
        className="flex items-center justify-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CardMUI className="text-center" variant="outlined">
          <div className="flex flex-col items-center m-6">
            <div>
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Task
              </label>
            </div>
            <div>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
                id="inline-full-name"
                type="text"
                value={currentTaskToAdd.title ?? ""}
                onChange={(e: any) => {
                  setCurrentTaskToAdd({
                    id: uuid(),
                    title: e.target.value,
                    columnID: showTaskModal.columnID,
                  });
                }}
              />
            </div>
            <div className="flex flex-row space-x-4 my-2">
              <button
                onClick={() => {
                  addCurrentTask();
                }}
                className="my-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              >
                Add Task
              </button>
              <button
                onClick={() => {
                 resetData();
                }}
                className="my-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </CardMUI>
      </Modal>
    </div>
  );
};

export default Kanban;

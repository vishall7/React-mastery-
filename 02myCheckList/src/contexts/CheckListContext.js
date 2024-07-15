import { createContext, useContext } from "react";

export const CheckListContext = createContext({
    tasks: [
        {
            id: 1,
            task: "Task 1",
            description: "Description 1",
            priority: "",
            isDone: false,
            creationTime: '',
        }
    ],
    toggleTaskInfo: (id) => {},
    addTask: (task) => {},    
    toggleComplete: (id) => {},
    removeTask: (id) => {},
    updateTask: (id, task) => {},
    updateDescription: (id, description) => {},
    setPriority: (id, priority) => {},
    duplicateTask: (id) => {},
    postionTaskIfCompleted: (id) => {},     
});

export const CheckListContextProvider = CheckListContext.Provider;

export const useCheckListContext = () => useContext(CheckListContext);
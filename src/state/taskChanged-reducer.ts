import {AddTodolistActionType} from "./todolists-reducer";

export type TaskStatusType = {
    isLoading: boolean
    isWaitingDone: boolean
    progress: number
}
type TaskChangedReducerStateType = {
    [key: string]: TaskStatusType
}
type TaskChangedActionType = AddTodolistActionType | ChangeIsLoadingAC | ChangeIsWaitingDoneAC | ChangeProgressAC

const initialState: TaskChangedReducerStateType = {}
export const taskChangedReducer = (state = initialState, action: TaskChangedActionType): TaskChangedReducerStateType => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: {isLoading: false, isWaitingDone: true, progress: 0}}
        }
        case 'CHANGE-IS-LOADING': {
            return {...state, [action.id]: {...state[action.id], isLoading: action.isLoading}}
        }
        case 'CHANGE-IS-WAITING-DONE': {
            return {...state, [action.id]: {...state[action.id], isWaitingDone: action.isWaitingDone}}
        }
        case 'CHANGE-PROGRESS': {
            return {...state, [action.id]: {...state[action.id], progress: action.progress}}
        }
        default:
            return state
    }
}

type ChangeIsLoadingAC = ReturnType<typeof changeIsLoadingAC>
export const changeIsLoadingAC = (id: string, isLoading: boolean) => {
    return {
        type: 'CHANGE-IS-LOADING',
        id,
        isLoading
    } as const
}
type ChangeIsWaitingDoneAC = ReturnType<typeof changeIsWaitingDoneAC>
export const changeIsWaitingDoneAC = (id: string, isWaitingDone: boolean) => {
    return {
        type: 'CHANGE-IS-WAITING-DONE',
        id,
        isWaitingDone
    } as const
}

type ChangeProgressAC = ReturnType<typeof changeProgressAC>
export const changeProgressAC = (id: string, progress: number) => {
    return {
        type: 'CHANGE-PROGRESS',
        id,
        progress
    } as const
}
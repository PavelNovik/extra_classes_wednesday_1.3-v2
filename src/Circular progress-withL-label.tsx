import React, {FC, useState} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeIsWaitingDoneAC, changeProgressAC} from "./state/taskChanged-reducer";

interface ICircularProgressWithLabel {
    value: number
}

const CircularProgressWithLabel: React.FC<ICircularProgressWithLabel> = (props) => {

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface ICircularStatic {
    isWaiting: boolean
    //interval milliseconds
    timeInterval: number
    id: string
}

//TASK
//Use redux instead local state

export const CircularStatic: FC<ICircularStatic> = (props) => {
    const id = props.id

    const progress = useSelector<AppRootStateType, number>(state => state.taskStatus[id].progress)
    const isWaitingDone = useSelector<AppRootStateType, boolean>(state => state.taskStatus[id].isWaitingDone)

    const dispatch = useDispatch()


    React.useEffect(() => {
        let timer: ReturnType<typeof setInterval>
        if (props.isWaiting && isWaitingDone) {
            timer = setInterval(() => {
                const newProgressValue = () => {
                    if (progress === 100) {
                        clearInterval(timer)
                        dispatch(changeIsWaitingDoneAC(id, false))
                    }
                    return progress >= 100 ? 0 : progress + 10
                }
                dispatch(changeProgressAC(id, newProgressValue()))
            }, props.timeInterval);
        } else {
            dispatch(changeProgressAC(id, 0))
        }

        return () => {
            if (progress >= 90) dispatch(changeProgressAC(id, 0))
            clearInterval(timer);
        };
    }, [props.isWaiting, isWaitingDone, progress]);

    return <CircularProgressWithLabel value={progress}/>;
}





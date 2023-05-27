import { createContext } from "react";
import { emptyCallback } from "../utils/utils";


export interface MediaConstraints {
    video: boolean;
    audio: boolean;
}

export interface MediaAccessStoreState {
    mediaStream: MediaStream | undefined;
    setMediaStream: (mediaStream: MediaStream) => void;
    constraints: MediaConstraints;
    setConstraints: (constraints: MediaConstraints) => void;
}



export function createMediaAccessStoreDefaultValue(): MediaAccessStoreState {
    return {
        mediaStream: undefined,
        setMediaStream: emptyCallback,
        constraints: {
            video: false,
            audio: false
        },
        setConstraints: emptyCallback
    }
}

export const MediaAccessStoreContext = createContext(createMediaAccessStoreDefaultValue());
import { useContext } from "react";
import {
  MediaAccessStoreContext,
  MediaConstraints,
} from "./mediaAccessStoreContext";

export const useMediaStream = (): [
  MediaStream | undefined,
  (mediaStream: MediaStream) => void
] => {
  const context = useContext(MediaAccessStoreContext);
  return [context.mediaStream, context.setMediaStream];
};

export const useConstraints = (): [
  MediaConstraints,
  (constraints: MediaConstraints) => void
] => {
  const context = useContext(MediaAccessStoreContext);
  return [context.constraints, context.setConstraints];
};

export const useCreateMediaStream = () => {
  const context = useContext(MediaAccessStoreContext);
  return (constraints: MediaConstraints) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log("Got MediaStream:", stream);
        context.setMediaStream(stream);
        console.log("Media stream set!");
        context.setConstraints(constraints);
        console.log("Constraints set!");
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };
};

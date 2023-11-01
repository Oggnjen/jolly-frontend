import { Component } from "react";
import Content from "./Content";
import { MediaAccessStoreProvider } from "./backend-layer/media-access/mediaAccessStoreProvider";
import { Provider } from "react-redux";
import { useStore } from "./backend-layer/store/store";

export function App() {
  const store = useStore();
  return (
    <>
      <Provider store={store}>
        <Content />
      </Provider>
    </>
  );
}

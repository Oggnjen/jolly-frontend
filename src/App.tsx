import { Component } from "react";
import Content from "./Content";
import { MediaAccessStoreProvider } from "./backend-layer/media-access/mediaAccessStoreProvider";

class App extends Component {
  render() {
    return (
      <>
        <Content />
      </>
    );
  }
}

export default App;

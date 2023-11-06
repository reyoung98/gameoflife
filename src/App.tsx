import "./App.css";
import { Game } from "./Game";

function App() {
  return (
    <div className='main'>
      <Game numCols={30} numRows={15} />
    </div>
  );
}

export default App;

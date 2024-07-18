import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Task from './Task';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element= {<Task/>}></Route>

      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

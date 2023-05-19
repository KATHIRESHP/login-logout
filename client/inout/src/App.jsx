import Signup from './Components/Signup/Signup'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
         <Routes>
             <Route path='/' element={<Signup/>}/>
             <Route path='/login' element={<Login/>} />
             <Route path='*' element={<div>Error in url</div>}/>
         </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

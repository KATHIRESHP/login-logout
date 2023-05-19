import Signup from './Components/Signup/Signup'
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
         <Routes>
             <Route path='\' element={<Signup/>}/>
         </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

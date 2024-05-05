import Home from "./component/home/Home";
import {store} from './store/store'
import {Provider} from 'react-redux'
import './App.css'
function App() {
  return (
   <>
   <Provider store={store}>
   <div className="global-container">
   <Home/>
   </div>
</Provider>
   </>
  );
}

export default App;

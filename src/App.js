import Home from "./component/home/Home";
import {store} from './store/store'
import {Provider} from 'react-redux'
import './App.css'
function App() {
  return (
   <>
   <Provider store={store}> {/* store is configure for redux */}
   <div className="global-container">
   <Home/>{/* home page */}
   </div>
</Provider>
   </>
  );
}

export default App;

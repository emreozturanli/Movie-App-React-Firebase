import AppContextProvider from "./context/AppContext";
import Router from "./router/Router";
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <AppContextProvider>
      <Toaster/>
    <Router/>
    </AppContextProvider>
  );
}

export default App;

import { Header } from './components/Header';
import { GroceryItemList } from './components/GroceryItemList';

import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="max-w-lg rounded shadow-lg mx-auto">
        <Header />
        <GroceryItemList />
      </div>
    </GlobalProvider>
  );
}

export default App;

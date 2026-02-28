import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store.js';
import { fetchProducts } from './store/employeeslice.js';
import Header from './components/Header.jsx';
import SearchAndFilter from './components/SearchAndFilter.jsx';
import EmployeeTable from './components/EmployeeTable.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage />
        <SearchAndFilter />
        <EmployeeTable />
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
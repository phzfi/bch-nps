import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Layout from './Layout';
import PropertyManager from './components/PropertyManager';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route  index element={<Dashboard/>}/>
          <Route path = "/propertymanager" element={<PropertyManager/>}/>
          <Route path = "/account" element={<Account/>}/>
        </Route>
      </Routes>
  </Router>
  );
}

export default App;

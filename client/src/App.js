import './App.css';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage"
import ProtectedRoutes from './middleware/ProtectedRoutes';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';


function App() {

  return (
    <div className="App">
       <BrowserRouter>
       <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} /> 
                <Route path="/" element={<HomePage />} />
                <Route path="/pastry/:id" element={<ProductPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

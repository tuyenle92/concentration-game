import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/home.jsx';
import About from './screens/about.jsx';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
            </Routes>
        </BrowserRouter>
    )
};

export default Router;
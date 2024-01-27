import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './modules/login/login.tsx';
import { Provider } from 'mobx-react';
import stores from './stores.ts';
import HomePage from './modules/home/home.tsx';

const App = () => (
    <Provider {...stores}>
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<HomePage />} />
            </Routes>
        </Router>
    </Provider>
);

export default App;

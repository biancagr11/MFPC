import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './modules/login/login.tsx';
import { Provider } from 'mobx-react';
import stores from './stores.ts';
import HomePage from './modules/home/home.tsx';
import AddMemory from './modules/memory/add-memory.tsx';
import Diary from './modules/memory/diary-list.tsx';
import Favourites from './modules/memory/favourite-memories.tsx';
import UpdateMemory from './modules/memory/update-memory.tsx';

const App = () => (
    <Provider {...stores}>
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/diary' element={<Diary />} />
                <Route path='/addMemory' element={<AddMemory />} />
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/update/:id' element={<UpdateMemory />} />
            </Routes>
        </Router>
    </Provider>
);

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Recenzije from './pages/Recenzije';
import RecenzijaSingle from './pages/RecenzijaSingle';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/recenzije' element={<Recenzije />}>
                            <Route path=':id' element={<RecenzijaSingle />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

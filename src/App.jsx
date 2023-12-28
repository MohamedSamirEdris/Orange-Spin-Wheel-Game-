import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wheel from './component/wheel';
import Login from './component/Login';
import Result from './component/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wheel" element={<Wheel />} />
        <Route path="/result" element={<Result />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

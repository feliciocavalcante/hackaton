import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import CourseTwo from './pages/Course.two';
import Login from './pages/Login';
import LessonPlayer from './pages/LessonPlayer';  // importe o componente novo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/two" element={<CourseTwo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lesson/:id" element={<LessonPlayer />} />  {/* Rota do player */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
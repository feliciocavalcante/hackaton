import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import CourseTwo from './pages/Course.two';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/two" element={<CourseTwo />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
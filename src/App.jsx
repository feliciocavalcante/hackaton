import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import CourseTwo from './pages/Course.two';
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/two" element={<CourseTwo />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
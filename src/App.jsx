import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import CourseTwo from './pages/CourseTwo'; // Corrigido o nome do arquivo para padrão
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública: curso aberto para todos */}
        <Route path="/" element={<Course />} />
        
        {/* Rota para vídeo aula individual com parâmetro id */}
        <Route path="/two/:id" element={<CourseTwo />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* Rota protegida: somente usuário autenticado */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudentList from './pages/admin/AdminStudentList';
import AdminCourses from './pages/admin/AdminCourses';
import AdminExam from './pages/admin/AdminExam';
import StudentExamList from './pages/students/StudentExamList';
import StudentResults from './pages/students/StudentResults';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/api/v1' element={<LoginPage/>}/>
          <Route path=''/>

          <Route path='/admin' element={<AdminDashboard/>}/>
          <Route path='/admin/student' element={<AdminStudentList/>}/>
          <Route path='/admin/courses' element={<AdminCourses/>}/>
          <Route path='/admin/exams' element={<AdminExam/>}/>
          <Route path='/admin/exams/:id/questions' element={<></>}/>
          <Route path='/admin/exams/:id/results' element={<></>}/>

          <Route path='/student' element={<StudentExamList/>}/>
          <Route path='/student/exams/:id' element={<></>}/>
          <Route path='/student/exams/:id/result' element={<></>}/>
          <Route path='/student/results' element={<StudentResults/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudentList from "./pages/admin/AdminStudentList";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminExam from "./pages/admin/AdminExam";
import EditionQuestion from "./pages/admin/EditionQuestion";
import ExamResults from "./pages/admin/ExamResults";

import StudentExamList from "./pages/students/StudentExamList";
import StudentExamPage from "./pages/students/StudentExamPage";
import StudentResultPage from "./pages/students/StudentResultPage";
import StudentResults from "./pages/students/StudentResults";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route element={<ProtectedRoute role="admin" />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/students"
            element={<AdminStudentList />}
          />

          <Route
            path="/admin/courses"
            element={<AdminCourses />}
          />

          <Route
            path="/admin/exams"
            element={<AdminExam />}
          />

          <Route
            path="/admin/exams/:id/questions"
            element={<EditionQuestion />}
          />

          <Route
            path="/admin/exams/:id/results"
            element={<ExamResults />}
          />
        </Route>

        <Route element={<ProtectedRoute role="student" />}>
          <Route
            path="/student"
            element={<StudentExamList />}
          />

          <Route
            path="/student/exams/:id"
            element={<StudentExamPage />}
          />

          <Route
            path="/student/exams/:id/result"
            element={<StudentResultPage />}
          />

          <Route
            path="/student/results"
            element={<StudentResults />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
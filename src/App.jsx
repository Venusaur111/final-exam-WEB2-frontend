import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudentList from "./pages/admin/AdminStudentList";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminExam from "./pages/admin/AdminExam";
import EditionExamPage from "./pages/admin/EditionExamPage";
import ExamResults from "./pages/admin/ExamResults";

import StudentExamList from "./pages/student/StudentExamList";
import StudentExamPage from "./pages/student/StudentPage";
import StudentResultPage from "./pages/student/StudentResultPage";
import StudentResults from "./pages/student/StudentResults";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<LoginPage />} />


          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AppLayout role="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudentList />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="exams" element={<AdminExam />} />
              <Route path="exams/:id/questions" element={<EditionExamPage />} />
              <Route path="exams/:id/results" element={<ExamResults />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute role="student" />}>
            <Route path="/student" element={<AppLayout role="student" />}>
              <Route index element={<StudentExamList />} />
              <Route path="exams/:id" element={<StudentExamPage />} />
              <Route path="exams/:id/result" element={<StudentResultPage />} />
              <Route path="results" element={<StudentResults />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

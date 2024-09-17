import { Router } from "express";

import {
  createAdmin,
  createStudent,
  createTeacher,
  studentLogin,
  studentLogout,
  teacherLogin,
  teacherLogout,
} from "../controllers/auth.controller";
import { createCollege } from "../controllers/college.controller";
// import { forgotPassword } from "../services/mail.service";


const router = Router();

// * Auth Routes

router.post("/admin/createAdmin", createAdmin);

router.post("/student/login", studentLogin);
router.post("/student/logout", studentLogout);
router.post("/admin/student/register", createStudent);

router.post("/admin/teacher/register", createTeacher);
router.post("/teacher/login", teacherLogin);
router.post("/teacher/logout", teacherLogout);

// * Email Routes

// router.post("/student/forgotPassword", forgotPassword)

// * College Routes

router.post("/admin/createCollege", createCollege);

// * Student Routes

export { router as apiRoutes };

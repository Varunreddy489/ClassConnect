import { Router } from "express";

import {
  createAdmin,
  studentLogin,
  teacherLogin,
  createStudent,
  createTeacher,
  studentLogout,
  teacherLogout,
} from "../controllers/auth.controller";

import {
  updateProfile,
  forgotPasswordStudent,
  passwordChangeStudent,
} from "../controllers/student.controller";

import {
  forgotPasswordTeacher,
  passwordChangeTeacher,
} from "../controllers/teacher.controller";

import { createCollege } from "../controllers/college.controller";

const router = Router();

// * Auth Routes

router.post("/admin/createAdmin", createAdmin);

router.post("/student/login", studentLogin);
router.post("/student/logout", studentLogout);
router.post("/admin/student/register", createStudent);
router.post("/student/changePassword/:token", passwordChangeStudent);

router.post("/teacher/login", teacherLogin);
router.post("/teacher/logout", teacherLogout);
router.post("/admin/teacher/register", createTeacher);
router.post("/teacher/changePassword/:token", passwordChangeTeacher);

// * Email Routes

router.post("/teacher/forgotPassword", forgotPasswordTeacher);
router.post("/student/forgotPassword", forgotPasswordStudent);

// * Student Routes

router.post("/student/updateProfile", updateProfile);

// * Teacher Routes

// * College Routes

router.post("/admin/createCollege", createCollege);

export { router as apiRoutes };

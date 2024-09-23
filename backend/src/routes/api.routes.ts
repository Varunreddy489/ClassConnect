import { Router } from "express";

import {
  addToClub,
  createClub,
  updateClub,
  getAllClubs,
  createAdmin,
  studentLogin,
  sendMessages,
  teacherLogin,
  createStudent,
  teacherLogout,
  createTeacher,
  studentLogout,
  createCollege,
  forgotPasswordStudent,
  passwordChangeStudent,
  forgotPasswordTeacher,
  passwordChangeTeacher,
  getAllMessages,
  joinClubRequest,
  getAllJoinRequests,
} from "../controllers";

import { checkIsAuth } from "../middleware/CheckAuth";
import { verifyRole } from "../middleware/verifyRole";

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

router.post("/student/updateProfile");

// * Teacher Routes

router.post("/teacher/updateProfile");

// * College Routes

router.post("/admin/createCollege", createCollege);

// * Club Routes

router.put("/club/add/:clubId", addToClub);
router.get("/club", checkIsAuth,getAllClubs);
router.put("/club/update/:clubId", updateClub);
router.post("/club/create/:studentId", createClub);
router.post("/club/join/:clubId",checkIsAuth, joinClubRequest);
router.get("/club/:clubId",checkIsAuth, getAllJoinRequests);
router.post("/club/message/:clubId",checkIsAuth,verifyRole(['STUDENT', 'ADMIN']),sendMessages)
router.get("/club/message/:clubId",checkIsAuth,verifyRole(['STUDENT', 'ADMIN']),getAllMessages)

export { router as apiRoutes };

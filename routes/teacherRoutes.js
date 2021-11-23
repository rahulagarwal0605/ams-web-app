//jshint esversion:6
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const {isAuthenticated,authorizeRoles}= require("../middlewares/auth");

router.get("/courses", isAuthenticated,authorizeRoles("Instructor"),teacherController.viewCoursesList);
router.get("/courses/:cid/students",isAuthenticated,authorizeRoles("Instructor"),teacherController.viewStudentsList);
router.get("/courses/:cid/EvalutaionScheme",isAuthenticated,authorizeRoles("Instructor"), teacherController.getEvaluationScheme);
router.post("/courses/:cid/EvalutaionScheme",isAuthenticated,authorizeRoles("Instructor"), teacherController.setEvaluationSceheme);
router.get("/courses/:cid/students/:sid/getMarks",isAuthenticated,authorizeRoles("Instructor"), teacherController.getMarks);
router.post("/courses/:cid/students/:sid/setMarks",isAuthenticated,authorizeRoles("Instructor"),teacherController.setMarks);
router.post("/courses/:cid/students/:sid/setGrades",isAuthenticated,authorizeRoles("Instructor"), teacherController.setGrades);
module.exports = router;

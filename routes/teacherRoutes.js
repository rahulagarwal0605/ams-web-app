//jshint esversion:6
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
//const {isAuthenticated,authorizeRoles}= require("../middlewares/auth");

router.get("/courses", teacherController.viewCoursesList);
router.get("/courses/:cid/students",teacherController.viewStudentsList);
router.get("/courses/:cid/EvalutaionScheme", teacherController.getEvaluationScheme);
router.post("/courses/:cid/EvalutaionScheme", teacherController.setEvaluationSceheme);
router.get("/courses/:cid/students/:sid/getMarks", teacherController.getMarks);
router.post("/courses/:cid/students/:sid/setMarks",teacherController.setMarks);
router.post("/courses/:cid/students/:sid/setGrades", teacherController.setGrades);
module.exports = router;

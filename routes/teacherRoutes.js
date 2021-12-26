//jshint esversion:6
const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const {isAuthenticated,authorizeRoles}= require("../middlewares/auth");

router.get("/courses",isAuthenticated, teacherController.viewCoursesList);
router.get("/courses/:cid/students",isAuthenticated, teacherController.viewStudentsList);
router.get("/courses/:cid/EvalutaionScheme", isAuthenticated, teacherController.getEvaluationScheme);
router.get("/courses/:cid/GetGradeDetails", isAuthenticated, teacherController.getGradeDetails);
router.delete("/courses/:cid/EvalutaionScheme", isAuthenticated, teacherController.deleteEvaluationSceheme);
router.post("/courses/:cid/EvalutaionScheme", isAuthenticated, teacherController.setEvaluationSceheme);
router.put("/courses/:cid/EvalutaionScheme", isAuthenticated, teacherController.editEvaluationSceheme);
router.get("/courses/:cid/students/:sid/getMarks", isAuthenticated, teacherController.getMarks);
router.get("/courses/:cid/setLock", isAuthenticated, teacherController.setLock);
router.get("/courses/:cid/getLock", isAuthenticated, teacherController.getLock);
router.get("/courses/:cid/getTotalStudents", isAuthenticated, teacherController.getTotalStudents);
router.post("/courses/:cid/students/:sid/setMarks", isAuthenticated, teacherController.setMarks);
router.get("/courses/:cid/students/:sid/getGrades", isAuthenticated, teacherController.getGrades);
router.post("/courses/:cid/SetGrades", teacherController.setGrades);
router.post("/courses/:cid/SetOtherCourseGrades/:sid", teacherController.setOtherCourseGrades);

module.exports = router;

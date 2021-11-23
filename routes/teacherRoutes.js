const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/courses", teacherController.viewCoursesList);
router.get("/courses/:cid/students", teacherController.viewStudentsList);
router.get("/courses/:cid/students/:sid/getMarks", teacherController.getMarks);
router.post("/courses/:cid/students/:sid/setMarks", teacherController.setMarks);
router.post("/courses/:cid/students/:sid/setGrades", teacherController.setGrades);
router.get("/courses/:cid/EvalutaionScheme",isAuthenticated,authorizeRoles("Instructor"), teacherController.getEvalutionSceheme);
router.post("/courses/:cid/EvalutaionScheme",isAuthenticated,authorizeRoles("Instructor"), teacherController.setEvalutionSceheme);

module.exports = router;
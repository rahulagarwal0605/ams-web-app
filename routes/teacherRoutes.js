const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/courses", teacherController.viewCoursesList);
router.get("/courses/:cid/students", teacherController.viewStudentsList);
router.get("/courses/:cid/students/:sid/getMarks", teacherController.getMarks);
router.post("/courses/:cid/students/:sid/setMarks", teacherController.setMarks);
router.post("/courses/:cid/students/:sid/setGrades", teacherController.setGrades);

module.exports = router;
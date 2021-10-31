const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/courses", teacherController.viewCoursesList);
router.get("/students", teacherController.viewStudentsList);
router.get("/getMarks", teacherController.getMarks);
router.post("/setMarks", teacherController.setMarks);

module.exports = router;
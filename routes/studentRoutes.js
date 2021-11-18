const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getStudentDetails);
router.get("/:sid/courses", studentController.viewCoursesList);
router.get("/:sid/courses/:cid", studentController.getCourseDetails);

module.exports = router;

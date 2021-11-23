//jshint esversion:8
require("dotenv").config();

const db = require('../config/db');

exports.viewCoursesList = (req, res) => {
    var query="SELECT Course.CourseId, Course.CourseName, CourseInstructur.Session FROM Course inner join CourseInstructor on CourseInstructur.CourseId=Course.CourseId WHERE CourseInstructor.InstructorID =?";
    db.query(query,[req.params.iid],(err,results) => {
        // All Error handling will be done later
        if(err){
            console.log(err);
        }
        if(results!=undefined){
            res.json({
            status: "success",
            data:results,
            });
        }
        }
    );
};

exports.viewStudentsList = (req, res) => {
    var query="SELECT Student.RollNo, Student.Name FROM Enrolled inner join Student on Enrolled.RollNo=Student.RollNo WHERE Enrolled.CourseID =?";
    db.query(query,[req.params.cid],(err,results) => {
        // All Error handling will be done later
        if(err){
            console.log(err);
        }
        if(results!=undefined){
            res.json({
            status: "success",
            data:results,
            });
        }
        }
    );
};

exports.getMarks = (req, res) => {
  var cid=req.params.cid;
  var sid=req.params.sid;
  let query="SELECT Takes.MarksObtained,Exams.ExamName FROM Takes inner join Exams on Takes.ExamID=Exams.ExamID WHERE Takes.CourseID =? and Takes.RollNo=?";
  db.query(query,[cid,sid],(err,results) => {
    // All Error handling will be done later
      if(err){
        console.log(err);
      }
      if(results!=undefined){
        res.json({
          status: "success",
          data:results,
        });
      }
    }
  );
};

exports.setMarks = (req, res) => {
  var cid=req.params.cid;
  var sid=req.params.sid;
  var marks=req.body.marks;
  var query1 = "Select ExamID from Takes WHERE CourseID=? and RollNo=?";
  db.query(query1,[cid,sid],(err,result)=>{
    // All error handling will be done later
    if(err)
      console.log(err);
    if(result!=undefined){
      result.forEach((obj,index) => {
        var query2="Update Takes set MarksObtained=? where CourseID=? and RollNo=? and ExamID=?";
        db.query(query2,[marks[index],cid,sid,obj.ExamID],(err,result)=>{
          // All Error handling will be done later
          if(err)
            console.log(err);

        });
      });
      res.json({
        status: "success",
        message:"marks sucessfully updated"
      });
    }
  });
};

exports.setGrades = (req, res) => {

};

/*
select*from Takes inner join Exams on
Takes.ExamID = Exams.ExamID where
takes.CourseID = '1000' and Takes.RollNo = '19ucs001';

select ExamID from Takes
where RollNo = '19ucs001' and CourseID = '1000';

update Takes
set MarksObtained = '7'
where CourseID = '1000' and ExamID = '101' and RollNo = '19ucs001';*/

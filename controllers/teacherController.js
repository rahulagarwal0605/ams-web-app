//jshint esversion:8
require("dotenv").config();

const db = require('../config/db');

exports.viewCoursesList = (req, res) => {
    var query="SELECT Course.CourseId, Course.CourseName, CourseInstructur.Session FROM Course inner join CourseInstructor on CourseInstructur.CourseId=Course.CourseId WHERE CourseInstructor.InstructorID =?";
    db.query(query,[req.userId],(err,results) => {
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
  var query="SELECT Takes.MarksObtained,Exams.ExamName FROM Takes inner join Exams on Takes.ExamID=Exams.ExamID WHERE Takes.CourseID =? and Takes.RollNo=?";
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

exports.getEvaluationScheme = (req, res) => {
    var query="SELECT DISTINCT Exams.ExamId, Exams.ExamName, Exams.ExamDate, Exams.TotalMarks, Exams.Weightage  FROM Exams inner join Takes on Takes.ExamID=Exams.ExamID WHERE Takes.CourseID =?";
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



function setExam(ExamName, MaximumMarks, Weightage, cid, res, callback) {
  var query="Insert into Exams(ExamName, TotalMarks, Weightage) values (?, ?, ?); Select ExamId from Exams order by ExamId desc limit 1";
    db.query(query,[ExamName, MaximumMarks, Weightage],(err,results) => {
      // All Error handling will be done later
        if(err){
          console.log(err);
        }
        if(results!=undefined){
          callback(results[1][0].ExamId, cid, res, setTakes);
        }
      }
    );
}

function getStudentList(examId, cid, res, callback) {
  var query="SELECT Student.RollNo FROM Enrolled inner join Student on Enrolled.RollNo=Student.RollNo WHERE Enrolled.CourseID =?";
    db.query(query,[cid],(err,results) => {
        // All Error handling will be done later
        if(err){
            console.log(err);
        }
        if(results!=undefined){
          callback(examId, cid, res, results);
        }
      }
    );
}

function setTakes(examId, cid, res, results) {
  let takes = [];
  for(let i=0; i<results.length; i++) {
    takes.push([cid, examId, results[i].RollNo, 0]);
  }
  var query="Insert into Takes(CourseId, ExamId, RollNo, MarksObtained) values ?";
    db.query(query,[takes],(err,results) => {
      // All Error handling will be done later
        if(err){
            console.log(err);
            res.json({
              status: "error",
              data:null,
              message:"Error occured"
            });
        }
        else {
          res.json({
            status: "success",
            data:null,
            message:"Evaluation Scheme set successfully"
          });
        }
      }
    );
}

exports.setEvaluationSceheme = (req, res) => {
  setExam(req.body.ExamName, req.body.MaximumMarks, req.body.Weightage, req.params.cid, res, getStudentList);
};

exports.editEvaluationSceheme = (req, res) => {
  var query="update into Exams set ExamName = ?, TotalMarks = ?, Weightage = ? WHERE ExamId =?";
    db.query(query,[req.body.ExamName, req.body.MaximumMarks, req.body.Weightage, req.body.ExamID],(err,results) => {
        // All Error handling will be done later
        if(err){
            console.log(err);
        }
        if(results!=undefined){
          callback(examId, cid, res, results);
        }
      }
    );
};

exports.deleteEvaluationSceheme = (req, res) => {
  var query="delete from Takes where ExamId = ?";
    db.query(query,[req.body.ExamId],(err,results) => {
        // All Error handling will be done later
        if(err){
            console.log(err);
        }
        else {
          query="delete from Exams where ExamId = ?";
          db.query(query,[req.body.ExamId],(err,results) => {
              // All Error handling will be done later
              if(err){
                  console.log(err);
              }
              else {
                res.json({
                  status: "success",
                  data:null,
                  message:"Exam component deleted successfully"
                });
              }
            }
          );
        }
      }
    );
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

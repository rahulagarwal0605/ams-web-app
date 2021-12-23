//jshint esversion:8
require("dotenv").config();
const e = require("express");
const math = require('mathjs');

const db = require('../config/db');

exports.viewCoursesList = (req, res) => {
    var query="SELECT Course.CourseId, Course.CourseName, CourseInstructor.Session FROM Course inner join CourseInstructor on CourseInstructor.CourseId=Course.CourseId WHERE CourseInstructor.InstructorID =? and CourseType = ?";
    db.query(query,[req.userId, req.query.courseType],(err,results) => {
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

exports.setOtherCourseGrades = (req, res) => {
  var query = "update Enrolled set grades = ? where RollNo = ? and CourseID = ?"
  db.query(query,[req.body.grade, req.body.RollNo, req.params.cid], (err, results) => {
    if(err) {
      console.log(err);
    }
    else {
      res.json({
        status: "success",
        data:results,
        message: "Grade successfully updated"
      });
    }
  });
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
  var query="update Exams set ExamName = ?, TotalMarks = ?, Weightage = ? WHERE ExamId =?";
    db.query(query,[req.body.ExamName, req.body.MaximumMarks, req.body.Weightage, req.body.ExamID],(err,results) => {
        // All Error handling will be done later
        if(err){
            console.log(err);
        }
        else {
          res.json({
            status: "success",
            data:null,
            message:"Exam component edited successfully"
          });
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

exports.getGradeDetails = (req, res) => {
  var query="Select Distinct RollNo from takes where courseID = ?";
  db.query(query, req.params.cid, (err,results1) => {
    // All Error handling will be done later
    if(err){
      console.log(err);
    }
    else {
      console.log(results1);
      let studentMarks = [];
      for(let i=0; i<results1.length; i++) {
        query = "select sum(MarksObtained) as MarksObtained from takes where RollNo = ? and CourseID = ?";
        db.query(query , [results1[i].RollNo, req.params.cid], (err,results2) => {
          if(err) {
            console.log(err);
          }
          else {
            console.log(results2);
            query = "update Enrolled set totalMarks = ? where RollNo = ? and CourseID = ?"
            db.query(query, [results2[0].MarksObtained, results1[i].RollNo, req.params.cid], (err,results3) => {
              if(err) {
                console.log(err);
              }
              else{
                studentMarks.push(results2[0].MarksObtained);
                if(i==results1.length-1)
                  returnGradeDetails(res,studentMarks);
              }
            });
          }
        });
      }

    }
  });
}


function returnGradeDetails(res,studentMarks){
  let avg = math.mean(studentMarks);

  let std = math.std(studentMarks);
  console.log(avg, std, studentMarks);

  let gradeDetails = {

    "A" : [Math.min(avg+(1.5*std),100), 100],
    "AB" : [Math.min(avg+std,100), Math.min(avg+(1.5*std),100)],
    "B" : [Math.min(avg+(0.5*std),100), Math.min(avg+std,100)],
    "BC" : [avg, Math.min(avg+(0.5*std),100)],
    "C" : [Math.max(avg-(0.5*std),0), avg],
    "CD" : [Math.max(avg-std,0), Math.max(avg-(0.5*std),0)],
    "D" : [Math.max(avg-(1.5*std),0),Math.max( avg-std,0)],
    "F" : [0, Math.max(avg-(1.5*std),0)]
  }
  res.json({
    status: "success",
    data: gradeDetails,
    message:null
  });
}

exports.setGrades = (req, res) => {
  var query="Select RollNo and TotalMarks as MarksObtained from enrolled where courseID = ?";
  db.query(query, req.params.cid, (err,results1) => {
    // All Error handling will be done later
    if(err){
      console.log(err);
    }
    else {
      let studentGrades = [];
      for(let i=0; i<results1.length; i++) {
        let grade;
        if(results1[i].MarksObtained>=req.body.A[0] && results1[i].MarksObtained<=req.body.A[1]) {
          grade = "A";
        }
        else if(results1[i].MarksObtained>=req.body.AB[0] && results1[i].MarksObtained<req.body.AB[1]) {
          grade = "AB";
        }
        else if(results1[i].MarksObtained>=req.body.B[0] && results1[i].MarksObtained<req.body.B[1]) {
          grade = "B";
        }
        else if(results1[i].MarksObtained>=req.body.BC[0] && results1[i].MarksObtained<req.body.BC[1]) {
          grade = "BC";
        }
        else if(results1[i].MarksObtained>=req.body.C[0] && results1[i].MarksObtained<req.body.C[1]) {
          grade = "C";
        }
        else if(results1[i].MarksObtained>=req.body.CD[0] && results1[i].MarksObtained<req.body.CD[1]) {
          grade = "CD";
        }
        else if(results1[i].MarksObtained>=req.body.D[0] && results1[i].MarksObtained<req.body.D[1]) {
          grade = "D";
        }
        else if(results1[i].MarksObtained>=req.body.F[0] && results1[i].MarksObtained<req.body.F[1]) {
          grade = "F";
        }
        studentGrades.push([grade, results1[i].sid, req.params.cid]);
      }
      query = "update Enrolled set Grades = ? where RollNo = ? and courseID = ?"
      db.query(query, [studentGrades, results1[i].sid, req.params.cid], (err,results2) => {
        if(err) {
          console.log(err);
        }
        else {
          res.json({
            status: "success",
            data: null,
            message:"Student grades updated successfully"
          });
        }
      });
    }
  });
}

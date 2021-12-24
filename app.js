// jshint esversion:9

const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const loginRoutes = require("./routes/loginRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const apiErrorHandler = require("./middlewares/ErrorHandler");
const PORT = process.env.PORT || 3000;
const path = require('path');
const app = express();


dotenv.config({ path: "./.env" });

app.use(cors({
   credentials : true,
   origin: ['http://localhost:3006', 'https://gradingsystem.netlify.app', 'https://61c5b5196af1e000077a2c75--gradingsystem.netlify.app']
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.text());

app.use(cookieParser());

app.use("/api/teacher", teacherRoutes);

app.use("/api/student", studentRoutes);

app.use("/api", loginRoutes);
//app.use(apiErrorHandler);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const loginRoutes = require("./routes/loginRoutes");
const teacherRoutes = require("./routes/teacherRoutes")
const PORT = process.env.PORT;
const path = require('path');
const app = express();

dotenv.config({ path: "./.env" });

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.text());

app.use("/api/teacher", teacherRoutes);

app.use("/api", loginRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
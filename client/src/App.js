import './App.css';
import React from 'react';
import Main from "./components/Main.js";
import CourseList from "./components/CourseList.js";
import MenuInstructor from "./components/MenuInstructor.js";
import EvaluationScheme from "./components/EvaluationScheme.js";
import MarkEntryInternal from "./components/MarkEntryInternal.js";
import MarkEntryEndterm from "./components/MarkEntryEndterm.js";
import SuccessLogin from "./components/SuccessLogin.js";
import { Route, Routes } from "react-router-dom"
import Btp from "./components/Btp";
import authContext from "./context/userContext";

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <div className="App" style={{ display: 'flex' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/successlogin' element={<SuccessLogin />} />
          <Route path="/MenuInstructor" element={<MenuInstructor />} />
          <Route path="/MenuInstructor/CourseListEvaluationScheme" element={<CourseList page="EvaluationScheme" list="EvaluationScheme" />} />
          <Route path="/MenuInstructor/CourseListInternal" element={<CourseList page="MarkEntryInternal" list="Internal" />} />
          <Route path="/MenuInstructor/CourseListEndterm" element={<CourseList page="MarkEntryEndterm" list="Endterm" />} />
          <Route path="/MenuInstructor/CourseListEvaluationScheme/EvaluationScheme" element={<EvaluationScheme />} />
          <Route path="/MenuInstructor/CourseListInternal/MarkEntryInternal" element={<MarkEntryInternal />} />
          <Route path="/MenuInstructor/CourseListEndterm/MarkEntryEndterm" element={<MarkEntryEndterm />} />
          <Route path="/MenuInstructor/CourseListBtp" element={<CourseList page="BTP" list="BTP" />} />
          <Route path="/MenuInstructor/CourseListBtp/Btp" element={<Btp />} />

        </Routes>

      </div>
    </authContext.Provider >
  );
}

export default App;

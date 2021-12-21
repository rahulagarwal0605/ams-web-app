import './App.css';
import React from 'react';
import Main from "./components/Main.js";
import CourseList from "./components/CourseList.js";
import MenuInstructor from "./components/MenuInstructor.js";
import userContext from "./context/userContext";
import EvaluationScheme from "./components/EvaluationScheme.js";
import MarkEntryInternal from "./components/MarkEntryInternal.js";
import MarkEntryEndterm from "./components/MarkEntryEndterm.js";
import { useNavigate, Route, Routes } from "react-router-dom"

function App() {
  let history = useNavigate();

  const [teacherId, setTeacherId] = React.useState('');
  const value = React.useMemo(
    () => ({ teacherId, setTeacherId }),
    [teacherId]
  );

  React.useEffect(() => {
    history("/login")
  }, [])

  return (
    <userContext.Provider value={value}>
      <div className="App" style={{ display: 'flex' }}>
        <Routes>
          <Route path="/login" element={<Main />} />
          <Route path="/MenuInstructor" element={<MenuInstructor />} />
          <Route path="/MenuInstructor/CourseListEvaluationScheme" element={<CourseList page="EvaluationScheme" list="EvaluationScheme" />} />
          <Route path="/MenuInstructor/CourseListInternal" element={<CourseList page="MarkEntryInternal" list="Internal" />} />
          <Route path="/MenuInstructor/CourseListEndterm" element={<CourseList page="MarkEntryEndterm" list="Endterm" />} />
          <Route path="/MenuInstructor/CourseListEvaluationScheme/EvaluationScheme" element={<EvaluationScheme />} />
          <Route path="/MenuInstructor/CourseListInternal/MarkEntryInternal" element={<MarkEntryInternal />} />
          <Route path="/MenuInstructor/CourseListEndterm/MarkEntryEndterm" element={<MarkEntryEndterm />} />
        </Routes>

      </div>
    </userContext.Provider>
  );
}

export default App;

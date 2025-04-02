import { useEffect, useState } from "react";
import axios from "axios";
import { SchoolYear, Subject, Chapter } from "./types";
import YearSelector from "./components/YearSelector";
import SubjectSelector from "./components/SubjectSelector";
import ChapterSelector from "./components/ChapterSelector";

function App() {
  const [years, setYears] = useState<SchoolYear[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");

  // Charger les années au démarrage
  useEffect(() => {
    axios.get("/api/years").then((res) => setYears(res.data));
  }, []);

  // Charger les matières en fonction de l’année
  useEffect(() => {
    if (selectedYear) {
      axios
        .get(`/api/subjects?yearId=${selectedYear}`)
        .then((res) => setSubjects(res.data));
      setSelectedSubject("");
      setSelectedChapter("");
      setChapters([]);
    }
  }, [selectedYear]);

  // Charger les chapitres en fonction de la matière
  useEffect(() => {
    if (selectedSubject) {
      axios
        .get(`/api/chapters?subjectId=${selectedSubject}`)
        .then((res) => setChapters(res.data));
      setSelectedChapter("");
    }
  }, [selectedSubject]);

  return (
    <div className="app-container">
      <h1>SmartTutor AI</h1>

      <YearSelector
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {selectedYear && (
        <SubjectSelector
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      )}
      {selectedSubject && (
        <ChapterSelector
          chapters={chapters}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
        />
      )}

      {selectedChapter && (
        <button
          onClick={() =>
            console.log("Appel API avec le chapitre", selectedChapter)
          }
        >
          Lancer le chatbot
        </button>
      )}
    </div>
  );
}

export default App;

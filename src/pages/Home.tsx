import { useEffect, useState } from "react";
import axios from "axios";
import { SchoolYear, Subject, Chapter } from "../types";
import YearSelector from "../components/YearSelector";
import SubjectSelector from "../components/SubjectSelector";
import ChapterSelector from "../components/ChapterSelector";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [years, setYears] = useState<SchoolYear[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/annees").then((res) => setYears(res.data));
  }, []);

  useEffect(() => {
    if (selectedYear) {
      axios
        .get(`/api/matieres?annee_id=${selectedYear}`)
        .then((res) => setSubjects(res.data));
      setSelectedSubject("");
      setSelectedChapter("");
      setChapters([]);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedSubject) {
      axios
        .get(`/api/chapitres?matiere_id=${selectedSubject}`)
        .then((res) => setChapters(res.data));
      setSelectedChapter("");
    }
  }, [selectedSubject]);

  return (
    <div className="app-container">
      <h1>SmartTutor AI</h1>
      <button onClick={() => navigate("/admin")}>Espace admin</button>

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
};

export default Home;

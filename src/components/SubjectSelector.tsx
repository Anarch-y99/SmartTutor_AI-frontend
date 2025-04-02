import { Subject } from "../types";

interface Props {
  subjects: Subject[];
  selectedSubject: string;
  setSelectedSubject: (subjectId: string) => void;
}

const SubjectSelector = ({
  subjects,
  selectedSubject,
  setSelectedSubject,
}: Props) => (
  <div>
    <label htmlFor="subject">Matière :</label>
    <select
      id="subject"
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
    >
      <option value="">-- Choisir une matière --</option>
      {subjects.map((s) => (
        <option key={s.id} value={s.id}>
          {s.label}
        </option>
      ))}
    </select>
  </div>
);

export default SubjectSelector;

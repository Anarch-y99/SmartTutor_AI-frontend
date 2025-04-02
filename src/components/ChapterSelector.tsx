import { Chapter } from "../types";

interface Props {
  chapters: Chapter[];
  selectedChapter: string;
  setSelectedChapter: (chapterId: string) => void;
}

const ChapterSelector = ({
  chapters,
  selectedChapter,
  setSelectedChapter,
}: Props) => (
  <div>
    <label htmlFor="chapter">Chapitre :</label>
    <select
      id="chapter"
      value={selectedChapter}
      onChange={(e) => setSelectedChapter(e.target.value)}
    >
      <option value="">-- Choisir un chapitre --</option>
      {chapters.map((c) => (
        <option key={c.id} value={c.id}>
          {c.title}
        </option>
      ))}
    </select>
  </div>
);

export default ChapterSelector;

import { SchoolYear } from "../types";

interface Props {
  years: SchoolYear[];
  selectedYear: string;
  setSelectedYear: (yearId: string) => void;
}

const YearSelector = ({ years, selectedYear, setSelectedYear }: Props) => (
  <div>
    <label htmlFor="year">Année scolaire :</label>
    <select
      id="year"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      <option value="">-- Choisir une année --</option>
      {years.map((y) => (
        <option key={y.id} value={y.id}>
          {y.label}
        </option>
      ))}
    </select>
  </div>
);

export default YearSelector;

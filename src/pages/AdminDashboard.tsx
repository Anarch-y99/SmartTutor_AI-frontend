import { useEffect, useState } from "react";
import axios from "axios";

interface Annee {
  id: number;
  nom: string;
}

const AdminDashboard = () => {
  const [annees, setAnnees] = useState<Annee[]>([]);
  const [nomAnnee, setNomAnnee] = useState("");

  useEffect(() => {
    axios
      .get("https://anarch-y-smarttutor-ai.hf.space/api/annees")
      .then((res) => {
        setAnnees(res.data);
      });
  }, []);

  const handleAddAnnee = () => {
    axios
      .post("https://anarch-y-smarttutor-ai.hf.space/api/annees", {
        nom: nomAnnee,
      })
      .then((res) => {
        setAnnees([...annees, res.data]);
        setNomAnnee("");
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://anarch-y-smarttutor-ai.hf.space/api/annees/${id}`)
      .then(() => {
        setAnnees(annees.filter((a) => a.id !== id));
      });
  };

  return (
    <div>
      <h2>Gestion des années</h2>
      <ul>
        {annees.map((a) => (
          <li key={a.id}>
            {a.nom}
            <button onClick={() => handleDelete(a.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={nomAnnee}
        onChange={(e) => setNomAnnee(e.target.value)}
        placeholder="Nouvelle année"
      />
      <button onClick={handleAddAnnee}>Ajouter</button>
    </div>
  );
};

export default AdminDashboard;

// src/types.ts

export interface SchoolYear {
  id: string;
  label: string; // ex : "3e secondaire", "5e secondaire"
}

export interface Subject {
  id: string;
  label: string; // ex : "Sciences", "Français"
  yearId: string; // référence à l’année
}

export interface Chapter {
  id: string;
  title: string;
  subjectId: string;
}

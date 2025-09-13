export interface User {
  isNewUser: boolean;
  class?: number;
  board?: string;
  stream?: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Topic {
  subjectId: string;
  title: string;
  description: string;
}

export interface Curriculum {
  boards: string[];
  classes: number[];
  streams: string[];
  subjects: Subject[];
  topics: Topic[];
}
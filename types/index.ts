export interface User {
  isNewUser: boolean;
  class?: number;
  board?: string;
  stream?: string;
}

export interface Subject {
  [subjectName: string]: {
    [topicName: string]: {
      chapters: number;
    };
  };
}

export interface ClassStructure {
  [className: string]: Subject;
}

export interface Curriculum {
  boards: string[];
  classes: ClassStructure;
  streams?: string[];
}

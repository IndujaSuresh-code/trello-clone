<<<<<<< HEAD
// types.ts
=======
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
export interface Comment {
  id: string;
  text: string;
  author: string;
  time: Date;
}

export interface CardData {
  id: string;
  text: string;
  isCompleted: boolean;
  description: string;
  comments: Comment[];
  isWatching: boolean;
}

export interface ListData {
  id: string;
  title: string;
  listColor: string;
  cards: CardData[];
<<<<<<< HEAD
}
export interface BackendComment {
  id: number;
  add_comment: string;
  author?: string;
  created_at?: string;
}
=======
}
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd

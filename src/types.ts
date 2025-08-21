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
}
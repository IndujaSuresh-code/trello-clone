import { serializable, alias, primitive, list, object } from "serializr";
import { Comment } from "./Comment";

export class Card {
  @serializable(primitive())
  id: string;

  @serializable(primitive())
  text: string;

  @serializable(primitive())
  isCompleted: boolean;

  @serializable(primitive())
  description: string;

  @serializable(list(object(Comment)))
  comments: Comment[];

  @serializable(primitive())
  isWatching: boolean;

  constructor(
    id: string,
    text: string,
    isCompleted: boolean,
    description: string,
    comments: Comment[],
    isWatching: boolean
  ) {
    this.id = id;
    this.text = text;
    this.isCompleted = isCompleted;
    this.description = description;
    this.comments = comments;
    this.isWatching = isWatching;
  }

  static schema() {
    return {
      id: alias("id", primitive()),
      text: alias("title", primitive()),
      isCompleted: primitive(),
      description: primitive(),
      comments: list(object(Comment)),
      isWatching: primitive(),
    };
  }
}
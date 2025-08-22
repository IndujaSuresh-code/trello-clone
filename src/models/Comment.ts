import { serializable, alias, primitive, date } from "serializr";

export class Comment {
  @serializable(primitive())
  id: string;

  @serializable(primitive())
  text: string;

  @serializable(primitive())
  author: string;

  @serializable(date()) 
  time: Date;

  constructor(id: string, text: string, author: string, time: Date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.time = time;
  }

  static schema() {
    return {
      id: alias("id", primitive()),
      text: alias("add_comment", primitive()),
      author: primitive(),
      time: date(), 
    };
  }
}

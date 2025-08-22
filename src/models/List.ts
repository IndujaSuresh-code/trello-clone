import { serializable, primitive, list, object } from "serializr";
import { Card } from "./Card";

export class List {
  @serializable(primitive())
  id: string;

  @serializable(primitive())
  title: string;

  @serializable(primitive())
  listColor: string;

  @serializable(list(object(Card)))
  cards: Card[];

  constructor(id: string, title: string, listColor: string, cards: Card[]) {
    this.id = id;
    this.title = title;
    this.listColor = listColor;
    this.cards = cards;
  }

  static schema() {
    return {
      id: primitive(),
      title: primitive(),
      listColor: primitive(),
      cards: list(object(Card)),
    };
  }
}
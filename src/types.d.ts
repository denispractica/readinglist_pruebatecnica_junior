export interface book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: author;
}
interface author {
  name: string;
  otherBooks: string[];
}

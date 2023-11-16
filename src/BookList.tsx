import { book } from "./types";
const BookList = ({
  book,
  setReadingList,
  readingList,
}: {
  book: book;
  setReadingList: (b: book[]) => void;
  readingList: book[];
}) => {
  const activeList = () => {
    setReadingList(readingList.filter((b) => b !== book));
    localStorage.removeItem(`${book.title}`);
  };
  return (
    <div
      className="w-24 h-36 flex flex-col cursor-crosshair hover:border-1 hover:border-red-600"
      onClick={activeList}
    >
      <img className="h-full w-full" src={book.cover} alt={book.title} />
    </div>
  );
};
export default BookList;

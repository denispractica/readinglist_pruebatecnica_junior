import { useEffect, useState } from "react";
import { book } from "./types";
const Book = ({
  book,
  setReadingList,
  readingList,
}: {
  book: book;
  setReadingList: (b: book[]) => void;
  readingList: book[];
}) => {
  const [active, setActive] = useState(false);

  const activeList = () => {
    if (!active) {
      setReadingList([...readingList, book]);
      localStorage.setItem(`${book.title}`, book.cover);
      setActive(true);
    }
  };
  useEffect(() => {
    if (readingList.includes(book)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [readingList]);
  return (
    <div
      className={`w-28 h-40 flex flex-col cursor-pointer ${
        active ? "opacity-10" : "hover:opacity-60 "
      }`}
      onClick={activeList}
    >
      <img className="h-full w-full" src={book.cover} alt={book.title} />
    </div>
  );
};
export default Book;

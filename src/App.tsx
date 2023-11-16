import { useEffect, useState } from "react";
import books from "./books/books.json";
import Book from "./Book";
import BookList from "./BookList";
import { book } from "./types";
const App = () => {
  const [valorRange, setValorRange] = useState(0);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);
  const [genre, setGenre] = useState<string[]>([]);
  const [actualBooks, setActualBooks] = useState(books.library);
  const [actualGenre, setActualGenre] = useState("Todos");
  const [actualPages, setActualPages] = useState(43);
  const [readingList, setReadingList] = useState<book[]>([]);
  const setRangos = () => {
    let auxMin = books.library[0].book.pages;
    let auxMax = books.library[0].book.pages;
    for (let i = 0; i < books.library.length; i++) {
      if (books.library[i].book.pages < auxMin) {
        auxMin = books.library[i].book.pages;
      }
      if (books.library[i].book.pages > auxMax) {
        auxMax = books.library[i].book.pages;
      }
    }
    setMaxRange(auxMax);
    setMinRange(auxMin);
    setValorRange(auxMin);
  };
  const setGenreFilter = () => {
    const allGenre = books.library.map((g) => g.book.genre);
    setGenre([...new Set(allGenre)]);
  };

  const filterBooks = (filter: string) => {
    if (filter === "Todos") {
      setActualBooks(books.library.filter((b) => b.book.pages >= actualPages));
    } else {
      setActualBooks(
        books.library.filter(
          (b) => b.book.genre === filter && b.book.pages >= actualPages
        )
      );
    }
    setActualGenre(filter);
  };
  const filterPages = (number: number) => {
    if (actualGenre === "Todos") {
      setActualBooks(books.library.filter((b) => b.book.pages >= number));
    } else {
      setActualBooks(
        books.library.filter(
          (b) => b.book.pages >= number && b.book.genre === actualGenre
        )
      );
    }
    setValorRange(number);
    setActualPages(number);
  };
  useEffect(() => {
    setRangos();
    setGenreFilter();
    setReadingList(
      books.library
        .filter((f) => f.book.cover === localStorage.getItem(f.book.title))
        .map((m) => m.book)
    );
  }, []);
  return (
    <main className="h-screen w-full flex ">
      <article className="p-20 flex flex-col items-center">
        <div>
          <h1 className="text-white font-bold font-mono text-4xl">{` ${
            books.library.length - readingList.length
          } libros disponibles`}</h1>
          {readingList.length > 0 && (
            <h1 className="text-white font-bold font-mono text-xl">{` ${readingList.length} en la lista de lectura`}</h1>
          )}
        </div>
        <section className="flex justify-between w-full m-10 items-center">
          <div className="text-white font-bold font-mono text-2xl flex flex-col">
            <label>Filtrar por páginas</label>
            <span className="flex">
              <input
                type="range"
                max={maxRange}
                min={minRange}
                value={valorRange}
                onChange={(e) => filterPages(Number(e.target.value))}
              />
              {valorRange}
            </span>
          </div>

          <div className="text-white font-bold font-mono text-2xl flex flex-col">
            <label>Filtrar por género</label>
            <select
              name="genero"
              className="text-white bg-transparent"
              onChange={(e) => filterBooks(e.target.value)}
            >
              <option>Todos</option>
              {genre.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </section>
        <section className="grid grid-cols-4 gap-10">
          {actualBooks.map((b) => (
            <Book
              key={b.book.ISBN}
              book={b.book}
              setReadingList={setReadingList}
              readingList={readingList}
            />
          ))}
        </section>
      </article>
      {readingList.length > 0 && (
        <article className="p-20 w-2/4 flex flex-col items-center">
          <h1 className="text-white font-bold font-mono text-4xl">
            Lista de Lectura
          </h1>
          <section className="h-3/4 w-full border border-gray-400 rounded-lg overflow-auto grid grid-cols-5 gap-8 p-10">
            {readingList.map((b) => (
              <BookList
                key={b.ISBN}
                book={b}
                setReadingList={setReadingList}
                readingList={readingList}
              />
            ))}
          </section>
        </article>
      )}
    </main>
  );
};

export default App;

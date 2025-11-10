import React, {createContext, useState} from 'react';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Silent Sea',
      author: 'Clive Cussler',
      image: 'https://i.imgur.com/DvpvklR.png',
      isNew: true,
      description:
        'Uma emocionante aventura marítima cheia de mistério e ação.',
      genre: 'Aventura',
    },
    {
      id: 2,
      title: 'Winds of Winter',
      author: 'George R. R. Martin',
      image: 'https://i.imgur.com/j0j8j8P.png',
      isNew: true,
      description:
        'Continuação épica da saga dos Sete Reinos, cheia de intrigas e reviravoltas.',
      genre: 'Fantasia',
    },
    {
      id: 3,
      title: 'Digital Fortress',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/8Km9tLL.png',
      isNew: true,
      description:
        'Thriller tecnológico sobre criptografia e segredos do governo.',
      genre: 'Thriller',
    },
    // ... (mantém todos os outros livros que você já tem)
  ]);

  // Seus livros pessoais (por exemplo, já alugados anteriormente)
  const [myBooks, setMyBooks] = useState([
    {
      title: 'Just My Type',
      author: 'Simon Garfield',
      image: 'https://i.imgur.com/j0j8j8P.png',
      returnDate: 'Return until 25.03.2020',
      progress: 0.7,
    },
    {
      title: 'Life Lessons',
      author: 'Jane Smith',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
    {
      title: 'The Explorer',
      author: 'Carl Sagan',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
  ]);

  // 🔥 Novo estado para livros alugados
  const [rentedBooks, setRentedBooks] = useState([]);

  // 👉 Alugar um livro (adiciona no carrinho)
  const rentBook = book => {
    const alreadyRented = rentedBooks.find(b => b.id === book.id);
    if (!alreadyRented) {
      setRentedBooks([...rentedBooks, book]);
    }
  };

  // 👉 Verificar se um livro já está alugado
  const isBookRented = bookId => {
    return rentedBooks.some(b => b.id === bookId);
  };

  // 👉 (Opcional) Devolver um livro
  const returnBook = bookId => {
    setRentedBooks(rentedBooks.filter(b => b.id !== bookId));
  };

  return (
    <DadosContext.Provider
      value={{
        books,
        setBooks,
        myBooks,
        setMyBooks,
        rentedBooks,
        rentBook,
        isBookRented,
        returnBook, // opcional, caso queira devolver
      }}>
      {children}
    </DadosContext.Provider>
  );
};

export default DadosContext;

import React, {createContext, useState} from 'react';
import booksData from '../data/booksData.json';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState(booksData);
  const [cart, setCart] = useState([]);

  // Seus livros alugados atualmente
  const [myBooks, setMyBooks] = useState([]);

  // 🔥 Novo estado para livros alugados (histórico completo)
  const [rentedBooks, setRentedBooks] = useState([]);

  // 👉 Adicionar ao carrinho (evita duplicados)
  const addToCart = book => {
    setCart(prev =>
      prev.find(b => b.id === book.id) ? prev : [...prev, book],
    );
  };

  // 🗑️ Remover livro do carrinho
  const removeFromCart = bookId => {
    setCart(cart.filter(b => b.id !== bookId));
  };
  // ✅ Verificar se um livro já foi alugado
  const isBookRented = bookId => {
    return myBooks.some(b => b.id === bookId && !b.returned);
  };

  // ✅ Finalizar aluguel (transforma carrinho em histórico)
  const confirmRent = () => {
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 7); // 7 dias de aluguel

    const rented = cart.map(book => ({
      ...book,
      rentDate: today.toISOString(),
      returnDate: returnDate.toISOString(),
      returned: false,
      rentalId: Date.now() + Math.random(), // ID único do aluguel
    }));
    // Adiciona os novos livros ao histórico
    setMyBooks(prev => [...prev, ...rented]);

    // Limpa o carrinho
    setCart([]);
  };

  // 🔄 Devolver livro
  const returnBook = rentalId => {
    setMyBooks(prev =>
      prev.map(b => (b.rentalId === rentalId ? {...b, returned: true} : b)),
    );
  };
  return (
    <DadosContext.Provider
      value={{
        books,
        setBooks,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        confirmRent,
        myBooks,
        setMyBooks,
        returnBook,
        rentedBooks,
        setRentedBooks,
        isBookRented,
      }}>
      {children}
    </DadosContext.Provider>
  );
};

export default DadosContext;

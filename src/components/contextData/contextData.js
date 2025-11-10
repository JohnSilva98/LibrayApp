import React, {createContext, useState} from 'react';
import booksData from '../data/booksData.json';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState(booksData);
  const [cart, setCart] = useState([]);

  // Livros atualmente alugados (ativos)
  const [myBooks, setMyBooks] = useState([]);

  // Histórico completo de aluguéis (ativos + devolvidos)
  const [history, setHistory] = useState([]);

  // 👉 Adicionar ao carrinho (evita duplicados)
  const addToCart = book => {
    setCart(prev =>
      prev.find(b => b.id === book.id) ? prev : [...prev, book],
    );
  };

  // 🗑️ Remover livro do carrinho
  const removeFromCart = bookId => {
    setCart(cart => cart.filter(b => b.id !== bookId));
  };

  // ✅ Verificar se um livro já foi alugado e ainda não devolvido
  const isBookRented = bookId => {
    return myBooks.some(b => b.id === bookId && !b.returned);
  };

  // ✅ Finalizar aluguel (confirma carrinho → meus livros e histórico)
  const confirmRent = () => {
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 7); // 7 dias de aluguel

    const rented = cart.map(book => ({
      ...book,
      rentDate: today.toISOString(),
      returnDate: returnDate.toISOString(),
      returned: false,
      rentalId: Date.now() + Math.random(), // ID único
    }));

    // adiciona aos livros atuais e ao histórico
    setMyBooks(prev => [...prev, ...rented]);
    setHistory(prev => [...prev, ...rented]);

    // limpa o carrinho
    setCart([]);
  };

  // 🔄 Devolver livro
  const returnBook = rentalId => {
    // Localiza o livro devolvido
    const returnedBook = myBooks.find(b => b.rentalId === rentalId);
    if (!returnedBook) return;

    // Atualiza lista de alugados (marca como devolvido)
    setMyBooks(
      prev => prev.filter(b => b.rentalId !== rentalId), // remove da tela "Meus Livros"
    );

    // Atualiza histórico: marca como devolvido
    setHistory(prev =>
      prev.map(b =>
        b.rentalId === rentalId
          ? {...b, returned: true, returnDate: new Date().toISOString()}
          : b,
      ),
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
        history,
        setHistory,
        isBookRented,
      }}>
      {children}
    </DadosContext.Provider>
  );
};

export default DadosContext;

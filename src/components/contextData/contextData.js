import React, {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState([]); // Começa vazio
  const [cart, setCart] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. BUSCAR LIVROS DO BACKEND ---
  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get('http://10.215.36.185:8080/livros');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  }, []);

  // Carrega os livros assim que o App abre
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // --- 2. ADICIONAR AO CARRINHO ---
  const addToCart = book => {
    setCart(prev =>
      prev.find(b => b.id === book.id) ? prev : [...prev, book],
    );
  };

  const removeFromCart = bookId => {
    setCart(prev => prev.filter(b => b.id !== bookId));
  };

  // --- 3. CONFIRMAR ALUGUEL (INTEGRAÇÃO COM JAVA) ---
  const confirmRent = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
        return;
      }

      // Para cada livro no carrinho, fazemos um POST para o endpoint de aluguel
      // Ajuste a URL abaixo conforme o seu Controller de Aluguéis no Spring
      for (const book of cart) {
        await axios.post(`http://10.215.36.185:8080/alugueis`, {
          usuarioId: userId,
          livroId: book.id,
        });
      }

      Alert.alert('Sucesso', 'Aluguel realizado com sucesso!');
      setCart([]); // Limpa carrinho
      fetchBooks(); // Atualiza lista (para marcar como indisponível)
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao processar aluguel no servidor.');
    }
  };

  return (
    <DadosContext.Provider
      value={{
        books,
        setBooks,
        fetchBooks,
        cart,
        addToCart,
        removeFromCart,
        confirmRent,
        myBooks,
        setMyBooks,
      }}>
      {children}
    </DadosContext.Provider>
  );
};

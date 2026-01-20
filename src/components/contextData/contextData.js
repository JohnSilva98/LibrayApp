import React, {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  // 1. Inicialize com array vazio para não misturar dados de teste com dados do banco
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    // Evita múltiplas chamadas simultâneas
    if (loading) return;

    try {
      setLoading(true);
      console.log('--- Buscando livros no Backend ---');
      const response = await axios.get('http://10.215.36.185:8080/livros');

      if (response.data) {
        console.log('Livros atualizados:', response.data.length);
        setBooks(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback sem dependências para a função ser estável

  // 2. O useEffect deve rodar APENAS uma vez no início
  useEffect(() => {
    fetchBooks();
  }, []); // [] garante que só rode ao montar o Provider

  const addToCart = book => {
    setCart(prev =>
      prev.find(b => b.id === book.id) ? prev : [...prev, book],
    );
  };

  const removeFromCart = bookId => {
    setCart(prev => prev.filter(b => b.id !== bookId));
  };

  const confirmRent = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não identificado.');
        return;
      }

      for (const book of cart) {
        const payload = {
          idUsuario: parseInt(userId),
          idLivro: parseInt(book.id),
        };
        await axios.post(`http://10.215.36.185:8080/alugueis`, payload);
      }

      Alert.alert('Sucesso', 'Aluguel realizado!');
      setCart([]);
      // Atualiza a lista após o aluguel
      fetchBooks();
    } catch (error) {
      console.error('Erro no aluguel:', error.response?.data || error.message);
      Alert.alert('Erro', 'Falha ao processar aluguel.');
    }
  };

  return (
    <DadosContext.Provider
      value={{
        books,
        fetchBooks,
        cart,
        addToCart,
        removeFromCart,
        confirmRent,
        myBooks,
        setMyBooks,
        loading,
      }}>
      {children}
    </DadosContext.Provider>
  );
};

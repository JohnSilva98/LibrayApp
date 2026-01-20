import React, {createContext, useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState([
    {id: 1, nome: 'Teste de Conexão', autor: 'App', capaUrl: ''},
  ]); // Começa vazio
  const [cart, setCart] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. BUSCAR LIVROS DO BACKEND ---
  const fetchBooks = useCallback(async () => {
    try {
      console.log('Iniciando busca de livros...');
      const response = await axios.get('http://10.215.36.185:8080/livros');

      console.log('Livros recebidos do Java:', response.data.length);
      setBooks(response.data); // Aqui os livros entram no estado
    } catch (error) {
      console.error('Erro na conexão com o Backend:', error);
    }
  }, []);

  // Carrega os livros assim que o App abre
  useEffect(() => {
    fetchBooks();
  }, []);

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

      // Usamos um Loop para enviar cada livro separadamente
      for (const book of cart) {
        // O segredo está nestas chaves: devem ser idUsuario e idLivro
        const payload = {
          idUsuario: parseInt(userId),
          idLivro: parseInt(book.id),
        };

        console.log('Enviando para o servidor:', payload);

        await axios.post(`http://10.215.36.185:8080/alugueis`, payload);
      }

      Alert.alert('Sucesso', 'Aluguel realizado com sucesso!');
      setCart([]);
      fetchBooks(); // Isso vai atualizar o campo "disponivel" na Home
    } catch (error) {
      // Log detalhado para ver o que o Java respondeu no erro 400
      console.error('Erro detalhado:', error.response?.data);
      Alert.alert('Erro', 'Falha ao processar aluguel. Verifique os dados.');
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

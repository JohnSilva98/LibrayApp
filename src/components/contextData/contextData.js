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
  const [history, setHistory] = useState([]);
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

  const fetchMyRentedBooks = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.log('Usuário não identificado para carregar aluguéis');
        return;
      }

      console.log('Buscando aluguéis do usuário:', userId);
      const response = await axios.get(
        `http://10.215.36.185:8080/alugueis/usuario/${userId}`,
      );
      
      if (response.data) {
        console.log('Aluguéis encontrados:', response.data.length);
        // Processar dados para evitar referência circular
        const processedRentals = response.data
          .filter(rental => rental.status !== 'DEVOLVIDO')
          .map(rental => ({
          id: rental.livro.id,
          title: rental.livro.nome,
          author: rental.livro.autor,
          image: rental.livro.capaUrl,
          rentDate: rental.dataInicio,
          returnDate: rental.dataDevolucao,
          returned: rental.status === 'DEVOLVIDO',
          rentalId: rental.id,
        }));
        
        setMyBooks(processedRentals);
        console.log('Meus livros processados:', processedRentals);
      }
    } catch (error) {
      console.error('Erro ao buscar aluguéis:', error);
      console.error('Status do erro:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      setMyBooks([]);
    }
  }, []);

  const fetchRentalHistory = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.log('Usuário não identificado para carregar histórico');
        return;
      }

      console.log('Buscando histórico de aluguéis do usuário:', userId);
      const response = await axios.get(
        `http://10.215.36.185:8080/alugueis/usuario/${userId}`,
      );

      if (response.data) {
        const processedHistory = response.data.map(rental => ({
          id: rental.livro.id,
          title: rental.livro.nome,
          author: rental.livro.autor,
          image: rental.livro.capaUrl,
          rentDate: rental.dataInicio,
          returnDate: rental.dataDevolucao,
          returned: rental.status === 'DEVOLVIDO',
          rentalId: rental.id,
        }));
        setHistory(processedHistory);
      }
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      setHistory([]);
    }
  }, []);

  const returnBook = async (rentalId) => {
    try {
      console.log('Devolvendo livro com rentalId:', rentalId);
      
      // Atualizar status do aluguel para devolvido
      await axios.put(`http://10.215.36.185:8080/alugueis/${rentalId}`);
      
      Alert.alert('Sucesso', 'Livro devolvido com sucesso!');
      
      // Recarregar lista de aluguéis
      await fetchMyRentedBooks();
      await fetchRentalHistory();
      fetchBooks(); // Atualizar lista geral de livros
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      Alert.alert('Erro', 'Falha ao devolver livro.');
    }
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
        history,
        fetchRentalHistory,
        fetchMyRentedBooks,
        returnBook,
        loading,
      }}>
      {children}
    </DadosContext.Provider>
  );
};

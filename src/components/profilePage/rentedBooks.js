import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {DadosContext} from '../contextData/contextData';

const RentedBooks = () => {
  const {myBooks, returnBook, fetchMyRentedBooks} = useContext(DadosContext);

  useEffect(() => {
    console.log('RentedBooks montado, recarregando aluguéis...');
    fetchMyRentedBooks();
  }, []);

  useEffect(() => {
    console.log('myBooks atualizado:', myBooks);
  }, [myBooks]);

  const activeRentals = myBooks.filter(book => !book.returned);
  console.log('Aluguéis ativos:', activeRentals);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Meus Aluguéis</Text>
      <FlatList
        data={activeRentals}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={{uri: item.image}}
              style={{height: 150, marginBottom: 10}}
            />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text>Autor: {item.author}</Text>
            <Text>
              Data de aluguel: {new Date(item.rentDate).toLocaleDateString()}
            </Text>
            <Text>
              Devolução prevista:{' '}
              {new Date(item.returnDate).toLocaleDateString()}
            </Text>

            {!item.returned && (
              <TouchableOpacity
                style={styles.returnButton}
                onPress={() => returnBook(item.rentalId)}>
                <Text style={styles.returnText}>Devolver</Text>
              </TouchableOpacity>
            )}
            {item.returned && <Text style={styles.returned}>✅ Devolvido</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    color: '#ffc107',
    fontSize: 22,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  returnButton: {
    marginTop: 10,
    backgroundColor: '#ffc107',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  returnText: {
    color: '#000',
    fontWeight: '600',
  },
  returned: {
    color: '#0f0',
    marginTop: 10,
  },
});

export default RentedBooks;

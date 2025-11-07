import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Footer from '../footer/Footer';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {book} = route.params; // pegamos o livro passado via navegação

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>{book.title}</Text>
      </View>
      <Image source={{uri: book.image}} style={styles.image} />
      <Text style={styles.description}>{book.description}</Text>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f0ee', padding: 16},
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  title: {fontSize: 24, fontWeight: 'bold', color: '#111', marginLeft: 8},
  image: {width: '100%', height: 200, borderRadius: 12, marginBottom: 12},
  description: {fontSize: 16, color: '#555', lineHeight: 24},
});

export default BookDetails;

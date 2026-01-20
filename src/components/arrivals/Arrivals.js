// src/components/arrivals/Arrivals.js
import React, {useContext, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
  Easing,
} from 'react-native';
import Footer from '../footer/Footer';
import {DadosContext} from '../contextData/contextData';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyBooksExpandable from '../myBooks/myBooksExpand';

const Arrivals = () => {
  const {books, myBooks} = useContext(DadosContext);
  const navigation = useNavigation();

  const handleBookPress = book => {
    navigation.navigate('BookDetails', {book});
  };

  const newBooks = React.useMemo(() => {
    return Array.isArray(books) ? books.slice(0, 8) : [];
  }, [books]);
  const [expanded, setExpanded] = useState(false);
  const minHeight = 350;
  const maxHeight = 700;

  const expandAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,

      onPanResponderGrant: () => {
        // Set offset for smooth drag continuation
        expandAnim.setOffset(expandAnim._value || 0);
        expandAnim.setValue(0);
      },

      onPanResponderMove: Animated.event([null, {dy: expandAnim}], {
        useNativeDriver: false,
        listener: (_, gestureState) => {
          let animatedValue =
            (expandAnim._offset || 0) -
            gestureState.dy / (maxHeight - minHeight);
          animatedValue = Math.max(0, Math.min(1, animatedValue));
          expandAnim.setValue(animatedValue);
        },
      }),

      onPanResponderRelease: (_, gestureState) => {
        expandAnim.flattenOffset();

        const dragDistance = gestureState.dy;
        const dragVelocity = gestureState.vy;
        const swipeDown = dragDistance > 40 || dragVelocity > 0.4;
        const swipeUp = dragDistance < -40 || dragVelocity < -0.4;

        let shouldExpand = expanded;
        if (expanded && swipeDown) shouldExpand = false;
        else if (!expanded && swipeUp) shouldExpand = true;
        else shouldExpand = expandAnim._value > 0.5;

        Animated.spring(expandAnim, {
          toValue: shouldExpand ? 1 : 0,
          speed: 10,
          bounciness: 6,
          useNativeDriver: false,
        }).start(() => setExpanded(shouldExpand));
      },
    }),
  ).current;

  const heightInterpolate = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight],
  });

  return (
    // sessão livros novos
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.textNews}>
          <Text style={styles.newsStyle}>Novidades</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NewBooks')}>
            <Text style={styles.moreStyle}>Ver Mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.books}>
          <FlatList
            horizontal
            data={newBooks}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              // 2. Só renderiza se o item realmente existir
              if (!item) return null;
              return (
                <TouchableOpacity onPress={() => handleBookPress(item)}>
                  <BookCard data={item} />
                </TouchableOpacity>
              );
            }}
            // 3. A SEGURANÇA CHAVE: Opcional Chaining (?.) e Fallback para o ID
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
            contentContainerStyle={{paddingHorizontal: 10}}
          />
        </View>
      </View>

      <MyBooksExpandable myBooks={myBooks} navigation={navigation} />

      <Footer />
    </View>
  );
};

const BookCard = ({data}) => {
  // Se não houver dados, não renderiza nada para evitar crash
  if (!data) return null;

  return (
    <View style={styles.card}>
      <Image
        source={{uri: data.capaUrl || 'https://via.placeholder.com/150'}}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Usamos o operador ?. para evitar erros caso o campo venha nulo */}
      <Text style={styles.title} numberOfLines={1}>
        {data.nome || 'Sem título'}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {data.autor || 'Autor desconhecido'}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {backgroundColor: '#f1f0ee', flex: 1},
  container: {padding: 8},
  textNews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  newsStyle: {fontSize: 28, fontWeight: 'bold', color: '#111'},
  moreStyle: {fontSize: 20, fontWeight: '400', color: '#f08c13'},
  image: {height: 180, width: 120, borderRadius: 8, marginBottom: 8},
  card: {width: 140, alignItems: 'center'},
  books: {padding: 10},
  title: {fontSize: 18, fontWeight: '700', color: 'black', textAlign: 'center'},
  author: {fontSize: 14, color: '#555', textAlign: 'center'},
  myBooksContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
    marginTop: 10,
  },
  holder: {
    alignSelf: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  holderHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainBookCard: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  myBookImage: {width: 80, height: 120, borderRadius: 8},
  bookInfo: {marginLeft: 20, flex: 1},
  mainTitle: {fontSize: 24, fontWeight: 'bold', color: '#111'},
  mainAuthor: {fontSize: 18, color: '#555', marginBottom: 10},
  returnDate: {fontSize: 16, color: '#f08c13', marginBottom: 5},
  progressBarContainer: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {height: '100%', backgroundColor: '#f08c13'},
});

export default Arrivals;

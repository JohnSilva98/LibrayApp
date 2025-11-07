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

const Arrivals = () => {
  const {books, myBooks} = useContext(DadosContext);
  const navigation = useNavigation();

  const newBooks = books.filter(book => book.isNew).slice(0, 8);

  // ANIMAÇÃO DO PAINEL
  const [expanded, setExpanded] = useState(false);
  const minHeight = 350;
  const maxHeight = 700;
  const expandAnim = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      // NÂO ativar no start (permite que TouchableOpacity capture taps)
      onStartShouldSetPanResponder: () => false,
      // Ativa somente se for um movimento vertical significativo
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 8; // ajuste sensibilidade aqui
      },

      onPanResponderMove: (_, gestureState) => {
        let newHeight = expanded
          ? maxHeight - gestureState.dy
          : minHeight - gestureState.dy;
        newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
        expandAnim.setValue((newHeight - minHeight) / (maxHeight - minHeight));
      },

      onPanResponderRelease: (_, gestureState) => {
        const dragDistance = gestureState.dy;
        const dragVelocity = gestureState.vy;
        const swipeDown = dragDistance > 60 || dragVelocity > 0.6;
        const swipeUp = dragDistance < -60 || dragVelocity < -0.6;

        let shouldExpand = expanded;
        if (expanded && swipeDown) shouldExpand = false;
        else if (!expanded && swipeUp) shouldExpand = true;
        else {
          // decide pelo valor atual do animated
          const current = expandAnim.__getValue
            ? expandAnim.__getValue()
            : null;
          if (current !== null) shouldExpand = current > 0.5;
        }

        Animated.timing(expandAnim, {
          toValue: shouldExpand ? 1 : 0,
          duration: 260,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start();

        setExpanded(shouldExpand);
      },
    }),
  ).current;

  const heightInterpolate = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [minHeight, maxHeight],
  });

  // Render
  return (
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
            renderItem={({item}) => <BookCard data={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingHorizontal: 10}}
          />
        </View>
      </View>

      {/* Painel de Meus Livros */}
      <Animated.View
        style={[styles.myBooksContainer, {height: heightInterpolate}]}>
        <Text style={styles.sectionTitle}>Meus livros</Text>

        {/* Holder: TouchableOpacity para permitir onPress + panHandlers */}
        <View style={styles.holder} {...panResponder.panHandlers}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              const target = expanded ? 0 : 1;
              Animated.timing(expandAnim, {
                toValue: target,
                duration: 250,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
              }).start();
              setExpanded(!expanded);
            }}>
            <View style={styles.holderLine} />
          </TouchableOpacity>
        </View>

        {myBooks[0] && <MyBookCard data={myBooks[0]} />}

        {expanded && myBooks.length > 1 && (
          <SafeAreaView style={{flex: 1}}>
            <FlatList
              data={myBooks.slice(1)}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}
              renderItem={({item}) => <BookCard data={item} />}
              contentContainerStyle={{paddingBottom: 120}}
            />
          </SafeAreaView>
        )}
      </Animated.View>

      <Footer />
    </View>
  );
};

// COMPONENTES
const BookCard = ({data}) => (
  <View style={styles.card}>
    <Image source={{uri: data.image}} style={styles.image} />
    <Text style={styles.title}>{data.title}</Text>
    <Text style={styles.author}>{data.author}</Text>
  </View>
);

const MyBookCard = ({data}) => (
  <View style={styles.mainBookCard}>
    <Image source={{uri: data.image}} style={styles.myBookImage} />
    <View style={styles.bookInfo}>
      <Text style={styles.mainTitle}>{data.title}</Text>
      <Text style={styles.mainAuthor}>{data.author}</Text>
      {data.returnDate && (
        <Text style={styles.returnDate}>{data.returnDate}</Text>
      )}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {width: `${(data.progress ?? 0) * 100}%`},
          ]}
        />
      </View>
    </View>
  </View>
);

// ESTILOS
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
  holderLine: {width: 50, height: 10, borderRadius: 5, backgroundColor: '#ccc'},
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

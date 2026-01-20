import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MyBooksExpandable = ({myBooks, navigation}) => {
  const [expanded, setExpanded] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;
  const handleBookPress = book => {
    navigation.navigate('BookDetails', {book});
  };

  const toggleExpand = () => {
    Animated.spring(expandAnim, {
      toValue: expanded ? 0 : 1,
      speed: 12,
      bounciness: 8,
      useNativeDriver: false,
    }).start(() => setExpanded(!expanded));
  };

  const heightInterpolate = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [350, 700],
  });

  const formatDate = dateValue => {
    if (!dateValue) return '';
    const dateObj = new Date(dateValue);
    if (Number.isNaN(dateObj.getTime())) return '';
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Animated.View style={[styles.container, {height: heightInterpolate}]}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Meus livros</Text>
        <TouchableOpacity onPress={toggleExpand}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: expandAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}>
            <Icon name="chevron-up" size={30} color="#111" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {!expanded && myBooks[0] && (
        <MainBookCard data={myBooks[0]} formatDate={formatDate} />
      )}

      {expanded && myBooks.length > 0 && (
        <FlatList
          data={myBooks}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleBookPress(item)}>
              <BookCard data={item} formatDate={formatDate} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{paddingBottom: 120}}
        />
      )}
    </Animated.View>
  );
};
const MyBookCard = ({data, formatDate}) => (
  <View style={styles.mainBookCard}>
    <Image source={{uri: data.image}} style={styles.myBookImage} />
    <View style={styles.bookInfo}>
      <Text style={styles.mainTitle}>{data.title}</Text>
      <Text style={styles.mainAuthor}>{data.author}</Text>
      {data.returnDate && (
        <Text style={styles.returnDate}>{formatDate(data.returnDate)}</Text>
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
const BookCard = ({data}) => (
  <View style={styles.card}>
    <Image source={{uri: data.image}} style={styles.image} />
    <Text style={styles.title}>{data.title}</Text>
    <Text style={styles.author}>{data.author}</Text>
  </View>
);

const MainBookCard = ({data, formatDate}) => (
  <View style={styles.mainBookCard}>
    <Image source={{uri: data.image}} style={styles.myBookImage} />
    <View style={styles.bookInfo}>
      <Text style={styles.mainTitle}>{data.title}</Text>
      <Text style={styles.mainAuthor}>{data.author}</Text>
      {data.returnDate && (
        <Text style={styles.returnDate}>{formatDate(data.returnDate)}</Text>
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

const styles = StyleSheet.create({
  container: {
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
  header: {alignItems: 'center', marginBottom: 10},
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
  },
  card: {width: 140, alignItems: 'center'},
  image: {height: 180, width: 120, borderRadius: 8, marginBottom: 8},
  title: {fontSize: 16, fontWeight: '700', color: 'black', textAlign: 'center'},
  author: {fontSize: 14, color: '#555', textAlign: 'center'},
  mainBookCard: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  myBookImage: {width: 80, height: 120, borderRadius: 8},
  bookInfo: {marginLeft: 20, flex: 1},
  mainTitle: {fontSize: 22, fontWeight: 'bold', color: '#111'},
  mainAuthor: {fontSize: 18, color: '#555', marginBottom: 10},
  returnDate: {fontSize: 16, color: '#f08c13', marginBottom: 5},
  progressBarContainer: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  progressBar: {height: '100%', backgroundColor: '#f08c13'},
});

export default MyBooksExpandable;

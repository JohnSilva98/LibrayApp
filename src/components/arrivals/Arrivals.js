import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import Footer from '../footer/Footer';

class Arrivals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          title: 'muscle',
          author: 'Alan trotter',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'dominicana',
          author: 'Angie cruz',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'a new begining',
          author: 'david neeson',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'art of war',
          author: 'hideo kojima',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'f1',
          author: 'alan prost',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
      ],
      myBooks: [
        {
          title: 'Just My Type',
          author: 'Simon Garfield',
          image: 'https://i.imgur.com/j0j8j8P.png',
          returnDate: 'Return until 25.03.2020',
          progress: 0.7,
        },
        {
          title: 'Life Lessons',
          author: 'Jane Smith',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'The Explorer',
          author: 'Carl Sagan',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'Life Lessons',
          author: 'Jane Smith',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'The Explorer',
          author: 'Carl Sagan',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'Life Lessons',
          author: 'Jane Smith',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'The Explorer',
          author: 'Carl Sagan',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'Life Lessons',
          author: 'Jane Smith',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
        {
          title: 'The Explorer',
          author: 'Carl Sagan',
          image: 'https://i.imgur.com/DvpvklR.png',
        },
      ],
      expanded: false,
    };

    this.minHeight = 350;
    this.maxHeight = 700;
    this.expandAnim = new Animated.Value(0); // 0 = fechado, 1 = aberto

    // PanResponder aplicado em toda a área do painel
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newHeight = this.state.expanded
          ? this.maxHeight - gestureState.dy
          : this.minHeight - gestureState.dy;
        newHeight = Math.max(
          this.minHeight,
          Math.min(this.maxHeight, newHeight),
        );
        this.expandAnim.setValue(
          (newHeight - this.minHeight) / (this.maxHeight - this.minHeight),
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = (this.maxHeight - this.minHeight) / 2;
        const shouldExpand = this.state.expanded
          ? gestureState.dy < threshold
          : -gestureState.dy > threshold;

        Animated.timing(this.expandAnim, {
          toValue: shouldExpand ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }).start();

        this.setState({expanded: shouldExpand});
      },
    });
  }

  render() {
    const heightInterpolate = this.expandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [this.minHeight, this.maxHeight],
    });

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.textNews}>
            <Text style={styles.newsStyle}>Novidades</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.moreStyle}>Ver Mais</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.books}>
            <FlatList
              horizontal
              data={this.state.books}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <Books data={item} />}
            />
          </View>
        </View>

        {/* Painel de Meus Livros com drag em toda a área */}
        <Animated.View
          style={[styles.myBooksContainer, {height: heightInterpolate}]}
          {...this.panResponder.panHandlers} // <- drag aplicado aqui
        >
          <Text style={styles.sectionTitle}>Meus livros</Text>

          <View style={styles.holder}>
            <View style={styles.holderLine} />
          </View>

          {this.state.myBooks[0] && <MyBookCard data={this.state.myBooks[0]} />}

          {this.state.expanded && this.state.myBooks.length > 1 && (
            <FlatList
              data={this.state.myBooks.slice(1)}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2} // 4 itens por linha
              contentContainerStyle={styles.extraBooksContainer}
              renderItem={({item}) => <Books data={item} />}
            />
          )}
        </Animated.View>

        <Footer />
      </View>
    );
  }
}

// =================== COMPONENTES INTERNOS ===================
class Books extends Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.card}>
        <Image source={{uri: data.image}} style={styles.image} />
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.author}>{data.author}</Text>
      </View>
    );
  }
}

class MyBookCard extends Component {
  render() {
    const {data} = this.props;
    return (
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
  }
}

// =================== ESTILOS ===================
const styles = StyleSheet.create({
  screen: {backgroundColor: '#f1f0ee', flex: 1},
  container: {padding: 8},
  textNews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  newsStyle: {fontSize: 28, fontWeight: 'bold', color: '#111111'},
  moreStyle: {fontSize: 20, fontWeight: '400', color: '#f08c13'},
  image: {height: 180, width: 120, borderRadius: 8, marginBottom: 8},
  card: {width: 140, marginRight: 10, alignItems: 'center'},
  books: {padding: 10, marginRight: 5, height: 150},
  title: {fontSize: 20, fontWeight: '800', textAlign: 'left', color: 'black'},
  author: {fontSize: 16, fontWeight: '500', color: '#555'},
  myBooksContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: -70,
    left: 0,
    right: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 10,
    marginTop: 10,
  },
  holder: {alignSelf: 'center', marginBottom: 20, paddingVertical: 5},
  holderLine: {width: 40, height: 5, borderRadius: 3, backgroundColor: '#ccc'},
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
  extraBooksContainer: {paddingVertical: 10},
});

export default Arrivals;

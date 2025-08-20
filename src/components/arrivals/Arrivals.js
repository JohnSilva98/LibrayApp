import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

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
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textNews}>
          <Text style={styles.newsStyle}>Novidades</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.moreStyle}>Ver Mais</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.books}>
          <FlatList
            horizontal={true}
            data={this.state.books}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Books data={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f0ee',
    height: 350,
    padding: 8,
  },
  textNews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  newsStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111111',
  },
  moreStyle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#f08c13',
  },
  image: {
    height: 180,
    width: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  card: {
    width: 140,
    marginRight: 10,
    alignItems: 'center',
  },
  books: {
    padding: 10,
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'left',
    color: 'black',
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
});

class Books extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image source={{uri: this.props.data.image}} style={styles.image} />
        <Text style={styles.title}>{this.props.data.title}</Text>
        <Text style={styles.author}>{this.props.data.author}</Text>
      </View>
    );
  }
}

export default Arrivals;

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from '../search/Search';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.tab}>
        <Icon name="home" size={24} color="#f1f0ee" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Icon name="search-outline" size={24} color="#f1f0ee" />
        <Text style={styles.tabText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Icon name="book-outline" size={24} color="#f1f0ee" />
        <Text style={styles.tabText}>Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Icon name="cart-outline" size={24} color="#f1f0ee" />
        <Text style={styles.tabText}>Cart</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1c2025',
    borderTopLeftRadius: 30, // Borda arredondada no topo
    borderTopRightRadius: 30, // Borda arredondada no topo
    paddingVertical: 15,
    position: 'absolute', // Permite que ele flutue na parte inferior
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#f1f0ee',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffc107',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#1c2025',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Footer;

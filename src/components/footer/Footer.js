import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute(); // <- identifica tela atual

  const tabs = [
    {
      name: 'HomeScreen',
      label: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
    },
    {
      name: 'Search',
      label: 'Search',
      icon: 'search-outline',
      activeIcon: 'search',
    },
    {
      name: 'Library',
      label: 'Library',
      icon: 'book-outline',
      activeIcon: 'book',
    },
    {name: 'Cart', label: 'Cart', icon: 'cart-outline', activeIcon: 'cart'},
  ];

  return (
    <View style={styles.footerContainer}>
      {tabs.map(tab => {
        const isActive = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}>
            <Icon
              name={isActive ? tab.activeIcon : tab.icon}
              size={isActive ? 30 : 24} // 👈 aumenta tamanho do ativo
              color={isActive ? '#ffc107' : '#f1f0ee'} // 👈 muda cor
            />
            <Text
              style={[
                styles.tabText,
                {color: isActive ? '#ffc107' : '#f1f0ee'},
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1c2025',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    position: 'absolute',
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
    marginTop: 4,
    color: '#f1f0ee',
  },
});

export default Footer;

import React, {useContext} from 'react'; // ✅ adiciona useContext
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DadosContext} from '../contextData/contextData'; // ✅ importa o contexto

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {cart} = useContext(DadosContext);

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
    {
      name: 'Cart',
      label: 'Cart',
      icon: 'cart-outline',
      activeIcon: 'cart',
    },
  ];

  return (
    <View style={styles.footerContainer}>
      {tabs.map(tab => {
        const isActive = route.name === tab.name;
        const isCart = tab.name === 'Cart'; // ✅ identifica o botão de carrinho

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}>
            <View style={{position: 'relative'}}>
              <Icon
                name={isActive ? tab.activeIcon : tab.icon}
                size={isActive ? 30 : 24}
                color={isActive ? '#ffc107' : '#f1f0ee'}
              />

              {/* ✅ Mostra o badge de quantidade no carrinho */}
              {isCart && cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.cartBadge}>{cart.length}</Text>
                </View>
              )}
            </View>

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
  // ✅ estilos do badge
  badge: {
    position: 'absolute',
    right: -10,
    top: -6,
    backgroundColor: '#f08c13',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default Footer;

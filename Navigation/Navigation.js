import {createAppContainer} from 'react-navigation'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Search from '../Components/Search';
import Favorites from '../Components/Favourites';
import FilmDetail from '../Components/FilmDetail';
import { StyleSheet,Image  } from 'react-native';
import React from 'react';

import Test from '../Components/Test';


const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. 
      screen: Search,
      navigationOptions: {
        title: 'Rechercher'
      }
    },
    FilmDetail: { 
        screen: FilmDetail
      }
  })

  const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Favoris'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
  })


  const MoviesTabNavigator = createBottomTabNavigator(
    {
      Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
          tabBarIcon: () => { 
            return <Image
              source={require('../Images/ic_search.png')}
              style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
          }
        }
      },
      Favorites: {
        screen: FavoritesStackNavigator,
        navigationOptions: {
          tabBarIcon: () => {
            return <Image
              source={require('../Images/ic_favorite.png')}
              style={styles.icon}/>
          }
        }
      },
      
        Test : {
          screen : Test
        }

    },
    {
      tabBarOptions: {
        activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
        inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
        showLabel: false, // On masque les titres
        showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
      }
    }
  )
  
  const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  })

  export default createAppContainer(MoviesTabNavigator)
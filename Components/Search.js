import React from 'react'
import { View, TextInput, Button,StyleSheet,FlatList ,ActivityIndicator } from 'react-native'
import filmsData from '../Helpers/filmsData';
import FilmList from './FilmList';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';


class Search extends React.Component {
  constructor(props) {
    super(props),
    this.searchedText = "" 
    this.page = 0 
    this.totalPages = 0
    this.state = { films: [] ,
      isLoading: false
      }
      // explicitly bind the function to this context
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    if (this.searchedText.length > 0)
    this.setState({ isLoading: true })
    getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
      this.setState({ 
        films: [ ...this.state.films, ...data.results ],
      isLoading:false })
      this.page=data.page
      this.totalPages= data.total_pages
      //this._films = data.results;
      // we call forceUpdate to rerender our view with the new value of the property
      //this.forceUpdate() 
    })
    
 }
 _searchTextInputChanged(text) {
  this.searchedText = text
}
_displayLoading() {
  if (this.state.isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
        {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
      </View>
    )
  }
}
  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {      //callback function
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms() 
    })
  }
  
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FilmList
          films={this.state.films} 
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // here's why we needed to bind the function to this context
          page={this.page}
          totalPages={this.totalPages} 
          favouriteList={false}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
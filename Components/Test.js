
import React from 'react'
import { StyleSheet, Text, Platform,View, Animated , Easing, PanResponder, Dimensions} from 'react-native'

class Test extends React.Component {

  /*render() {
    return (
      <View style={styles.main_container}>
      Platform.OS === 'ios' ?<Text>Ios</Text> : <Text>Android</Text>
      </View>
    )
  }
}*/

constructor(props) {
  super(props)
  this.state = {
    topPosition: 0,
    leftPosition: 0,
  }
  
  var {height, width} = Dimensions.get('window');
  this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
          let touches = evt.nativeEvent.touches;
          if (touches.length == 1) {
              this.setState({
                topPosition: touches[0].pageY - height/2,
                leftPosition: touches[0].pageX - width/2
              })
          }
      }
  })
}

/*componentDidMount() {
  Animated.timing(
    this.state.topPosition,
    {
      toValue: 100,
      duration: 3000, // ms
      easing: Easing.linear,
    }
  ).start() 
}*/

render() {
  return (
    <View style={styles.main_container}>
      <View
        {...this.panResponder.panHandlers}
        style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
      </View>
    </View>
  )
}
}

const styles = StyleSheet.create({
main_container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
animation_view: {
  backgroundColor: 'red',
  width: 100,
  height: 100
}
})

export default Test

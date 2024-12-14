import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TaskFlowIcon from "../../assets/icons/TaskFlowIcon.svg"

const HeaderHomeScreen = () => {
  return (
    <View style={styles.container}>
      <TaskFlowIcon height={30} width={150}  />
      
    </View>
  )
}

export default HeaderHomeScreen

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:16,
        paddingVertical:20,
    }
})
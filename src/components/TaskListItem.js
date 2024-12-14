import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBoxActiveIcon from "../../assets/icons/CheckBoxActive.svg"
import CheckBoxInActiveIcon from "../../assets/icons/CheckBoxInActive.svg"

const TaskListItem = ({item,handleCheckBox,handleDelete,handleEdit}) => {

  const [isChecked, setIsChecked] = useState(item.isChecked)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCheck =() => {
    handleCheckBox(item.id,isChecked)
  }
  const handleDeletePopup = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete?",
      [{
        text:"Cancel",
        style:"cancel"
      },
        {
          text:"Delete",
          onPress:() => handleDelete(item.id),
          style:"destructive"
        }
      ],{
        cancelable:true
      }
    )
  }

  useEffect(() => {
    setIsChecked(item.isChecked)
  },[item])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleCheck()} style={styles.leftContainer} accessibilityLabel={isChecked ? "Mark as unchecked" : "Mark as checked"}>
        {
          isChecked ?
            <CheckBoxActiveIcon height={24} width={24} />
            :
            <CheckBoxInActiveIcon height={24} width={24} />
        }

      </TouchableOpacity>
      <View style={{flex:1}}>

        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsExpanded(!isExpanded)} style={styles.rightContainer}>
          <Text style={[styles.contentText, isChecked ? styles.checkedText : null]}>{item.item}</Text>
          <Text style={[styles.timeText, isChecked ? styles.checkedText : null]}>
            {item.time}
          </Text>

        </TouchableOpacity>
        {
          isExpanded &&
          <View
            style={{
              flexDirection: "row",
              alignItems: "center", justifyContent: "flex-end", columnGap: 16, marginRight: 20,
            }}>
            <TouchableOpacity disabled={isChecked} onPress={() => handleEdit(item)}  >
              <Text style={[styles.linkText, { color: "#3478F6" },isChecked ? {opacity:0.5} : null]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => handleDeletePopup()}>
              <Text style={[styles.linkText, { color: "#FF5C57" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )
}

export default TaskListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16
  },
  contentText: {
    color: "#737373",
    fontSize: 15,
    fontWeight: 400,
    marginRight: 10
  },
  timeText: {
    color: "#737373",
    marginTop: 13,
    fontSize: 13
  },
  rightContainer: {
    marginHorizontal: 13,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    textDecorationColor: "#737373",
    opacity: 0.5
  },
  linkText: {
    fontWeight: 500,
    fontSize: 14
  }
})
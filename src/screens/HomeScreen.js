import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeScreen from '../components/HeaderHomeScreen'
import TaskListItem from '../components/TaskListItem'
import FLoatingButton from "../../assets/icons/FloatingIcon.svg"
import AddTaskModal from '../components/AddTaskModal'
import AsyncStorage from '@react-native-async-storage/async-storage'



const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



const HomeScreen = () => {

    const [visible, setVisible] = useState(false)
    const [TodoLists, setTodoLists] = useState([])
    const [loading, setLoading] = useState()
    const [mode , setMode] = useState("add")
    const [data , setData] = useState()

    const date = new Date()

    const handleSubmission = (item) => {
        if (mode == "edit") {
            const updatedData = TodoLists.map((todo) => (
                todo.id === item.id ? 
                {...todo,item:item.item}
                : todo
            ))
            setTodoLists(updatedData)
        }else{

            let object = {
                id: date.getTime(),
                item: item.item,
                isChecked: false,
                time: `${date.getHours()}:${date.getMinutes()}  , ${monthNames[date.getMonth()]} ${date.getDay()} `
            }
            setTodoLists([...TodoLists,object])
        }
        setVisible(false)
    }

    const handleCheckBox = (id, status) => {

        let filtered = TodoLists.map((item) => 
            item.id === id ? 
            {...item,isChecked:status ? false : true}
            : item
        )
        setTodoLists(filtered)

    }

    const handleDeletion = (id) => {
        console.log("runned")
        let filtered = TodoLists.filter(item => item.id !== id)
        setTodoLists(filtered)
    } 

    const handleEdit = (item) => {
        let data = item
        setMode("edit")
        setData(data)
        setVisible(true)
    }

    useEffect(() => {
        loadTodo()
    },[])
    

    useEffect(() => {
        saveTodo()
    },[TodoLists])
    
    const saveTodo = async () => {
        try {
            const jsonValue = JSON.stringify(TodoLists)

            await  AsyncStorage.setItem("todo" , jsonValue)
            console.log("Succefully saved")
        } catch (error) {
            console.log(error)
        }
    }
    
   


    const loadTodo = async () => {
        setLoading(true)
        try {
            const jsonValue = await AsyncStorage.getItem("todo") 
            if (jsonValue !== null) {
                setTodoLists(JSON.parse(jsonValue))
                setLoading(false)
                console.log("todo loadede")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <HeaderHomeScreen />
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size={50} />
                    </View>
                    :
                    <>
                        {
                            TodoLists.length ?
                                <FlatList data={TodoLists} renderItem={({ item }) => <TaskListItem handleCheckBox={handleCheckBox} handleDelete={handleDeletion} handleEdit={handleEdit} item={item} />} keyExtractor={(item, index) => index} />
                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ textAlign: "center", fontSize: 35, color: "#737373" }}>No data found</Text>
                                </View>
                        }
                        <View style={styles.floatingButton}>
                            <TouchableOpacity onPress={() => {
                                setMode("add")
                                setVisible(true)}} activeOpacity={0.5}>
                                <FLoatingButton />
                            </TouchableOpacity>
                            <AddTaskModal item={mode == "edit" ? data : null} mode={mode} handleDelete={handleDeletion} handleClose={setVisible} handleSubmission={handleSubmission} visible={visible} />
                        </View>
                    </>
            }
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 16
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
    }
})
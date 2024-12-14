import { Button, KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CloseIcon from "../../assets/icons/CloseIcon.svg"

const AddTaskModal = ({ mode,handleClose, visible, handleSubmission , item , handleDelete }) => {

    const [text, setText] = useState(mode == "add" ? null  : item.item)
    
    useEffect(() => {
        if (item && mode == "edit") {            
            setText(item.item)
        }
    },[item])


    const handleSubmit = () => {
        handleSubmission({...item , item:text})
        setText("")
    }
    
    return (
        <View>
            <Modal
                transparent
                statusBarTranslucent
                visible={visible}
                onRequestClose={() => handleClose(false)}
            >
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.subContainer}>
                        <View>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerText}>Add a Task</Text>
                                <TouchableOpacity onPress={() => handleClose(false)}>
                                    <CloseIcon />
                                </TouchableOpacity>
                                {/* Icon */}
                            </View>
                            <View style={styles.BodyContainer} >
                                <View style={styles.miniContainer}>

                                    <Text style={styles.label}>Task Details</Text>
                                    <TextInput multiline value={text} onChangeText={(text) => setText(text)} style={styles.Input} placeholder='ex: Go for a walk 🚶‍♀️🚶‍♀️ ' />
                                </View>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.5} style={styles.Button}>
                                <Text style={styles.ButtonText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

export default AddTaskModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    subContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        height: "50%",
        width: "90%",
        justifyContent: "space-between",
        paddingBottom: 20
    },
    headerText: {
        fontSize: 18,
        fontWeight: 600,
    },
    headerContainer: {
        paddingVertical: 10,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginRight: 1
    },
    miniContainer: {
        marginHorizontal: 20,
        rowGap: 14,
        marginTop: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 500
    },
    Input: {
        // backgroundColor:"lime",
        borderWidth: 0.5,
        borderRadius: 10,
        paddingVertical: 19,
        paddingHorizontal: 18,
        borderColor: "#C4C4C480"
    },
    Button: {
        backgroundColor: "#171717",
        paddingVertical: 14,
        paddingHorizontal: 13,
        width: "80%",
        alignSelf: "center",
        borderRadius: 12
    },
    ButtonText: {
        color: "white",
        fontSize: 15,
        fontWeight: 500,
        textAlign: "center"
    }
})
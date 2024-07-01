import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    feedbackimg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    itemImage: {
        height: 30,
        width: 30,
        position: 'absolute',
        right: 0,
        marginRight: 10
    },

    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
    },
    loginText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
    },

    loginGradient: {
        height: 40,
        width: 150,
        borderRadius: 0,
        justifyContent: "center",
        marginTop: 30
    },
    signGradient: {
        height: 45,
        width: 100,
        borderRadius: 4,
        justifyContent: "center",
        marginTop: 30
    },
    signGradient2: {
        height: 45,
        width: 100,
        borderRadius: 4,
        justifyContent: "center",
        marginTop: 30,
        marginLeft: 20
    },
    filebutton: {
        width: "50%",
        marginVertical: 7,
        paddingHorizontal: 9,
    },
    signButton: {
        width: "100%",
        marginVertical: 7,
        paddingHorizontal: 9,
        marginTop: 35
    },
    loginButton: {
        width: "50%",
        marginVertical: 7,
        paddingHorizontal: 9,
        marginTop: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    feedbackmodalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        // backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0,
        shadowRadius: 4,
        elevation: 5,
        // shadowOpacity: 0.12,
        // shadowRadius: 60,
        // elevation: 5,
    },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: 22
    // },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 0.6,
        flexDirection: 'row',
        height: 130,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,
        // flex: 1

    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 26,
    },
    editprofileText: {
        flex: 1,
        flexDirection: 'row',
        fontWeight: 'bold',
        color: '#777777',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#f36f21",
    },
    feedbacksubmitClose: {
        backgroundColor: "#146e0f",
    },
    feedbackcancelbutton: {
        backgroundColor: "#ba1a2a",
    },
    buttonDone: {
        marginTop: 30,
        backgroundColor: "#51b586",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 12,
    },
    titletext: {
        textAlign: "center",
        marginBottom: 15,
        marginTop: 10,
        fontSize: 17,
        width: 280,
        fontWeight: 'bold'
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    info: {
        textAlign: "center",
        marginBottom: 3,
        marginTop: 2,
        fontSize: 14,
        fontWeight: 'bold'
    },
    overlay: {

        backgroundColor: 'rgba(255,255,255,0.6)',
        height: 170
    },
    avatarStyle: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 50,
        alignSelf: 'center',
    },
    // textStyle: {
    //     marginTop: 10,
    //     fontSize: 18,
    //     color: "#FFFFFF",
    //     fontWeight: 'bold',
    //     alignSelf: 'center',
    // },
    balanceContainer: {
        padding: 10,
    },
    // button: {
    //     backgroundColor: '#d1ba52',
    //     borderRadius: 10,
    //     // padding: 10,
    //     marginBottom: 20,
    //     shadowColor: '#303838',
    //     shadowOffset: { width: 0, height: 5 },
    //     shadowRadius: 10,
    //     shadowOpacity: 0.35,
    //     width: 150,
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     // height: 20,
    //     // justifyContent: 'center',
    //     // resizeMode: 'contain',
    //     alignSelf: 'center',
    //     marginTop: 10,

    // },

    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 100
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height: 170
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        // textAlign: "center",
        // backgroundColor: "#000000c0",
        height: 150,
        borderRadius: 10,

    },
    btntext: {
        backgroundColor: '#ebd575',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 14



    }



});
export { styles }
import { StyleSheet } from "react-native"
const styles = StyleSheet.create({

    dropStyle: {
        width: '90%',
        marginTop: 10,
        color: 'white',
        marginLeft: 15,
        // marginRight: 10
    },
    searchbutton: {
        width: '30%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 21
        // marginLeft: 5
    },
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    SearchGradient: {

        height: 45,
        width: '100%',
        borderRadius: 10,
        marginLeft: 7,
        justifyContent: "center",
        marginTop: 20,
        alignContent: 'center',
        textAlign: 'center',
    },
    signButton: {
        width: '100%',
        marginVertical: 5,
        paddingHorizontal: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.50,
        elevation: 5,
    },
    signGradient: {
        height: 45,
        borderRadius: 4,
        justifyContent: "center",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,

    },
    // lottie: {
    //     width: 250,
    //     height: 250,
    // }
})
export { styles }
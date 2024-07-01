import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    cardStyle: {
        marginTop: 15,
        marginVertical: 10,
        height: 180,
        marginLeft: 10,
        borderBottomEndRadius: 1,
        borderTopLeftRadius: 2,
        width: '95%',
        borderRadius: 25,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        elevation: 6,
    },
    alignmanage: {
        alignItems: 'center',
        textAlign: 'center'
    },
    itemImage: {
        width: 120,
        height: 120,
        marginLeft: 10,
        marginTop: 14
    },


    titleText: {
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 55,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center'
    },
    signGradient: {
        height: 45,
        width: 45,
        borderRadius: 60,
        marginLeft: 60,
        textAlign: 'center',
        justifyContent: "center",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,

    },
    signButton: {
        width: '30%',
        marginVertical: 5,
        paddingHorizontal: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.50,
        elevation: 5,
    },
    signText: {
        color: "#000",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    dateText: {
        marginTop: 20,
        marginLeft: 15,
        fontWeight: 'bold',
        color: "#6a6868",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    realdateText: {
        marginLeft: 15,
        fontWeight: 'bold',
        color: "#1e1e2a",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    realcodeText: {
        marginLeft: 20,
        fontWeight: 'bold',
        color: "#1e1e2a",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    labitemImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 14
    },
    codeText: {
        marginTop: 20,
        marginLeft: 75,
        fontWeight: 'bold',
        color: "#6a6868",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
        flex: 1,
        flexWrap: 'wrap'
    },
    iconstyle: {
        marginRight: 2
    },
    lottie: {
        width: 250,
        height: 250,
    }

});
export { styles }
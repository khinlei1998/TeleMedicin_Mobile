import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 7,
        marginTop: 10,
    },
    item: {
        flex: 1,
        height: 120,
        paddingVertical: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.40,
        elevation: 5,
        marginHorizontal: 5,
    },
    itemImage: {
        height: 35,
    },
    newcardStyle: {
        width: 120,
        height: 135,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#5da7ec',
        backgroundColor: 'white',

        marginHorizontal: 8,
        marginLeft: 9,
        marginTop: 1,
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 8,
        elevation: 8,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 

    },

    buttonDepartmentIconStyle: {
        // marginTop: 14,
        height: 50,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 25,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    subCardView: {
        height: 50,
        width: 50,
        // borderRadius: 25,
        //  backgroundColor: Colors.history_back,
        // borderColor: '#5da7ec',
        // borderWidth: 1,
        // borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    button: {
        alignItems: 'center',
        paddingVertical: 4,
        elevation: 3,
        backgroundColor: '#edaf4c',
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginBottom: 5,
        marginRight: 10,
        width: '40%',
        height: 35,
        justifyContent: 'center',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 8,
        elevation: 8,

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        // textDecorationLine: 'underline',
    },
    featurescard: {
        width: '45%', justifyContent: 'center',
        alignItems: 'center', backgroundColor: 'white', shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 10,
        elevation: 10,
        marginHorizontal: 8,
        marginLeft: 9,
        // marginTop: 1,
        marginBottom: 5,
        borderRadius: 15,
        // height: 100
    },
    labcard: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 5
    },
    featuretext: {
        marginLeft: 15, fontSize: 16, color: 'black', marginTop: 20
    }



});
export { styles }

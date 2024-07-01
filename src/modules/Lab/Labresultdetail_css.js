import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    tablecontainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },



    aligncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rrcontainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 20,
        margin: 10,
    },
    imgContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        shadowColor: '#000000',
        borderLeftColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        elevation: 6,
        marginTop: -60,
    },
    cardstyle: {
        textAlign: 'center',
        marginTop: 52,
        marginVertical: 10,
        alignSelf: 'baseline',
        marginLeft: 10,
        width: '95%',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        elevation: 6,
    },
    treatmentcardstyle: {
        textAlign: 'center',
        marginTop: 4,
        marginVertical: 10,
        alignSelf: 'baseline',
        marginLeft: 10,
        width: '95%',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        elevation: 6,
    },
    itemImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        height: 50,
        width: 50,
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray',
    },
    decText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    lottie: {
        width: 100,
        height: 100,
        backgroundColor: 'white'
    },
    wrapperCollapsibleList: {
        flex: 1,
        marginTop: 20,
        overflow: "hidden",
        backgroundColor: "#FFF",
        borderRadius: 5
    },
    collapsibleItem: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#CCC",
        padding: 10
    },
    TitleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        width: '100%',
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        marginLeft: 2,
        marginTop: 6
    },
    Checklistcontainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    }

});
export { styles }
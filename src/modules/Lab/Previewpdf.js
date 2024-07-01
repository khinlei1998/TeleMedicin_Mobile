import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native'
import React, { useEffect, } from 'react'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetch_labresult_attachment } from '../../redux/Labreducer';
import LottieView from "lottie-react-native";

const Previewpdf = (props) => {

    const lab_pdf = props.route.params.data.lab_pdf
    const pdfimg = require("../../../assets/images/pages/pdf.png")
    const pdf_count = lab_pdf.split(',')

    const get_latest_key = pdf_count.pop()
    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: 'center',
                marginTop: 30
            }}>



                {pdf_count.length > 0 ?
                    pdf_count.map((value) => {
                        return (
                            <View onStartShouldSetResponder={
                                () => props.navigation.navigate('pdfreader', { paramas: value })
                            } style={{
                                width: 80,
                                height: 180,
                                paddingHorizontal: 8,
                                paddingVertical: 6,
                                backgroundColor: "#dedede",
                                alignSelf: "center",
                                marginHorizontal: "5%",
                                marginBottom: 6,
                                minWidth: "40%",
                                textAlign: "center",
                                borderRadius: 15,
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 10 },
                                shadowOpacity: 0.25,
                                elevation: 5,
                            }}>

                                <Image
                                    source={pdfimg}
                                    style={{
                                        marginTop: 14,
                                        height: 80,
                                        width: 80,
                                        resizeMode: 'cover',
                                        marginLeft: 20
                                    }}
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <Text>{value.replace('upload/lab_result_file/', '')}</Text>
                                </View>
                            </View>
                        )
                    })
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <LottieView
                            source={require("../../../assets/images/datanotfound.json")}
                            style={styles.lottie}
                            autoPlay
                        />
                    </View>
                }

            </View>
        </ScrollView >
    )
}
const stateToProps = state => {
    return {
        // lab_result_attachlist: state.lab.lab_result_attach
    };
}

const Previewpdfwrap = reduxForm({
    form: "previewpdfform",

})(Previewpdf)
export default connect(stateToProps, { fetch_labresult_attachment })(Previewpdfwrap)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    lottie: {
        width: 250,
        height: 250,
    }
});


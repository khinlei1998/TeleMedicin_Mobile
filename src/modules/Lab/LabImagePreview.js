
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native'
import React, { useEffect, } from 'react'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetch_labresult_attachment } from '../../redux/Labreducer';
import LottieView from "lottie-react-native";
import { BASE_URL, PHOTO_URL } from '../../components/common';
const LabImagePreview = (props) => {
    const lab_image = props.route.params.data.lab_image
    const lab_image_count = lab_image.split(',')
    const get_latest_key = lab_image_count.pop()
    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: 'center',
                marginTop: 30
            }}>
                {lab_image_count.length > 0 ?
                    lab_image_count.map((value) => {
                        return (
                            <View
                                style={{
                                    width: 90,
                                    height: 180,
                                    paddingHorizontal: 8,
                                    paddingVertical: 6,
                                    alignSelf: "center",
                                    marginHorizontal: "5%",
                                    marginBottom: 6,
                                    minWidth: "40%",
                                    textAlign: "center",
                                }} >

                                <Image
                                    // source={`${PHOTO_URL}` + value}
                                    source={{ uri: `${PHOTO_URL}` + value }}
                                    style={{
                                        marginTop: 14,
                                        height: 130,
                                        width: 130,
                                        resizeMode: 'cover',
                                        // marginLeft: 20
                                    }}
                                />
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
    };
}

const LabImagePreviewwrap = reduxForm({
    form: "LabImagePreviewform",

})(LabImagePreview)
export default connect(stateToProps, { fetch_labresult_attachment })(LabImagePreviewwrap)

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


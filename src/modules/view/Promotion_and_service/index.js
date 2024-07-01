import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';
import { connect } from "react-redux";
import { reduxForm, } from 'redux-form';
import { fetchpromotion } from '../../../redux/Promotionreducer';
import { PHOTO_URL, nodataIcon } from '../../../components/common';
import moment from "moment";
import { Container } from 'native-base';
import LottieView from "lottie-react-native";
const Promotion = (props) => {
    useEffect(() => {
        props.fetchpromotion()

    }, [])
    const { all_promotions } = props

    return (
        <>
            {all_promotions.length > 0 ?
                <ScrollView>
                    <View style={{ flex: 1, borderRadius: 15 }}>


                        {all_promotions.map((value, index) => {

                            let video = value.video_url ? value.video_url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/

                            )[1] : ''
                            return (
                                <Card style={{ borderRadius: 15 }} onPress={() => alert('uu')}>
                                    <Card.Image containerStyle={{ height: 140, }} source={{ uri: PHOTO_URL + value.image }}>

                                    </Card.Image>
                                    <Text style={{ marginBottom: 10, fontWeight: 'bold', marginTop: 10 }}>
                                        {value.title}
                                    </Text>

                                    <Text style={{ color: 'green', marginBottom: 3 }}>{moment(value.created_at).format('l')}</Text>
                                    <HTMLView
                                        value={value.body ? value.body.length > 70 ? value.body.substring(0, 30) + "..." : value.body : ''}
                                    />
                                    <TouchableOpacity style={styles.signButton} onPress={() => props.navigation.navigate("Promotion Detail", { paramkey: value })} >
                                        <LinearGradient
                                            colors={["#2980B9", "#6DD5FA"]}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.signGradient}
                                        >
                                            <Text style={styles.signText}>ပိုမိုလေ့လာရန်>></Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Card>
                            )
                        })}




                    </View>
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <LottieView
                        source={require("../../../../assets/images/datanotfound.json")}
                        style={styles.lottie}
                        autoPlay
                    />
                </View>
            }
        </>

    );
}


const stateToProps = (state) => {
    return {
        all_promotions: state.promotion.all_promotions
    }
}
const Promotionwrap = reduxForm({
    form: "PromotionForm",

})(Promotion)
export default connect(stateToProps, { fetchpromotion })(Promotionwrap)

const styles = StyleSheet.create({
    signButton: {
        width: "100%",

        paddingHorizontal: 9,
    },
    signGradient: {
        height: 45,
        width: '95%',
        borderRadius: 15,
        justifyContent: "center",
        marginTop: 17
    },
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    itemImage: {
        width: 120,
        height: 120,
        marginLeft: 10,
        marginTop: 14
    },

})
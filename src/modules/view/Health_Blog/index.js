import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { fetchcontent } from '../../../redux/Contentreducer';
import { connect } from "react-redux";
import { reduxForm, } from 'redux-form';
import { WebView } from "react-native-webview";
import HTMLView from 'react-native-htmlview';
import { PHOTO_URL, nodataIcon } from '../../../components/common';
import { Container } from 'native-base';
import LottieView from "lottie-react-native";
const Blog = (props) => {
    useEffect(() => {
        props.fetchcontent()

    }, [])

    const { all_contents } = props

    return (
        <>
            {all_contents.length > 0 ?
                <ScrollView>
                    <View style={{ flex: 1, borderRadius: 15 }}>


                        {all_contents.map((value, index) => {

                            let video = value.video_url ? value.video_url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/

                            )[1] : ''
                            // const regex = /(<([^>]+)>)/ig;
                            // let content = value.body.replace(regex, '');
                            return (


                                < Card style={{ borderRadius: 15 }
                                } onPress={() => alert('uu')}>


                                    {value.video_url ? (
                                        <View style={{ width: "100%", height: 250, marginTop: 5 }}>
                                            <WebView
                                                // style={{ height: 100 }}
                                                androidHardwareAccelerationDisabled={true}
                                                javaScriptEnabled={true}
                                                domStorageEnabled={true}
                                                source={{ uri: `https://www.youtube.com/embed/${video}` }}

                                            />
                                        </View>
                                    ) : (
                                        <Card.Image containerStyle={{ height: 150, }} source={{ uri: PHOTO_URL + value.image }}>

                                        </Card.Image>
                                    )
                                    }

                                    <Text style={{ marginBottom: 10, fontWeight: 'bold', marginTop: 10 }}>
                                        {value.title}
                                    </Text>

                                    <Text style={{ color: 'green', marginBottom: 3 }}>{value.date}</Text>

                                    {/* <Text numberOfLines={2} >
                                    {value.body}</Text> */}
                                    <HTMLView
                                        value={value.body ? value.body.length > 50 ? value.body.substring(0, 75) + "..." : value.body : ''}
                                    />



                                    <TouchableOpacity style={styles.signButton} onPress={() => props.navigation.navigate("Blog Detail", { paramkey: value })} >
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
        all_contents: state.all_content.contents
    }
}
const Healthblogwrap = reduxForm({
    form: "HealthBlog",

})(Blog)
export default connect(stateToProps, { fetchcontent })(Healthblogwrap)


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
    // lottie: {
    //     width: 250,
    //     height: 250,
    // }

})
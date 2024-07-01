import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, } from 'react-native-elements'
import { WebView } from "react-native-webview";
import HTMLView from 'react-native-htmlview';
import { PHOTO_URL } from '../../../components/common';

const Blog_detail = (props) => {
    const data = props.route.params.paramkey
    if (data.video_url) {
        var videoid = props.route.params.paramkey.video_url.match(
            /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
        );
        var url = videoid[1];
    }
    return (
        <ScrollView>
            <View style={{ flex: 1, }}>
                <Card>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Divider />
                    {data.video_url ? (
                        <View style={{ width: "100%", height: 250, marginTop: 5 }}>
                            <WebView
                                androidHardwareAccelerationDisabled={true}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: `https://www.youtube.com/embed/${url}` }}
                            />
                        </View>
                    ) : (
                        <Card.Image containerStyle={{ height: 150, }} source={{ uri: PHOTO_URL + data.image }}>

                        </Card.Image>
                    )
                    }

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.verticleLine}></Text>
                        <Text style={{ marginTop: 15, marginLeft: 5, marginBottom: 15, color: '#30ad1a' }}>ရေးသားသောရက်စွဲ : {data.date}</Text>
                    </View>
                    <HTMLView
                        style={{ marginTop: 10 }}
                        value={data.body}
                    />
                </Card>
            </View>
        </ScrollView>

    );
}

export default Blog_detail; const styles = StyleSheet.create({


    itemImage: {
        width: '100%',
        height: 100,
        borderColor: "white",
        resizeMode: 'cover'
    },
    verticleLine: {
        height: 30,
        width: 3,
        backgroundColor: 'green',
        marginLeft: 2,
        top: 10,
        borderBottomWidth: 2
    },

})

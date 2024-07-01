import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, } from 'react-native-elements'
import HTMLView from 'react-native-htmlview';
import { PHOTO_URL } from '../../../components/common';
import moment from "moment";

const Prmotion_detail = (props) => {
    const data = props.route.params.paramkey

    return (
        <ScrollView>
            <View style={{ flex: 1, }}>

                <Card>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Divider />
                    <Card.Image style={styles.itemImage} source={{ uri: PHOTO_URL + data.image }}>

                    </Card.Image>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.verticleLine}></Text>
                        <Text style={{ marginTop: 15, marginLeft: 5, marginBottom: 15, color: '#30ad1a' }}>ရေးသားသောရက်စွဲ : {moment(data.created_at).format('l')}</Text>
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

export default Prmotion_detail;
const styles = StyleSheet.create({


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
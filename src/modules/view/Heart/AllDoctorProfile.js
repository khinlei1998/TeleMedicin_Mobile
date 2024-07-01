import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { reduxForm, } from 'redux-form';
import { connect } from "react-redux";
import filter from 'lodash.filter';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import { Content, Card, CardItem, Thumbnail, Left, Body, Right, Row } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchalldoctor } from '../../../redux/Doctorreducer';
import { useNavigation } from '@react-navigation/core';
import {
    HeaderClassicSearchBar
} from "react-native-header-search-bar";
import { PHOTO_URL } from '../../../components/common';

import { fetchdoc_id } from '../../../redux/Doctorreducer';
import { useTranslation } from 'react-i18next';

const AllDoctorProfile = props => {
    const { t, i18n } = useTranslation();

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);
    const [search, setSearch] = useState()
    const navigation = useNavigation();
    const [phone_number, setPhone_Number] = useState()

    const { all_doctors, doctor_infos, languages } = props
    useEffect(() => {
        navigation.addListener('focus', () => {
            props.fetchalldoctor()
            AsyncStorage.getItem("Phone_no").then((token) => {
                setPhone_Number(token)
            });
        })

        setData(all_doctors);
        setFullData(all_doctors);

    }, []);



    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        console.log('formattedQuery', formattedQuery);
        const filteredData = filter(fullData, user => {
            return contains(user, formattedQuery);
        });
        console.log('filteredData', filteredData);
        setData(filteredData);
        setQuery(text);
    };
    const contains = ({ name }, query) => {
        console.log('query', query);
        console.log('name', name);


        if (name.includes(query)) {
            return true;
        }

        return false;
    };

    const btnProfileDetail = (data) => {
        if (data) {
            props.fetchdoc_id(data.id)

        }
        navigation.navigate(t('View Profile'), { paramkey: data, doctor_id: data.id, });
    }

    const btnbooknow = (id) => {
        if (phone_number) {
            navigation.navigate(t('Appointment'), { paramkey: id });
        } else {
            navigation.navigate('Login');
        }
    }


    function renderItem(item) {
        const department_array = [];
        const position_array = [];
        const work_experience_array = [];
        for (const dep in item.item) {

            let dep_array = item.item.department.split(',');
            dep_array.forEach(element => {
                department_array.push(element);
            });

            if (department_array.length > 0) break;
        }

        for (const pos in item.item) {
            let pos_array = item.item.position.split(',');
            pos_array.forEach(element => {
                position_array.push(element);
            });

            if (position_array.length > 0) break;

        }
        for (const exp in item.item) {
            let exp_array = item.item.work_experience.split(',');
            exp_array.forEach(element => {
                work_experience_array.push(element);
            });

            if (work_experience_array.length > 0) break;

        }
        return (
            <Content>
                <ScrollView>
                    <Card
                        style={{
                            padding: 10,
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 10,
                            shadowColor: '#000000',
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.25,
                            elevation: 5,
                            borderRadius: 10,
                        }}>
                        <CardItem >
                            <Left>
                                <Thumbnail
                                    source={{
                                        uri: `${PHOTO_URL}` + item.item.image,
                                    }}
                                />
                                <Body>
                                    <Text style={{ fontWeight: 'bold' }}>{item.item.name}</Text>
                                    <Text style={{ fontWeight: 'bold' }}>{item.item.dep_data.mm_name}</Text>


                                    {department_array.map((dep, d) => {
                                        return position_array.map((pos, p) => {
                                            return work_experience_array.map((exp, e) => {
                                                return d == 0 && 0 == p && 0 == e ? (
                                                    <>
                                                        <Row
                                                            style={{
                                                                marginTop: 7,
                                                                marginLeft: 12,
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <Text style={{ fontSize: 13 }}>
                                                                {/* {dep + 'ဌာန ' + '|' + pos + "ရာထူး" + '|' + exp + "နှစ်"} */}
                                                                {dep + '|' + pos + '|' + exp}
                                                            </Text>
                                                        </Row>
                                                    </>
                                                ) : (
                                                    <></>
                                                );
                                            });
                                        });
                                    })}
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Left>
                                <TouchableOpacity
                                    onPress={() => {

                                        btnProfileDetail(item.item)
                                    }}
                                    style={styles.signButton}>
                                    <LinearGradient
                                        colors={["#36afb9", "#36afb9"]}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.signGradient}
                                    >
                                        <Text style={styles.signText}>
                                            {t('View Profile')}
                                            <Icon
                                                name='eye'
                                                type='font-awesome'
                                                color='#fff'
                                                alignSelf='center'
                                                style={{ height: 12, marginLeft: 5 }}
                                                size={13} />

                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Left>

                            <Right>
                                <TouchableOpacity
                                    onPress={() => {
                                        btnbooknow(item.item.id)
                                    }}
                                    style={styles.signButton}>
                                    <LinearGradient
                                        colors={["#67a219", "#76b81f"]}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.signGradient}
                                    >
                                        <Text style={styles.signText}>
                                            {t('Book Now')}
                                            <Icon
                                                name='calendar'
                                                type='font-awesome'
                                                color='#fff'
                                                alignSelf='center'
                                                style={{ height: 12, marginLeft: 5 }}
                                                size={14} />

                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Right>
                        </CardItem>
                    </Card>
                </ScrollView>
            </Content>



        )
    }

    function searchfilter(text) {
        if (text) {
            const newData = fullData.filter((item) => {
                const Itemdata = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                const textdata = text.toUpperCase()
                return Itemdata.indexOf(textdata) > -1
                //-1 is if data is greater than -1 is mean data has found
            });
            setData(newData);
            setSearch(text)
        } else {
            setData(fullData)
            setSearch(text)
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={

                    // <HeaderClassicSearchBar searchBoxText="Search By Doctor Name" value={query} onChangeText={queryText => handleSearch(queryText)} />
                    <HeaderClassicSearchBar searchBoxText="Search By Doctor Name" value={search} onChangeText={(value) => searchfilter(value)} />

                }
                data={data}
                keyExtractor={item => item.first}
                renderItem={renderItem}
            />
        </View>
    )

}
const stateToProps = state => {
    return {
        all_doctors: state.doctor_by_depts.all_doctor,

    };
}
const AllDoctorwrap = reduxForm({
    form: "Alldoctorform",


})(AllDoctorProfile)
export default connect(stateToProps, { fetchalldoctor, fetchdoc_id })(AllDoctorwrap)


const styles = StyleSheet.create({
    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
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
    signButton: {
        width: '100%',
        marginVertical: 5,
        paddingHorizontal: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.50,
        elevation: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        // alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 60,
        fontWeight: '700'
    },
    listItem: {
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    coverImage: {
        width: 100,
        height: 100,
        borderRadius: 8
    },
    metaInfo: {
        marginLeft: 10
    },
    title: {
        fontSize: 18,
        width: 200,
        padding: 10
    }
})

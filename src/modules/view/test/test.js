// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button, TouchableOpacity, FlatList, ActivityIndicator, } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// import { Field, reduxForm, formValueSelector } from 'redux-form';
// import { fetchdoctor } from '../../../redux/Doctorreducer';
// import { connect } from "react-redux";
// import filter from 'lodash.filter';
// import { Input } from 'react-native-elements';
// const Testshow = props => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);
//     const [query, setQuery] = useState('');
//     const [fullData, setFullData] = useState([]);

//     const API_ENDPOINT = `https://randomuser.me/api/?seed=1&page=1&results=20`;

//     const {all_doctors}=props

//     useEffect(() => {
//         setIsLoading(true);

//         // fetch(API_ENDPOINT)
//         //     .then(response => response.json())
//         //     .then(response => {
//                 setData(all_doctors);

//                 // ADD THIS
//                 setFullData(all_doctors);

//                 setIsLoading(false);
//             // })
//             // .catch(err => {
//             //     setIsLoading(false);
//             //     setError(err);
//             // });
//     }, []);
//     if (isLoading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator size="large" color="#5500dc" />
//             </View>
//         );
//     }
//     if (error) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text style={{ fontSize: 18 }}>
//                     Error fetching data... Check your network connection!
//                 </Text>
//             </View>
//         );
//     }

//     const handleSearch = text => {
//         const formattedQuery = text.toLowerCase();
//         const filteredData = filter(fullData, user => {
//             return contains(user, formattedQuery);
//         });
//         setData(filteredData);


//         setQuery(text);
//     };

//     const contains = ({ name, email }, query) => {
      


//         if (name.includes(query)  || email.includes(query)) {
//             return true;
//         }

//         return false;
//     };


//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Favorite Contacts</Text>
//             <FlatList
//                 ListHeaderComponent={renderHeader}
//                 data={data}
//                 keyExtractor={item => item.first}
//                 renderItem={({ item }) => (
//                     <View style={styles.listItem}>
//                         {/* <Image
//                                 source={{ uri: item.picture.thumbnail }}
//                                 style={styles.coverImage}
//                             /> */}
//                         <View style={styles.metaInfo}>
//                             <Text style={styles.title}>{item.name}</Text>
//                             <Text style={styles.title}>{item.email}</Text>
//                         </View>
//                     </View>
//                 )}
//             />
//         </View>
//     );


//     function renderHeader() {
//         return (
//             <View
//                 style={{
//                     backgroundColor: '#fff',
//                     padding: 10,
//                     marginVertical: 10,
//                     borderRadius: 20
//                 }}
//             >
//                 <TextInput
//                     autoCapitalize="none"
//                     autoFocus = {true}
//                     autoCorrect={false}
//                     clearButtonMode="always"
//                     value={query}
//                     onChangeText={queryText => handleSearch(queryText)}
//                     placeholder="Search"
//                     style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
//                 />

//                 {/* <Input
//                     placeholder="Comment"
//                     value={query}
//                     leftIcon={{ type: 'font-awesome', name: 'comment' }}
//                     style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
//                     onChangeText={queryText => handleSearch(queryText)}
//                     autoFocus = {true}
//                     returnKeyType = {"next"}

//                 /> */}
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Basic FlatList Example</Text>
//             <FlatList
//                 data={data}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.listItem}>
//                         <Text style={styles.listItemText}>{item.title}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }
// const stateToProps = state => {
//     return {
//         all_doctors: state.doctor_by_depts.all_doctor
//     };
// }
// const rrsignupwrap = reduxForm({
//     form: "rrrSignup",


// })(Testshow)
// export default connect(stateToProps, { fetchdoctor })(rrsignupwrap)


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//         // alignItems: 'center'
//     },
//     text: {
//         fontSize: 20,
//         color: '#101010',
//         marginTop: 60,
//         fontWeight: '700'
//     },
//     listItem: {
//         marginTop: 10,
//         paddingVertical: 20,
//         paddingHorizontal: 20,
//         backgroundColor: '#fff',
//         flexDirection: 'row'
//     },
//     coverImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 8
//     },
//     metaInfo: {
//         marginLeft: 10
//     },
//     title: {
//         fontSize: 18,
//         width: 200,
//         padding: 10
//     }
// })

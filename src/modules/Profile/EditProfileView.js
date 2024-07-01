import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
    Avatar,
    Text,
} from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { connect } from "react-redux";
import SweetAlert from 'react-native-sweet-alert';
import Textinput from "../ui/TextInput";
import { Field, reduxForm } from 'redux-form';
import RenderSelect from "../ui/DropDownPicker";
import { fetchgender } from "../../redux/genderreducer";
import RenderImage from "../ui/RenderImage";
import LinearGradient from 'react-native-linear-gradient';
import { fetchpatientbyphoneno } from "../../redux/Patientreducer";
import { useNavigation } from '@react-navigation/core';
import { killuser } from "../../redux/Login";
import { updateuser } from "../../redux/Signupreducer";
import Spinner from 'react-native-loading-spinner-overlay';
import validate from "./validate";
import { PHOTO_URL } from "../../components/common";
const EditProfile = (props) => {
    const [selected, setSelected] = useState();
    const navigation = useNavigation();
    const [spinner, setclosespinner] = useState(false);
    const [imagemodalVisible, setimageVisible] = useState(false);
    const [fileData, setfileData] = useState();
    const [fileUri, setfileUri] = useState();
    const [filetype, setfiletype] = useState();
    //Image
    const [resourcePath, setfilePath] = useState({});
    // image upload
    const modalvisibile = () => {

        setimageVisible(true)
    }

    const imageGalleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
        };

        launchImageLibrary(options, (res) => {
            // alert('reacg')
            // console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = { uri: res.fileName };
                setfilePath(res);
                setfileData(res.assets[0]);
                setfileUri(res.assets[0].uri)
                setfiletype(res.assets[0].type)

            }
        });
        setimageVisible(!imagemodalVisible)
    }

    const camera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (res) => {

            const requestCameraPermission = async () => {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: "App Camera Permission",
                            message: "App needs access to your camera ",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK"
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Camera permission given");
                    } else {
                        console.log("Camera permission denied");
                    }
                } catch (err) {
                    console.warn(err);
                }
            };


            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                const source = { uri: res };
                setfilePath(res);
                setfileData(res.assets[0].fileName);
                setfileUri(res.assets[0].uri)
            }
        });
        setimageVisible(!modalVisible)
    }

    const { all_gender, patient_by_phone_no, handleSubmit } = props
    console.log('patient_by_phone_no', patient_by_phone_no)
    useEffect(() => {
        const test = Object.assign({}, patient_by_phone_no, {
            name: patient_by_phone_no.name,
        })
        props.initialize(test)
    }, [])

    const btnupdate = (data) => {
        // alert(`here is the value ${JSON.stringify(data)}`),
        // setclosespinner(true)
        props.updateuser(data, (type) => {
            if (type == 'updatesuccess') {
                setclosespinner(false)
                SweetAlert.showAlertWithOptions({
                    title: 'Update Successfully',
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true
                }),
                    props.navigation.goBack();
            } else {
                setclosespinner(false)
                SweetAlert.showAlertWithOptions({
                    title: 'Update Invalid',
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'error',
                    cancellable: true
                },
                    callback => console.log('callback'));
            }
        })
    }

    return (
        <ScrollView vertical={true} contentContainerStyle={{ flexGrow: 1 }}>

            <View style={{ backgroundColor: '#5da7ec', height: 140, borderBottomStartRadius: 70, borderBottomEndRadius: 70 }}>
            </View>
            <View style={styles.cardCustom}>
                <View style={{ flex: 1, }}>
                    <Image
                        style={styles.avatar}
                        // source={{ uri: patient_by_phone_no? `${PHOTO_URL}`+patient_by_phone_no.image :'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png' }}
                        source={{ uri: patient_by_phone_no.image == null ? `https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png` : `${PHOTO_URL}` + patient_by_phone_no.image }}


                    />
                    <Field oldvalue={patient_by_phone_no ? patient_by_phone_no.name : ''} name="name" type="numeric" iconname="user" label="Name" component={Textinput} placeholder={'Name'} />
                    {/* oldvalue={patient_by_phone_no.name */}
                    <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', marginBottom: 10, alignSelf: 'stretch', marginLeft: 15 }}>Please Choose Gender</Text>

                    <View style={{ marginRight: 10, marginLeft: 13 }}>
                        <Field
                            oldvalue={patient_by_phone_no && patient_by_phone_no.gender_data ? patient_by_phone_no.gender_data.name : ''}
                            name="gender"
                            getvalue={selected}
                            component={RenderSelect}
                            options={all_gender}
                            setValue={setSelected}
                            titleText="Please select gender"
                            type="number"
                            parse={value => Number(value)}

                        />


                    </View>

                    {/* <SelectPicker
                        onValueChange={(value) => {
                            // Do anything you want with the value. 
                            // For example, save in state.
                            setSelected(value);
                        }}
                        placeholder="ll"
                        style={{backgroundColor:'red'}}
                    >

                        {Object.values(options).map((val, index) => (
                            <SelectPicker.Item label={val} value={val} key={index} />
                        ))}

                    </SelectPicker> */}
                    <Field label="Choose Profile Image" modalVisible={imagemodalVisible} modalvisibile={modalvisibile} fileData={fileData} camera={camera} fileUri={fileUri} name="image" imageGalleryLaunch={imageGalleryLaunch} component={RenderImage} />

                    <TouchableOpacity style={styles.signButton} onPress={handleSubmit(btnupdate)} >
                        <LinearGradient
                            colors={["#4a8dcb", "#028fdd"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.signGradient}
                        >
                            <Text style={styles.signText}>Update Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
                        {spinner ?
                            <Spinner
                                visible={spinner}
                                textContent={'Loading...'}
                                textStyle={styles.spinnerTextStyle}
                            />
                            :
                            <Text></Text>
                        }
                    </View>
                </View>
            </View>

        </ScrollView>
    );
}
function maptoprops(state) {
    return {
        all_gender: state.gender.genders,
        patient_by_phone_no: state.patient.patient_by_phoneno,

    }
}

const editprofilewrap = reduxForm({
    form: "editProfileditform",
    validate
})(EditProfile)
export default connect(maptoprops, { fetchgender, fetchpatientbyphoneno, killuser, updateuser })(editprofilewrap)
const styles = StyleSheet.create({
    signGradient: {
        height: 45,
        width: '100%',
        borderRadius: 10,
        justifyContent: "center",

    },

    signButton: {
        width: "100%",
        marginBottom: 30,
        paddingHorizontal: 9,
        marginTop: 50,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        elevation: 5,

    },

    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    cardCustom: {
        width: '89%',
        justifyContent: 'center',
        marginTop: -60,
        height: '87%',
        borderColor: 'white',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        borderWidth: 1,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 5,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        marginLeft: 6,
        marginTop: -40,
        alignItems: 'center',
        alignSelf: 'center'
    }
})
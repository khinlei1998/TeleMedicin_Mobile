
import { View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { fetchappointment } from '../../redux/Appointmentreducer'
import { reduxForm, formValueSelector } from 'redux-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import LottieView from "lottie-react-native";
class Appointment_list extends Component {
    constructor(props) {
        super(props)
        // this.data = [
        //     { time: '1/1/2022', title: 'Event 1', description: 'Event 1 Description' },

        //     { time: '1/2/2022', title: 'Event 2', description: 'Event 2 Description' },
        //     { time: '1/3/2022', title: 'Event 3', description: 'Event 3 Description' },
        //     { time: '1/4/2022', title: 'Event 4', description: 'Event 4 Description' },
        //     { time: '1/4/2022', title: 'Event 5', description: 'Event 5 Description' }
        // ],
        this.state = {
            phone_no: ''
        }
    }
    componentDidMount() {
        this.props.fetchappointment()

        AsyncStorage.getItem("Phone_no").then((token) => {
            this.setState({ phone_no: token })
        })

    }


    render() {
        const { all_appointments } = this.props

        const filtered_appointment = all_appointments.filter((item) => item.patient_phoneno == this.state.phone_no).map(item => {
            return {
                time: item.startDate,
                title: item.title,
                description: item.notes == 'undefined' ? '-' : item.notes

            };
        });
        return (

            <View style={styles.container}>

                {filtered_appointment.length > 0 ?
                    // <Timeline
                    //     circleSize={20}
                    //     circleColor='rgb(45,156,219)'
                    //     lineColor='rgb(45,156,219)'
                    //     timeContainerStyle={{ minWidth: 52, }}
                    //     timeStyle={{ textAlign: 'center', backgroundColor: '#5da7ec', color: 'white', padding: 5, borderRadius: 15, marginLeft: 10 }}
                    //     descriptionStyle={{ color: 'gray' }}
                    //     options={{
                    //         style: { paddingTop: 5 }
                    //     }}
                    //     isUsingFlatlist={true}
                    //     data={filtered_appointment}
                    //     separator={false}
                    //     detailContainerStyle={{
                    //         marginBottom: 20,
                    //         paddingLeft: 5,
                    //         paddingRight: 5,
                    //         backgroundColor: 'white',
                    //         borderRadius: 10,
                    //     }}
                    // />
                    <Timeline
                        innerCircle={'dot'}
                        circleSize={20}
                        circleColor='rgb(45,156,219)'
                        lineColor='rgb(45,156,219)'
                        timeContainerStyle={{ minWidth: 52, }}
                        timeStyle={{ textAlign: 'center', backgroundColor: '#5da7ec', color: 'white', padding: 5, borderRadius: 15, marginLeft: '2%' }}
                        descriptionStyle={{ color: 'gray' }}
                        options={{

                            style: { paddingTop: 30 }

                        }}
                        isUsingFlatlist={true}
                        data={filtered_appointment}
                        separator={false}
                        detailContainerStyle={{
                            marginBottom: 30,
                            paddingLeft: 5,
                            paddingRight: 5,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            width: '95%'

                        }}
                    />
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
        )
    }
}
function maptoprops(state) {
    return {

        all_appointments: state.appointment.appointment_by_phoneno
    }
}
const Appointment_listwrap = reduxForm({
    form: "Appointment_listform",
})(Appointment_list)

export default connect(maptoprops, { fetchappointment })(Appointment_listwrap)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        padding: 16,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});




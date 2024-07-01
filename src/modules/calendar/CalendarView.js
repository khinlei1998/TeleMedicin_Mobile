/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  StyleSheet, View, Text, TouchableHighlight, TouchableOpacity
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Field, reduxForm } from 'redux-form';
import { colors, fonts } from '../../styles';
import { fetchappointment } from '../../redux/Appointmentreducer';
import { connect } from "react-redux";

import AsyncStorage from '@react-native-async-storage/async-storage';

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.buttonPress = this.buttonPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      phone_no: {},
      rest: [],
      today: new Date().toISOString().split("T")[0],
      finalresult: ''


    };
  }
  componentDidMount() {
    // this.props.fetchappointment()

    this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem("Phone_no").then((token) => {
        this.agenda.onDayChange(this.state.today);

        if (token) {
          this.props.fetchappointment()


        } else {
          this.props.navigation.navigate("Login")
        }
        this.setState({
          phone_no: token,
        });
      });
    })
    //this.buttonPress()
  }
  // componentDidUpdate(prevProps) {
  //   // console.log('didupdate', this.props.all_appointment)
  //   if (prevProps.all_appointment !== this.props.all_appointment) {
  //     let filtered_phoneno = this.props.all_appointment.filter((datas) => datas.patient_phoneno == this.state.phone_no)
  //     var result = filtered_phoneno.reduce(function (r, a) {
  //       r[a.startDate] = r[a.startDate] || [];
  //       r[a.startDate].push(a);
  //       return r;
  //     }, Object.create(null));
  //     this.state.finalresult(result)
  //     console.log('not same');

  //   }
  //   // console.log('prosp focus', this.props.isFocused)
  //   // if (prevProps.isFocused !== this.props.isFocused) {
  //   //   setTimeout(() => {
  //   //     this.agenda.onDayChange(this.state.today);
  //   //   }, 500);
  //   // }
  // }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  buttonPress = () => {
    console.log('HI');
  }

  renderItem = (item) => {

    // const test=this.props.all_appointment.
    // this.setState({rest:item.appointment_confirm})
    // for(one of item){
    //   one[formatDate(appointment.date,'YYYY-MM-DD')].push({
    //      // Your agenda item
    //    }) 
    // }

    return (
      // <Text style={{
      //   color: '#48506B',
      //   fontFamily: fonts.primaryRegular,
      //   marginBottom: 10,
      // }}> {item.title}</Text>
      <TouchableOpacity onPress={() =>
        this.props.navigation.navigate('Appointment Detail', { paramKey: item })}
        style={styles.item}>
        {/* <TouchableHighlight> */}
        <View>
          <Text
            style={{
              color: '#48506B',
              fontFamily: fonts.primaryRegular,
              marginBottom: 10,
            }}
          >
            {item.title}
          </Text>
          <Text style={{ color: '#9B9B9B', fontFamily: fonts.primaryRegular }}>
            {/* {item.time} */}
            {item.startDate}

          </Text>






        </View>
        {/* </TouchableHighlight> */}
      </TouchableOpacity>
    );
  }

  render() {
    // const { navigation } = this.props;

    const { loadItems, all_appointment } = this.props;
    let filtered_phoneno = all_appointment.filter((datas) => datas.patient_phoneno == this.state.phone_no)
    var result = filtered_phoneno.reduce(function (r, a) {
      r[a.startDate] = r[a.startDate] || [];
      r[a.startDate].push(a);
      return r;
    }, Object.create(null));
    if (result) {
      this.renderItem(result)
    }
    return (

      <Agenda
        items={result}
        loadItemsForMonth={loadItems}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        // rowHasChanged={this.rowHasChanged}
        theme={{
          dotColor: colors.primaryLight,
          selectedDayBackgroundColor: colors.primaryLight,
          agendaDayTextColor: colors.primaryLight,
          agendaDayNumColor: colors.primaryLight,
          agendaTodayColor: '#4F44B6',
          backgroundColor: '#F1F1F8',
        }}
        selected={this.state.today}
        refreshing={false}

        ref={ref => {
          this.agenda = ref;
        }}


      />
    );
  }
}
function maptoprops(state) {
  return {
    all_appointment: state.appointment.appointment_by_phoneno,
    loged_phoneno: state.loged_user.datas.phone_number
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteTwo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});


const Appformwrapp = reduxForm({
  form: "CalendarForm",
})(CalendarScreen)
export default connect(maptoprops, { fetchappointment })(Appformwrapp)

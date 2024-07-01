import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import CalendarStateReducer from '../modules/calendar/CalendarState';
import languagereducer from './ChangeLanguage';
import Loginreducer from './Login';
import Statereducer from './Statereducer';
import Townshipreducer from './Townshipreducer';
import Genderreducer from './genderreducer';
import Signupreducer from './Signupreducer';
import Appointmentreducer from './Appointmentreducer';
import deptreducer from './Department';
import doctorreducer from './Doctorreducer';
import contentreducer from './Contentreducer';
import patientreducer from './Patientreducer';
import chatreducer from './Chatreducer';
import clinicreducer from './Clinicreducer';
import promotionreducer from './Promotionreducer';
import Labreducer from './Labreducer';
import Treatmentreducer from './Treatmentreducer';
 const appReducer= combineReducers({
  // ## Generator Reducers
  form: formReducer,
  gallery,
  app,
  calendar: CalendarStateReducer,
  language: languagereducer,
  loged_user: Loginreducer,
  state: Statereducer,
  township: Townshipreducer,
  gender: Genderreducer,
  user: Signupreducer,
  appointment: Appointmentreducer,
  dept: deptreducer,
  doctor_by_depts: doctorreducer,
  all_content: contentreducer,
  patient: patientreducer,
  chat: chatreducer,
  clinic:clinicreducer,
  promotion:promotionreducer,
  language:languagereducer,
  lab:Labreducer,
  Treatment:Treatmentreducer


});
export default appReducer;

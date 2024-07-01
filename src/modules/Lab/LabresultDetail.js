/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, Pressable, ToastAndroid, TouchableOpacity } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import Accordion from 'react-native-collapsible/Accordion';

import CollapsibleList from "react-native-collapsible-list";
import { STOOL_FOR, MICROBIOLOGY, HAEMATOLOGY, INVESTIGATION_TYPES, SEROLOGY, BIOCHEMISTRY, TUMOUR, HORMONES, URINEFOR, CULTURE } from '../../components/common';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import { fetchlabresult, fetch_radiology } from '../../redux/Labreducer';
import { FloatingAction } from "react-native-floating-action";
import ImagePicker from 'react-native-image-crop-picker';
import Unorderedlist from 'react-native-unordered-list';
import { styles } from './Labresultdetail_css';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { fonts } from '../../styles';

import { fetch_labresult_attachment } from '../../redux/Labreducer';
const LabIcon = require('../../../assets/images/pages/microscope1.png');

const DiseaseIcon = require('../../../assets/images/category/disease.png');
function DiesaseScreen(props) {
  const actions = [
    {
      text: "Choose Image For lab Result",
      icon: require("../../../assets/images/category/image.png"),
      name: "bt_accessibility",
      position: 2
    },

  ]

  const result = props.result


  const haemologyarray = result.haemotology ? result.haemotology.replace(/,\s*$/, "").split(",") : ''
  const serologyarray = result.serology ? result.serology.replace(/,\s*$/, "").split(",") : ''
  const biochemistryarray = result.biochemistry ? result.biochemistry.replace(/,\s*$/, "").split(",") : ''
  const tumourarray = result.tumour_markers ? result.tumour_markers.replace(/,\s*$/, "").split(",") : ''
  const homourarray = result.hormones ? result.hormones.replace(/,\s*$/, "").split(",") : ''
  const urinearray = result.urine_for ? result.urine_for.replace(/,\s*$/, "").split(",") : ''
  const culturearray = result.culture ? result.culture.replace(/,\s*$/, "").split(",") : ''
  const microbologyarray = result.microbiology ? result.microbiology.replace(/,\s*$/, "").split(",") : ''
  const toolarray = result.stool_for ? result.stool_for.replace(/,\s*$/, "").split(",") : ''

  let haemology_result = {};
  HAEMATOLOGY.forEach((e) => {
    for (let i = 0; i < haemologyarray.length; i++) {
      if (e.shortend == haemologyarray[i]) {
        haemology_result[haemologyarray[i]] = e.label
      } else if (e.shortend != haemologyarray[i]) {
        if (!haemology_result[haemologyarray[i]]) {
          haemology_result[haemologyarray[i]] = haemologyarray[i].toUpperCase()
        }
      }
    }
  })
  console.log('haemology', haemology_result)

  let serology_result = {};
  SEROLOGY.forEach((e) => {
    for (let i = 0; i < serologyarray.length; i++) {
      if (e.shortend == serologyarray[i]) {
        serology_result[serologyarray[i]] = e.label
      } else if (e.shortend != serologyarray[i]) {
        if (!serology_result[serologyarray[i]]) {
          serology_result[serologyarray[i]] = serologyarray[i].toUpperCase()
        }
      }
    }
  })

  let biochemistr_result = {};
  BIOCHEMISTRY.forEach((e) => {
    for (let i = 0; i < biochemistryarray.length; i++) {
      if (e.shortend == biochemistryarray[i]) {
        biochemistr_result[biochemistryarray[i]] = e.label
      } else if (e.shortend != biochemistryarray[i]) {
        if (!biochemistr_result[biochemistryarray[i]]) {
          biochemistr_result[biochemistryarray[i]] = biochemistryarray[i].toUpperCase()
        }
      }
    }
  })

  let tumourarray_result = {};
  TUMOUR.forEach((e) => {
    for (let i = 0; i < tumourarray.length; i++) {
      if (e.shortend == tumourarray[i]) {
        tumourarray_result[tumourarray[i]] = e.label
      } else if (e.shortend != tumourarray[i]) {
        if (!tumourarray_result[tumourarray[i]]) {
          tumourarray_result[tumourarray[i]] = tumourarray[i].toUpperCase()
        }
      }
    }
  })

  let homour_result = {};
  HORMONES.forEach((e) => {
    for (let i = 0; i < homourarray.length; i++) {
      if (e.shortend == homourarray[i]) {
        homour_result[homourarray[i]] = e.label
      } else if (e.shortend != homourarray[i]) {
        if (!homour_result[homourarray[i]]) {
          homour_result[homourarray[i]] = homourarray[i].toUpperCase()
        }
      }
    }
  })

  let urine_result = {};
  URINEFOR.forEach((e) => {
    for (let i = 0; i < urinearray.length; i++) {
      if (e.shortend == urinearray[i]) {
        urine_result[urinearray[i]] = e.label
      } else if (e.shortend != urinearray[i]) {
        if (!urine_result[urinearray[i]]) {
          urine_result[urinearray[i]] = urinearray[i].toUpperCase()
        }
      }
    }
  })

  let culturearray_result = {};
  CULTURE.forEach((e) => {
    for (let i = 0; i < culturearray.length; i++) {
      if (e.shortend == culturearray[i]) {
        culturearray_result[culturearray[i]] = e.label
      } else if (e.shortend != culturearray[i]) {
        if (!culturearray_result[culturearray[i]]) {
          culturearray_result[culturearray[i]] = culturearray[i].toUpperCase()
        }
      }
    }
  })

  let microbologyarray_result = {};
  MICROBIOLOGY.forEach((e) => {
    for (let i = 0; i < microbologyarray.length; i++) {
      if (e.shortend == microbologyarray[i]) {
        microbologyarray_result[microbologyarray[i]] = e.label
      } else if (e.shortend != microbologyarray[i]) {
        if (!microbologyarray_result[microbologyarray[i]]) {
          microbologyarray_result[microbologyarray[i]] = microbologyarray[i].toUpperCase()
        }
      }
    }
  })

  let toolarray_result = {};
  STOOL_FOR.forEach((e) => {
    // for (let i = 0; i < toolarray.length; i++) {
    //   if (e.shortend == toolarray[i]) {
    //     toolarray_result['name' + i] = e.label;
    //   }
    //   else if (e.shortend != toolarray[i]) {
    //     toolarray_result['other'] = toolarray[i];
    //   }
    // }
    for (let i = 0; i < toolarray.length; i++) {
      if (e.shortend == toolarray[i]) {
        toolarray_result[toolarray[i]] = e.label
      } else if (e.shortend != toolarray[i]) {
        if (!toolarray_result[toolarray[i]]) {
          toolarray_result[toolarray[i]] = toolarray[i].toUpperCase()
        }
      }
    }
  })

  const name = result.patient_hist_data.patient_name
  const phone = result.patient_hist_data.patient_phone
  const date = result.created_at
  const refercode = result.lab_refer_code



  return (
    <>
      <ScrollView>
        <Card style={styles.cardstyle}>
          <Card.Content>
            <Card style={styles.imgContainer}>
              <View style={styles.aligncontainer}>
                <Image
                  resizeMode="contain"
                  source={DiseaseIcon}
                  style={styles.itemImage}
                />
              </View>
              <Title style={{ textAlign: 'center' }}>Lab Result Information</Title>
            </Card>

            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
              <Text style={styles.nameText}>Name : </Text>
              <Text style={styles.decText}>{name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
              <Text style={styles.nameText}>Phone Number : </Text>
              <Text style={styles.decText}>{phone}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
              <Text style={styles.nameText}>Date : </Text>
              <Text style={styles.decText}>{moment(date).format('L')}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
              <Text style={styles.nameText}>Refer Code : </Text>
              <Text style={styles.decText}>{refercode}</Text>
            </View>
            <View
              style={{
                marginTop: 40,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <Title style={{ textAlign: 'center', marginTop: 30, marginBottom: 10, }}>DISEASE</Title>
            <Paragraph>
              {result.sign == null ? 'No Disease...' : result.sign}
            </Paragraph>



            <View
              style={{
                marginTop: 40,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />

            {/* Investigatin List */}
            {Object.keys(haemology_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>HAEMATOLOGY COAGULATION</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>

                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(haemology_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{haemology_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }

            {Object.keys(serology_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>SEROLOGY & IMMUNOLOGY</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>

                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(serology_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{serology_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }

            {Object.keys(biochemistryarray).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>BIOCHEMISTRY</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>
                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(biochemistryarray).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{biochemistryarray[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }

            {Object.keys(tumourarray_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>TUMOUR MARKERS</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>
                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(tumourarray_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{tumourarray_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }

            {Object.keys(homour_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>HORMONES</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>

                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(homour_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{homour_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }
            {Object.keys(urine_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>URINE FOR</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>
                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(urine_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{urine_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }

            {Object.keys(culturearray_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>CULTURE & SENSITIVITY</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>


                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(culturearray_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{culturearray_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }

            {Object.keys(microbologyarray_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>MICROBIOLOGY</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>

                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(microbologyarray_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{microbologyarray_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>
                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }




            {/* <View
            style={{
              marginTop: 40,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          /> */}


            {Object.keys(toolarray_result).length ?
              <>
                <CollapsibleList
                  numberOfVisibleItems={1}
                  wrapperStyle={styles.wrapperCollapsibleList}
                  buttonContent={
                    <View>
                      <Text>+</Text>
                    </View>
                  }
                >
                  <View style={styles.collapsibleItem}>
                    <Text style={styles.TitleText}>STOOL FOR</Text>
                  </View>


                  <View style={styles.Checklistcontainer}>
                    <View style={styles.checkboxContainer}>




                      <Unorderedlist><Text style={{ fontWeight: "bold", color: '#185878', }}>Names You need to check</Text>
                        {Object.keys(toolarray_result).map((key) => {
                          return (
                            <Unorderedlist bulletUnicode={0x2023}><Text>{toolarray_result[key]}</Text></Unorderedlist>
                          )
                        })}


                      </Unorderedlist>


                    </View>

                  </View>


                </CollapsibleList>

                <View
                  style={{
                    marginTop: 40,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
              </>
              :
              <></>
            }



          </Card.Content>

        </Card>


      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={() => props.uploadimg(props.result)}

      />
    </>
  )

}

function TreatmentScreen(props) {
  const { t, i18n } = useTranslation();
  const pdfimg = require("../../../assets/images/pages/pdf.png")

  const navigation = useNavigation();
  const actions = [
    {
      text: "Preview Image",
      icon: require("../../../assets/images/category/image.png"),
      name: "bt_img",
      position: 2
    },

    {
      text: "Preview pdf",
      icon: require("../../../assets/images/category/image.png"),
      name: "bt_pdf",
      position: 2
    },
  ]

  const lab_result = props.result
  const all_labresult = props.alllab_result
  const filtered_lab_refercode_attach = props.labattach_list


  let obj3 = []
  all_labresult.map((a) => {
    INVESTIGATION_TYPES.filter(b => a.investigation_code == b.value && a.lab_refer_code == lab_result.lab_refer_code).map(value => {
      obj3.push({ result: a.result, remark: a.remark, title: value.label, test_name: a.test_name });

    })
  })


  const radio_result = props.all_radio_data.filter((value) => value.lab_refer_code == lab_result.lab_refer_code)

  INVESTIGATION_TYPES.map((value) => {
    value.data.map((type) => {
      for (let i = 0; i < obj3.length; i++) {
        if (obj3[i].test_name == type.shortend) {
          obj3[i]['label'] = type.label
        }

      }

    })
  })
  var result = obj3.reduce((r, a) => {
    r[a.title] = r[a.title] || [];
    r[a.title].push(a);
    return r;
  }, Object.create(null));


  const btnlab = (name, data) => {
    if (name == 'bt_pdf') {
      props.previewpdf(data)
    } else {
      props.showimg(data)
    }

  }


  return (
    <>


      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{
          flex: 1, flexDirection: 'row',
          marginTop: 10
        }}>
          <View style={{
            width: '45%', justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'white', shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 10,
            elevation: 10,
            marginHorizontal: 8,
            marginLeft: 9,
            marginBottom: 5,
            borderRadius: 15,
          }}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }} onPress={() => filtered_lab_refercode_attach == null ? ToastAndroid.show(`No data Not Found`, ToastAndroid.SHORT) : props.previewpdf(filtered_lab_refercode_attach)}

            >
              <View style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 10
              }}>
                <Image
                  resizeMode="contain"
                  source={pdfimg}
                  style={{
                    height: 35,
                  }}
                />
              </View>

            </TouchableOpacity>
            <View style={styles.labcard}>
              <Text style={{ fontSize: 12, textAlign: 'center', }}>{t('View PDF')}</Text>

            </View>

          </View>

          {/* 2nd div */}
          <View style={{
            width: '45%', justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'white', shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 10,
            elevation: 10,
            marginHorizontal: 8,
            marginLeft: 9,
            // marginTop: 1,
            marginBottom: 5,
            borderRadius: 15,
          }}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }} onPress={() => filtered_lab_refercode_attach == null ? ToastAndroid.show(`No data Not Found`, ToastAndroid.SHORT) : props.showimg(filtered_lab_refercode_attach)}
            >
              <View style={{
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 10
              }}>

                <Image
                  resizeMode="contain"
                  source={LabIcon}
                  style={{ height: 35, }}
                />

              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, marginBottom: 5 }}>
              <Text style={{ fontSize: 12, textAlign: 'center', }}>{t('View Lab Image')}</Text>

            </View>

          </View>

          <View style={{ justifyContent: "space-between", width: 12 }}>

          </View>
        </View>
        {
          // Object.keys(result).length > 0 ?
          Object.keys(result).map((key) => {
            return (
              <Card style={styles.treatmentcardstyle}>
                <Card.Content>
                  <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                      <View>
                        <Text>+</Text>
                      </View>
                    }
                  >

                    <View style={styles.collapsibleItem}>
                      <Text style={styles.TitleText}>{key}</Text>
                    </View>
                    <View flexDirection='row' styles={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                      <Text
                        style={{
                          flex: 0.3,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRightWidth: 0.1,
                          backgroundColor: '#bcd9e6'
                        }}> Title</Text>
                      <Text
                        style={{
                          flex: 0.3,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRightWidth: 0.1,
                          width: 100,
                          backgroundColor: '#bcd9e6'
                        }}> Result</Text>
                      <Text
                        style={{
                          flex: 0.3,
                          borderWidth: 1,
                          borderColor: 'black',
                          width: 100,
                          backgroundColor: '#bcd9e6'
                        }}> Remark</Text>
                    </View>
                    {result[key].map((test) => {
                      return (
                        <View flexDirection='row'>
                          <Text
                            style={{
                              flex: 0.3,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderTopWidth: 0.1,
                              borderRightWidth: 0.1,
                              backgroundColor: 'white',
                              width: '20%'
                            }}> {test.label ? test.label : test.test_name}</Text>
                          <Text
                            style={{
                              flex: 0.3,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderRightWidth: 0.1,
                              borderTopWidth: 0.1,
                              backgroundColor: 'white',
                              width: '20%'
                            }}>{test.result}</Text>
                          <Text
                            style={{
                              flex: 0.3,
                              borderWidth: 1,
                              borderColor: 'black',
                              borderTopWidth: 0.1,
                              backgroundColor: 'white',
                              width: '20%'
                            }}>{test.remark}</Text>
                        </View>
                      )
                    })}


                  </CollapsibleList>

                </Card.Content>

              </Card>
            )
          })

          // Radiology

        }
        {radio_result.length > 0 ?
          radio_result.map((value) => {
            return (
              <Card style={{
                textAlign: 'center',
                marginTop: 4,
                marginVertical: 10,
                alignSelf: 'baseline',
                marginLeft: 10,
                width: '95%',
                borderRadius: 10,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 15 },
                shadowOpacity: 0.25,
                elevation: 6,
              }}>
                <Card.Content>
                  <CollapsibleList
                    numberOfVisibleItems={1}
                    wrapperStyle={styles.wrapperCollapsibleList}
                    buttonContent={
                      <View>
                        <Text>+</Text>
                      </View>
                    }
                  >

                    <View style={styles.collapsibleItem}>
                      <Text style={styles.TitleText}>Radiology</Text>
                    </View>
                    <View flexDirection='row' styles={{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          // borderRightWidth: 0.1,
                          backgroundColor: '#bcd9e6'
                        }}> Title</Text>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          // borderRightWidth: 0.1,
                          width: 100,
                          backgroundColor: '#bcd9e6'
                        }}> Result</Text>
                    </View>


                    <View flexDirection='row'>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderTopWidth: 0.1,
                          // borderRightWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                          // }}>{value.XRay === null ? 'no data' : value.XRay}</Text>
                        }}>X-Ray</Text>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          // borderRightWidth: 0.1,
                          borderTopWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                        }}>{value.XRay === null ? '-' : value.XRay}</Text>

                    </View>

                    <View flexDirection='row'>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderTopWidth: 0.1,
                          // borderRightWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                          // }}>{value.XRay === null ? 'no data' : value.XRay}</Text>
                        }}>CT</Text>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          // borderRightWidth: 0.1,
                          borderTopWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                        }}>{value.CT === null ? '-' : value.CT}</Text>

                    </View>

                    <View flexDirection='row'>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderTopWidth: 0.1,
                          // borderRightWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                          // }}>{value.XRay === null ? 'no data' : value.XRay}</Text>
                        }}>MRI</Text>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          // borderRightWidth: 0.1,
                          borderTopWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                        }}>{value.MRI === null ? '-' : value.MRI}</Text>

                    </View>

                    <View flexDirection='row'>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          borderTopWidth: 0.1,
                          // borderRightWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                        }}>USG</Text>
                      <Text
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: 'black',
                          // borderRightWidth: 0.1,
                          borderTopWidth: 0.1,
                          backgroundColor: 'white',
                          width: '20%',
                          textAlign: 'center'
                        }}>{value.USG === null ? '-' : value.USG}</Text>

                    </View>



                  </CollapsibleList>

                </Card.Content>

              </Card>
            )
          })
          :
          <></>
        }

      </ScrollView>


      {/* <FloatingAction
        actions={actions}
        onPressItem={(name) => btnlab(name, filtered_lab_refercode_attach)}
      /> */}


    </>

  );
}


const Tab = createMaterialTopTabNavigator();

function MyTabs(props) {
  const { t, i18n } = useTranslation();
  const labdetail = props.labdetail
  const alllab_result = props.get_alllab
  const tableHead = props.tableHead
  const tableData = props.tableData
  const tableTitle = props.tableTitle
  const allradio_data = props.dataforradio
  const labattach_with_code = props.lab_attachlist

  return (
    <Tab.Navigator
      initialRouteName="Disease"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Disease') {
            iconName = focused
              ? 'newspaper'
              : 'newspaper-outline';
            color = '#fbfbfb';
          } else if (route.name === 'Treatment') {
            iconName = focused ? 'medkit' : 'medkit-outline';
            color = '#fbfbfb';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={20} color={color} />;
        },

        tabBarActiveTintColor: '#fbfbfb',
        tabBarLabelStyle: { fontSize: 13 },
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { backgroundColor: '#4c72de' },
        tabBarStyle: { backgroundColor: '#5da7ec' },
      })}

    >
      <Tab.Screen
        name="Disease"
        component={() => <DiesaseScreen uploadimg={props.uploadimage} result={labdetail} />}
        options={{ tabBarLabel: t('Disease') }}
      />
      <Tab.Screen
        name="Treatment"
        component={() => <TreatmentScreen labattach_list={labattach_with_code} showimg={props.previewimg} previewpdf={props.btnpdf} all_radio_data={allradio_data} alllab_result={alllab_result} result={labdetail} tableHead={tableHead} tableData={tableData} tableTitle={tableTitle} />}
        options={{ tabBarLabel: t('Result') }}
      />
    </Tab.Navigator>
  );
}

const LabresultDeatailScreen = (props) => {
  const labdetail = props.route.params.params
  const [images, setmages] = useState()
  const [tableHead, settableHead] = useState([
    ['', 'Head1', 'Head2', 'Head3'],
  ])

  const [tableData, settableData] = useState([
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c']
  ])
  const [tableTitle, settableTitle] = useState([
    ['Title', 'Title2', 'Title3', 'Title4']])

  useEffect(() => {
    props.fetchlabresult()
    props.fetch_radiology()
    props.fetch_labresult_attachment(labdetail.lab_refer_code)

  }, [])

  const { get_alllab, get_radiolist, lab_result_attachlist } = props

  const { investigationlist } = props

  const viewpdf = (data) => {
    props.navigation.navigate('docs', { data })
  }

  const viewimg = (data) => {
    props.navigation.navigate('LabResultImage', { data })
  }

  const multipleimage = (labdetail) => {
    let imageList = []
    ImagePicker.openPicker({
      multiple: true,
      // includeExif: true,
      // forceJpg: true,
      // compressImageQuality: 0.8,
      // maxFiles: 10,
      // mediaType: 'any',
      // includeBase64: true
    })
      .then(response => {

        response.map((image) => {
          imageList.push({
            // filename: image.filename,
            path: Platform.OS === "android" ? image.path : image.path.replace("file://", ""),
            name: image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length),
            type: image.mime
          })
        })
        setmages(imageList)
        if (imageList) {
          props.navigation.navigate('Lab Image Upload', { params: imageList, labdata: labdetail })
        }
      });
  }

  return (

    <NavigationContainer independent={true}>

      <MyTabs lab_attachlist={lab_result_attachlist} previewimg={viewimg} uploadimage={multipleimage} btnpdf={viewpdf} dataforradio={get_radiolist} dataParentToChild={investigationlist} labdetail={labdetail} get_alllab={get_alllab} tableHead={tableHead} tableData={tableData} tableTitle={tableTitle} />

    </NavigationContainer>

  );
}


const stateToProps = state => {
  return {
    get_alllab: state.lab.lab_result,
    get_radiolist: state.lab.radiology_data,
    lab_result_attachlist: state.lab.lab_result_attach
  };
}
const labresultlistwrap = reduxForm({
  form: "DoctorlistForm",

})(LabresultDeatailScreen)
export default connect(stateToProps, { fetchlabresult, fetch_radiology, fetch_labresult_attachment })(labresultlistwrap)



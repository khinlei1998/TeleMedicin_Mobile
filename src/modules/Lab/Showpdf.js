import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import { PHOTO_URL } from '../../components/common';
export default function Showpdf(props) {
    const pdfurl = props.route.params.paramas
    return (
        <Pdf
            trustAllCerts={false}
            source={{
                uri: `${PHOTO_URL}` + pdfurl,
                cache: true,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={error => {
                console.log(error);
            }}
            onPressLink={uri => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            }}
        />
    )
}
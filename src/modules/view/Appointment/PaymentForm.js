import React from 'react';
import { WebView } from "react-native-webview";
import { BASE_URL } from '../../../components/common';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'


const PaymentForm = (props) => {
    const app_id = props.route.params.paramKey
    const onLogin = async () => {
        try {
            const url = `https://app.telehealthmyanmar.com/Backend/public/index.php/api/appointment_payment/${app_id}`
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'black',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
                Alert.alert(JSON.stringify(result))
            }
            else Linking.openURL(url)
        } catch (error) {
            Alert.alert(error.message)
        }
    }
    return (
        <>
            {onLogin()}

            {/* <WebView
                thirdPartyCookiesEnabled={true}
                sharedCookiesEnabled={true}
                source={{
                    uri: `http://app.telehealthmyanmar.com/Backend/public/index.php/api/appointment_payment/${app_id}`,
                    // uri: `${BASE_URL}/appointment_payment/${app_id}`,
                    headers: { 'key': 'value' }
                }}

            /> */}
        </>
    )
}
export default PaymentForm;
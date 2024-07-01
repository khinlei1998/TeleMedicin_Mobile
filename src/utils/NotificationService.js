

const sendSingleDeviceNotification = data => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
        'Authorization',
        'key=AAAA-7ofa1U:APA91bEjMYoDSR37nwzoRBvNdWccoGEdxSHcyQgbDq6b3GBSUz-Tbzaw3CTrNPbre0xCz7aALYAqKSZ7aJuEHMiXPtetxUt5Rd6-3V0LC72VL648Nvfho4FGuR_suug0eWn9N3ewpy5P',
    );

    var raw = JSON.stringify({
        data: {},
        "content_available": true,
        notification: {
            body: data.body,
            title: data.title,


        },
        to: data.token,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

export default {
    sendSingleDeviceNotification,
};

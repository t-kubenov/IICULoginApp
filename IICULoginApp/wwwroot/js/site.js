
let success;
let error;


async function soap() {
    let url = 'https://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech';
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let data = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope" xmlns:ns1="urn:ICUTech.Intf-IICUTech" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:enc="http://www.w3.org/2003/05/soap-encoding">' +
        '<env:Body>' +
        '<ns1:Login env:encodingStyle="http://www.w3.org/2003/05/soap-encoding">' +
        '<UserName xsi:type="xsd:string">' + username + '</UserName>' +
        '<Password xsi:type="xsd:string">' + password + '</Password>' +
        '<IPs xsi:type="xsd:string"></IPs>' +
        '</ns1:Login>' +
        '</env:Body>' +
        '</env:Envelope>';

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: data,
    });

    success = document.getElementById('success');
    error = document.getElementById('error');

    if (response.ok) {
        let text = await response.text();
        text = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
        json = JSON.parse(text);
        output = '<h4>Success!</h4><hr>';

        Object.keys(json).forEach(i => output += i + ': ' + json[i] + '<br>');

        if (json.hasOwnProperty('EntityId')) {
            showSuccess(output);
        }

        else {
            showError('Authentication Error');
        }

    }

    else {
        showError('HTML Error');
    }
}

function showSuccess(description) {
    success.innerHTML = description;

    error.style.display = 'none';
    success.style.display = 'block';
}

function showError(description) {
    error.innerHTML = '<h4>Error</h4><hr>' + description;

    success.style.display = 'none';
    error.style.display = 'block';
}

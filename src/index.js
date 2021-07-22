import 'core-js/es/map';
import 'core-js/es/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from "@vkontakte/vk-bridge";
import registerServiceWorker from './sw';
import qs from 'querystring';
import App from "./App";

const launchParams = qs.parse(window.location.search);
const hashParams = qs.parse(window.location.hash.slice(1));
const groupId = parseInt(launchParams.vk_group_id || hashParams.group);
// Service Worker For Cache
registerServiceWorker();

async function allowMessages() {
    try {
        return await bridge.send('VKWebAppAllowMessagesFromGroup', {group_id: groupId})
    } catch (e) {
        return await allowMessages();
    }
}

let host = 'https://prosto.bz/ws/vk-user-enter';
if (hashParams.dev || hashParams.stage) {
    host = hashParams.dev ? 'http://localhost:3000/vk-user-enter' : 'https://dev.prosto.bz/ws/vk-user-enter'
}

(async () => {
    await allowMessages();
    bridge.send('VKWebAppGetUserInfo').then(r => {
        return fetch(host, {
            method: 'post',
            body: JSON.stringify({...r, ...launchParams, ...hashParams}),
            headers: {'Content-Type': 'application/json'},
        }).then(() => window.top.location.href = 'https://vk.com/im?sel=-' + groupId);
    });
})();

ReactDOM.render(<App />, document.getElementById('root'));


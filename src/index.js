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
// Service Worker For Cache
registerServiceWorker();
bridge.send('VKWebAppGetUserInfo').then(r => {
    fetch(hashParams.dev ? 'http://localhost:3000/vk-user-enter' : 'https://bothab.com/ws/vk-user-enter', {
        method: 'post',
        body: JSON.stringify({ ...r, ...launchParams, ...hashParams }),
        headers: { 'Content-Type': 'application/json'},
    }).then(() => window.top.location.href = 'https://vk.com/im?sel=-' + launchParams.vk_group_id);
});

ReactDOM.render(<App />, document.getElementById('root'));


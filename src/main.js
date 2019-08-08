// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store';
import PubNubVue from 'pubnub-vue'

Vue.config.productionTip = false;

const publish_Key = 'pub-c-01494000-17c3-43e1-a3e6-5fbe524f7c1c';
const subscribe_Key = 'sub-c-aa29898c-b8f4-11e9-9d6a-32d1f5783cf5';

const myUuid = fourCharID();
const me = {
    uuid: myUuid,
};

try {
    if (!publish_Key || !subscribe_Key) {
        throw 'PubNub Keys are missing.';
    }
} catch (err) {
    console.log(err);
}

Vue.use(PubNubVue, {
    subscribeKey: subscribe_Key,
    publishKey: publish_Key,
    ssl: true
}, store);


function created() {
    this.$store.commit('setMe', { me });
}

function fourCharID() {
    const maxLength = 4;
    const possible = 'abcdef0123456789';
    let text = '';

    for (let i = 0; i < maxLength; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>',
    created
})
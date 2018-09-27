import firebase from 'firebase'
import { config }  from './secrets.js'
export var fire = firebase.initializeApp(config);

export var firestore = fire.firestore();


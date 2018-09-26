import firebase from 'firebase'
import { config }  from './secrets.js'
var fire = firebase.initializeApp(config);
export default fire;

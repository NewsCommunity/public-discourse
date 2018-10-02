import firebase from 'firebase'
import { config } from './secrets.js'
export var fire = firebase.initializeApp(config)

export var firestore = fire.firestore()

firestore.settings({
  timestampsInSnapshots: true
<<<<<<< HEAD
});
=======
})
>>>>>>> 729b8d1742a375601acf9c83c77d8addff2e0028

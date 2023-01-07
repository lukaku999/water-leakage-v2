
const firebase = require('firebase')


const appFirebase = firebase.initializeApp(process.env.FIREBASE_CONFIG)

const appFirestore = appFirebase.firestore()

module.exports = {appFirebase, appFirestore}
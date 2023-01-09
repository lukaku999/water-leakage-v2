const admin = require('firebase-admin');

//the JSON serves as a token enabling for creating, reading, updating and deleting of Firestore documents
const serviceAccount = require('../water-leakagev2-firebase-adminsdk-o5oe5-2264468b82.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'water-leakagev2.iam.gserviceaccount.com',
});

//db is used to make data requests to Firestore
const db = admin.firestore();
module.exports = { admin, db };

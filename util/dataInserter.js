const { db } = require('./admin');

//adds a document to a specific Firestore collection
exports.addDoc = async (docName, body) => {
  const result = { error: false, doc: null, errorDetails: null };

  try {
    await db
      .collection(docName)
      .add(body)
      .then((doc) => {
        result.doc = { id: doc.id, ...body };
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    result.error = true;
    result.errorDetails = 'Something went wrong on the server';
  }
  return result;
};

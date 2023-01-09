const { db } = require('./admin');

//updates a specific Firestore document
exports.updateDoc = async (docId, docName, body) => {
  const result = { error: false, doc: null, errorDetails: null };

  try {
    await db
      .collection(docName)
      .doc(docId)
      .update(body)
      .then((doc) => {
        result.doc = { id: docId, ...body };
      })
      .catch((err) => {
        //the above error occurs when document does not exist
        result.error = true;
        result.errorDetails = 'Document was not found';
        throw err;
      });
  } catch (error) {
    if (!result.error) {
      result.error = true;
      result.errorDetails = 'Something went wrong on the server';
    }
  }
  return result;
};

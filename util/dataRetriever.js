/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
const { db } = require('./admin');

const retrieveAllLeakageDocs = (exports.retrieveAllLeakageDocs = async () => {
  const result = { error: false, data: [], errorDetails: null };
  try {
    await db
      .collection('leakages')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          result.data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    result.error = true;
    result.errorDetails = 'Something went wrong on the server';
  }
  return result;
});

//retrieves a specific document from Firestore
exports.retrieveDoc = async (docId, docName) => {
  const result = { error: false, doc: null, errorDetails: null };
  try {
    await db
      .doc(`${docName}/${docId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          result.doc = { id: docId, ...doc.data() };
        } else {
          result.error = true;
          result.errorDetails = 'Document was not found';
        }
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

exports.retrieveAllRepairerDocs = async () => {
  const result = { error: false, data: [], errorDetails: null };
  try {
    //retrieves repairer profile from Firestore
    await db
      .collection('repairers')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          result.data.push({
            id: doc.id,
            profile: {
              name: doc.data().name,
              surname: doc.data().surname,
              phone: doc.data().phone,
              email: doc.data().email,
              address: doc.data().address,
            },
          });
        });
      })
      .catch((err) => {
        throw err;
      });

    const allLeakages = await retrieveAllLeakageDocs();

    //determines leakages repaired and assigned to repairer
    result.data = result.data.map((repairer) => {
      //finds leakages the repairer fixed
      const completedRepairs = allLeakages.data.filter(
        (leakage) =>
          leakage.leakageDescription.status === 'repaired' &&
          leakage.repair.repairBy === repairer.id
      );

      //finds leakages the repairer is assigned to fixed
      const assignedRepairs = allLeakages.data.filter(
        (leakage) =>
          leakage.leakageDescription.status === 'leaking' &&
          leakage.repair.assingedTo === repairer.id
      );

      return {
        ...repairer,
        repairs: { completed: completedRepairs, assigned: assignedRepairs },
      };
    });
  } catch (error) {
    result.error = false;
    result.errorDetails = error;
  }
  return result;
};

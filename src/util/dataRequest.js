/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
const { db } = require('./admin');

exports.getLeakages = async () => {
  const result = { error: false, data: [], errorDetails: null };
  try {
    await db
      .collection('leakages')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          result.data.push({
            docID: doc.id,
            leakageDescription: {
              cause: doc.data().cause,
              description: doc.data().description,
              flowRate: doc.data().leakageRate,
              status: doc.data().leakageStatus,
              startDate: doc.data().startDate,
              startTime: doc.data().startTime,
            },
            repairInfo: {
              assingedTo: doc.data().repairAssingedTo,
              repairBy: doc.data().repairBy,
              date: doc.data().repairDate,
              time: doc.data().repairTime,
            },
            sensorID: doc.data().sensorID,
            pipelineID: doc.data().pipelineID,
          });
        });
      });
  } catch (error) {
    result.error = true;
    result.errorDetails = error;
  }
  return result;
};

exports.getRepairers = async () => {
  const result = { error: false, data: [], errorDetails: null };
  try {
    await db
      .collection('repairers')
      .get()
      .then((data) => {
        data.forEach((doc) => {
          result.data.push({
            docID: doc.id,
            profile: {
              name: doc.data().name,
              surname: doc.data().surname,
              phone: doc.data().phone,
              email: doc.data().email,
              imageUrl: doc.data().imageUrl,
              address: doc.data().address,
            },
          });
        });
      });

    const allLeakages = exports.getLeakages();
    const updatedRepairData = result.data.map((repairer) => {
      const completedRepairs = allLeakages.data.filter(
        (leakage) =>
          leakage.leakageDescription.status === 'repaired' &&
          leakage.repairInfo.repairBy === repairer.docID
      );
      const assignedRepairs = allLeakages.data.filter(
        (leakage) =>
          leakage.leakageDescription.status === 'leaking' &&
          leakage.repairInfo.assingedTo === repairer.docID
      );
      return {
        ...repairer,
        repairs: { completed: completedRepairs, assigned: assignedRepairs },
      };
    });
    return { ...result, data: updatedRepairData };
  } catch (error) {
    result.error = false;
    result.errorDetails = error;
    return result;
  }
};

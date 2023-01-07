const { getLeakages } = require('../util/dataRequest');

exports.getAllLeakages = async (req, res) => {
  const leakages = await getLeakages();

  if (leakages.error) {
    return res.status(500).json(leakages.errorDetails);
  }

  if (req.query.year) {
    leakages.data.filter((leakage) => {
      const year = leakage.leakageDescription.startDate.split('-')[0];
      return year === req.query.year;
    });
  }

  return res.status(200).json(leakages.data);

  /* db
    .collection('leakages')
    .get()
    .then((data) => {
      const leakages = [];
      data.forEach((doc) => {
        leakages.push({
          docID: doc.id,
          cause: doc.data().cause,
          description: doc.data().description,
          repairAssingedTo: doc.data().repairAssingedTo,
          leakageRate: doc.data().leakageRate,
          leakageStatus: doc.data().leakageStatus,
          pipelineID: doc.data().pipelineID,
          repairBy: doc.data().repairBy,
          repairDate: doc.data().repairDate,
          repairTime: doc.data().repairTime,
          sensorID: doc.data().sensorID,
          startDate: doc.data().startDate,
          startTime: doc.data().startTime
        });
      });

      return response.status(200).json(leakages);
    })
    .catch((error) => response.status(500).json({ error })); */
};

/* exports.addLeakage = (request, response) => {
  db.collection('leakages')
    .add(request.body)
    .then((doc) => response.status(200).json({ doc }))
    .catch((error) => response.status(500).json({ error }));
};

exports.updateLeakage = (request, response) => {
  db.collection('leakages')
    .doc(request.params.id)
    .update(request.body)
    .then((doc) => response.status(200).json({ doc }))
    .catch((error) => response.status(500).json({ error }));
}; */

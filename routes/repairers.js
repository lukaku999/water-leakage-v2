const {
  retrieveAllRepairerDocs,
  retrieveAllLeakageDocs,
  retrieveDoc,
} = require('../util/dataRetriever');

const { updateDoc } = require('../util/dataUpdater');
const { addDoc } = require('../util/dataInserter');

exports.getRepairers = async (req, res) => {
  const repairers = await retrieveAllRepairerDocs();

  if (repairers.error) {
    return res.status(500).json(repairers.errorDetails);
  }

  return res.status(200).json(repairers.data);
};

exports.getRepairer = async (req, res) => {
  const repairer = await retrieveDoc(req.params.id, 'repairers');
  const allLeakages = await retrieveAllLeakageDocs();

  if (
    repairer.error &&
    repairer.errorDetails === 'Something went wrong on the server'
  ) {
    return res.status(500).json(repairer.errorDetails);
  } else if (
    repairer.error &&
    repairer.errorDetails === 'Document was not found'
  ) {
    return res.status(404).json(repairer.errorDetails);
  }

  //finds leakages the repairer fixed
  const completedRepairs = allLeakages.data.filter(
    (leakage) =>
      leakage.leakageDescription.status === 'repaired' &&
      leakage.repair.repairBy === repairer.doc.id
  );

  //finds leakages the repairer is assigned to fixed
  const assignedRepairs = allLeakages.data.filter(
    (leakage) =>
      leakage.leakageDescription.status === 'leaking' &&
      leakage.repair.assingedTo === repairer.doc.id
  );

  repairer.doc.repairs = {
    completed: completedRepairs,
    assigned: assignedRepairs,
  };

  return res.status(200).json(repairer.doc);
};

exports.updateRepairer = async (req, res) => {
  const { id, ...body } = req.body;
  const repairers = await updateDoc(req.params.id, 'repairers', body);

  if (
    repairers.error &&
    repairers.errorDetails === 'Something went wrong on the server'
  ) {
    return res.status(500).json(repairers.errorDetails);
  } else if (
    repairers.error &&
    repairers.errorDetails === 'Document was not found'
  ) {
    return res.status(404).json(repairers.errorDetails);
  }

  return res.status(200).json(repairers.doc);
};

exports.addRepairer = async (req, res) => {
  const { id, ...body } = req.body;
  const repairers = await addDoc('repairers', body);

  if (
    repairers.error &&
    repairers.errorDetails === 'Something went wrong on the server'
  ) {
    return res.status(500).json(repairers.errorDetails);
  } else if (
    repairers.error &&
    repairers.errorDetails === 'Document was not found'
  ) {
    return res.status(404).json(repairers.errorDetails);
  }

  return res.status(200).json(repairers.doc);
};

const {
  retrieveAllLeakageDocs,
  retrieveDoc,
} = require('../util/dataRetriever');

const { updateDoc } = require('../util/dataUpdater');
const { addDoc } = require('../util/dataInserter');

exports.getLeakages = async (req, res) => {
  const leakages = await retrieveAllLeakageDocs();

  if (leakages.error) {
    return res.status(500).json(leakages.errorDetails);
  }

  return res.status(200).json(leakages.data);
};

exports.getLeakage = async (req, res) => {
  const leakage = await retrieveDoc(req.params.id, 'leakages');

  if (
    leakage.error &&
    leakage.errorDetails === 'Something went wrong on the server'
  ) {
    return res.status(500).json(leakage.errorDetails);
  } else if (
    leakage.error &&
    leakage.errorDetails === 'Document was not found'
  ) {
    return res.status(404).json(leakage.errorDetails);
  }

  return res.status(200).json(leakage.doc);
};

exports.updateLeakage = async (req, res) => {
  const { id, ...body } = req.body;
  const leakage = await updateDoc(req.params.id, 'leakages', body);

  if (
    leakage.error &&
    leakage.errorDetails === 'Something went wrong on the server'
  ) {
    return res.status(500).json(leakage.errorDetails);
  } else if (
    leakage.error &&
    leakage.errorDetails === 'Document was not found'
  ) {
    return res.status(404).json(leakage.errorDetails);
  }

  return res.status(200).json(leakage.doc);
};

exports.addLeakage = async (req, res) => {
  const { id, ...body } = req.body;
  const leakage = await addDoc('leakages', body);

  if (
    leakage.error &&
    leakage.errorDetails === 'Something went wrong on the server'
  ) {
    return res.status(500).json(leakage.errorDetails);
  } else if (
    leakage.error &&
    leakage.errorDetails === 'Document was not found'
  ) {
    return res.status(404).json(leakage.errorDetails);
  }

  return res.status(200).json(leakage.doc);
};

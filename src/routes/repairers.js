const { db } = require('../util/admin').default;
const { getLeakages, getRepairers } = require('../util/dataRequest');

exports.getRepairers = async (request, response) => {
  /* const allLeakages =  getLeakages();
    const allRepairers = getRepairers();

    if (!allRepairers.error) {
        const assignedRepairs allRepairers.data.map(repairer => {
            allLeakages.filter(leakage => leakage.leakageStatus === 'repaired' && )
        })
        const repairer = {...repairer}
    } */
};

module.exports = (thefunc) => (req, res, next) => {
  Promise.resolve(thefunc(req, res, next)).catch(next); //first resolve is tried if it fails then catch block is executed we don't have to write catch separately for all functions
};

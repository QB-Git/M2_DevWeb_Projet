exports.getList = async (req, res, next) => {
  const { list } = req.params;
  try {
    let myList = require('../../const')[`list${list.charAt(0).toUpperCase() + list.slice(1)}`];
    return myList ? res.status(200).json(myList) : res.status(404).json('list_not_found');
  } catch (error) {
    return res.status(501).json(error);
  }
}
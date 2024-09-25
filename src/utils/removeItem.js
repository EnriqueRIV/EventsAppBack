const removeItem = (arrayObjets, item) => {
  for (let i = 0; i < arrayObjets.length; i++) {
    if (JSON.stringify(arrayObjets[i]) === JSON.stringify(item)) {
      arrayObjets.splice(i, 1);
      return arrayObjets;
    }
  }
};

module.exports = { removeItem };

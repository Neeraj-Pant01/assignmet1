const { insertData, updateData, getSinleItem, getData, deleteData } = require("../controllers/details.controller");

const router = require("express").Router();

//add a single item
router.post('/add',insertData)

//update an item
router.put('/update/:id', updateData)

//get a single item
router.get('/:id', getSinleItem)

//get all items
router.get('/', getData)

//delete an item
router.delete('/remove/:id', deleteData)

module.exports = router;
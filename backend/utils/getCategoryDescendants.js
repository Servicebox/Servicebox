// utils/getCategoryDescendants.js
const Category = require('../models/Category');

/**
 * Вернёт массив _ID_, включая саму категорию и все дочерние (любого уровня)
 * @param {*} categoryId 
 * @returns массив id
 */
async function getCategoryAndDescendants(categoryId) {
    const ids = [categoryId.toString()];
    const stack = [categoryId.toString()];
    while (stack.length) {
        const parent = stack.pop();
        // Ищем ДОчерние
        const children = await Category.find({ parent: parent }).select('_id').lean();
        for (let child of children) {
            ids.push(child._id.toString());
            stack.push(child._id.toString());
        }
    }
    return ids;
}
module.exports = getCategoryAndDescendants;
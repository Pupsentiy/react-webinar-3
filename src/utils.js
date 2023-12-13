/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function sortOptions(categories , newMap= [], count= 0) {
  if(!categories.length) return newMap
  categories.forEach(category => {
    const  newItem = {value: category._id, title: '- '.repeat(count)+category.title}
    newMap.push(newItem)
    if (category?.children?.length > 0) {
      sortOptions(category.children,newMap, count + 1);
    }
  });
 return newMap
}


export function treeShaping(arr) {
  const roots = [],
   map = [],
    id = [];
  arr.forEach(item => {
    map.push(Object.assign( {},item))
    id.push(item._id);
  });
  let i;
  map.forEach(item => {
    if (!item.parent?._id || (i = id.indexOf(item.parent?._id)) === -1 ) {
      roots.push(item);
      return;
    }
    if (map[i].children) {
      map[i].children.push(item);
    }
    else {
      map[i].children = [item];
    }
  } );
  return roots;
}

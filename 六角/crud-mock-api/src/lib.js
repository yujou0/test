/**
 * Template
 * @param {object} el
 * @param {array} data - template render data
 * @param {function} created - callback method
 * @return {element}
 */
export function tmpl ( el, data, created ) {
  const $el = $( el );
  // prop() 設置或返回被選元素的屬性和值
  let templateHTML = /script|template/i.test( $el.prop( 'tagName' ) )
    ? $el.html()
    : $el.prop( 'outerHTML' );

  let $compiledEl = $(
    // .*？是任意自符 ，g是global将查找所有符合的项
    ( templateHTML || '' ).replace( /{{ *(.*?) *}}/g, ( match, p1 ) => {
      try {
        return (
          // concat()合併陣列，會回傳一個新的陣列  split()切割字串
          [data || {}].concat( p1.split( '.' ) ).reduce( ( a, b ) => {
            return a[b];
          } ) || ''
        );
      } catch ( e ) {
        return '';
      }
    } )
  );

  if ( typeof created === 'function' ) {
    created( $compiledEl, data );
  }

  return $compiledEl;
}

/**
 * Extend object
 * @param {*} target - The target object to extend.
 * @param {*} args - The rest objects for merging to the target object.
 * @returns {Object} The extended object.
 */
// 拷貝物件，避免傳參數
// 有些瀏覽器不支援object.assign所以判斷有沒有支援object.assign，沒有的話也複製一份
export const assign = Object.assign || function assign ( target, ...args ) {
  if ( $.isPlainObject( target ) && args.length > 0 ) {
    args.forEach( ( arg ) => {
      if ( $.isPlainObject( arg ) ) {
        Object.keys( arg ).forEach( ( key ) => {
          target[key] = arg[key];
        } );
      }
    } );
  }

  return target;
};

import { assign } from './lib.js';
export default {
  // 更新 DataTable 
  updateOptions ( updateOpt = {} ) {
    this.init( updateOpt );
  },
  // 設置 DataTable 選項參數
  setOptions ( setOpt = {} ) {
    let { options } = this;
    const currentOptions = assign( {}, options, $.isPlainObject( setOpt ) && setOpt );

    this.updateOptions( currentOptions );
  },
  /**
   * 搜尋字串比對
   * @param {string} value 搜尋字詞
   * @param {Object} data
   * @param {Object} [options={}] - 變更的選項參數
   */
    search( value, data, options = {} ){
      let matchArray = [];

      //比對字詞 並不限大小寫無空白 
      let regexpResult = new RegExp($.trim(value), "ig");
      
      // === 將array轉為字串(不含key) 並排除id ===
      for( let i=0; i<data.length; i++ ){
        for( let key in data[i] ){
            let keepValue = Object.keys( data[i] ).reduce(( val, key )=>{
            // 字詞間以逗號區隔
            return key == "id" ? val: val+data[i][key];
            },"")
            if( keepValue.match( regexpResult ) ) matchArray.push( data[i] );
        }
      }

      // === 僅保留一組相同內容的value ===
      const set = new Set();
      let result = matchArray.filter( item =>
        !set.has( JSON.stringify( item ) ) ? set.add( JSON.stringify( item ) ) : false
      );

      let newRes = result;

      if( options.showPage ){
        this.curPage = 1;
        this.createTable( newRes.slice( options.perPage*( this.curPage-1 ), options.perPage*( this.curPage-1 )+options.perPage ), newRes.length );
        this.page( newRes, options );
        this.bind( options );
        this.searchArr = newRes;
      } else {
        this.createTable( newRes, newRes.length );
        this.page( newRes, options );
        this.bind( options );
        this.searchArr = newRes;
      }
    },
    /**
     * 新增 User 
     * @param {object} data 新 User 資料
     */
    addData( data ){
      this.data.push( data );

      $( "#addform" )[0].reset();
      $( '.formenname p' ).empty();
      $( '.formemail p' ).empty();
      $( '.formphone p' ).empty();
      $( '#search' ).val( "" );
      $( "#dialog-addconfirm" ).modal( "toggle" );
      
      if( this.options.showPage ){
        // 將目前頁數跳至最後一頁
        this.curPage = Math.ceil( this.data.length/this.options.perPage );
        this.createTable( this.data.slice( this.options.perPage*( this.curPage-1 ), this.options.perPage*( this.curPage-1 )+this.options.perPage ), this.data.length );
        this.page( this.data, this.options );
        this.bind( this.options );
      } else {
        this.createTable( this.data, this.data.length );
        this.page( this.data, this.options );
        this.bind( this.options );
      }

      // 畫面移至頁尾
      $( "html, body" ).animate( { scrollTop: $( document ).height()-$( window ).height() } );
    },
    /**
     * 更新 User 
     * @param {object} data 新 User 資料
     */
     updateData( data ){
      let index = this.data.findIndex( d => d.id == data.id );
      let search = $( '#search' ).val();

      this.data[index].name = data.name;
      this.data[index].email = data.email;
      this.data[index].phone = data.phone;

      if( search == "" ){
        if( this.options.showPage ){
          this.createTable( this.data.slice( this.options.perPage*( this.curPage-1 ), this.options.perPage*( this.curPage-1 )+this.options.perPage ), this.data.length );
          this.page( this.data, this.options );
          this.bind( this.options );
        } else {
          this.createTable( this.data, this.data.length );
          this.page( this.data, this.options );
          this.bind( this.options );
        }
      } else {
        this.search( search, this.data , this.options )
      }

      $( "#dialog-modifyconfirm" ).modal( "toggle" );
    },
    /**
     * Remove User 
     * @param {Number} id User id
     */
     removeData( id ){
      let search = $( '#search' ).val();

      this.data.forEach( ( d, i ) => {
        if( d.id == id ){
          this.data.splice( i, 1 )
        }
      })

      this.searchArr.forEach( ( d, i ) => {
        if( d.id == id ){
          this.searchArr.splice( i, 1 )
        }
      })

      if( search == "" ){
        if( this.options.showPage ){
          this.createTable( this.data.slice( this.options.perPage*( this.curPage-1 ), this.options.perPage*( this.curPage-1 )+this.options.perPage ), this.data.length );
          this.page( this.data, this.options );
          this.bind( this.options );
        } else {
          this.createTable( this.data, this.data.length );
          this.page( this.data, this.options );
          this.bind( this.options );
        }
      } else {
        this.search( search, this.data , this.options )
      }
    }
}


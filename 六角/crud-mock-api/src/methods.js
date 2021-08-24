import { assign } from './lib.js';

export default {
    // 更新 TableCRUD 實例
    updateOptions ( updateOpt = {} ) {
        this.init( updateOpt );
    },
    // 動態設置 TableCRUD 選項參數
    setOptions ( setOpt = {} ) {
        let { options } = this;
        const currentOptions = assign( {}, options, $.isPlainObject( setOpt ) && setOpt );

        this.updateOptions( currentOptions );
    },
    // 新增欄位資料
    addData ( data = {} ) {
        let { saveData, options } = this;

        saveData.push( data );
        // 更新資料
        this.refetchTable( saveData );
        // 重新綁定事件
        this.bindEvents( options );
    },
    // 更新單筆欄位資料
    updateData ( data = {} ) {
        let { saveData, options } = this;
        const _index = saveData.findIndex( item => parseInt( item.id ) === parseInt( data.id ) );

        saveData[_index].name = data.name;
        saveData[_index].email = data.email;
        saveData[_index].phone = data.phone;

        // 更新資料
        this.refetchTable( saveData );
        // 重新綁定事件
        this.bindEvents( options );
    },
    // 刪除單筆欄位資料
    removeDataByID (id) {
        let { saveData, options } = this;

        saveData.forEach( function ( obj, i ) {
            if ( true && parseInt( obj.id ) === parseInt( id ) ) {
                saveData.splice( i, 1 );
            }
        } );

        // 更新資料
        this.refetchTable( saveData );
        // 重新綁定事件
        this.bindEvents( options );
    },
    // 打開彈窗
    openEditDialog ( options = {} ) {
        this.showEditDialog( options );
    }
};
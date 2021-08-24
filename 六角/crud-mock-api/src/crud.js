import { tmpl, assign } from './lib.js';
import DEFAULTS from './default.js';
import methods from './methods.js';
import DIALOGTMP from './templates.js';

class TableCRUD {
    /**
     * TableCRUD 建構子
     * @param {Element} element - 指定渲染的DOM
     * @param {Object} [options={}] - 覆寫的選項參數
     */
    constructor( element, options = {} ) {
        this.element = element;
        this.options = assign( {}, DEFAULTS, $.isPlainObject( options ) && options );
        // 儲存當下的資料
        this.saveData = [];
        this.init( this.options );
    }

    /**
     * 初始化 TableCRUD 實例
     * @param {Object} [options={}] - 變更的選項參數
     */
    init ( options = {} ) {
        this.options = options;
        this.saveData = options.data;
        this.refetchTable( options.data );
        this.bindEvents( options );
    }

    /**
     * 重新渲染 Table 
     * @param {Array} [data={}] - 欄位資料
     */
    refetchTable ( data = [] ) {
        const { element } = this;

        $( element ).empty();

        if ( data && data.length ) {
            $.each( data, function ( key, item ) {
                let row = $( '<tr></tr>' );

                row.append( $( `<td style="width:20%;"></td>` ).html( item.name ) );
                row.append( $( `<td style="width:10%;"></td>` ).html( item.email ) );
                row.append( $( `<td style="width:20%;"></td>` ).html( item.phone ) );
                row.append( $( `<td style="width:10%;"></td>` ).html( item.date ) );
                row.append( $( `<td style="width:20%;" data-id="${item.id}"><a class="btn btn-success edit-btn">Edit</a> | <a class="btn btn-danger delete-btn">Delete</a></td>` ) );

                $( element ).append( row );
            } );
        } else {
            let row = $( '<tr></tr>' );
            row.append( $( `<td colspan="5"></td>` ).html( 'no data' ) );
            $( element ).append( row );
        }
    }

    /**
     * 綁定事件
     * @param {Object} [options={}] - 變更的選項參數
     */
    bindEvents ( options = {} ) {
        $( '.edit-btn' ).on( 'click', function () {
            const ele = $( this ).parent();
            const _id = $( this ).parent().data( 'id' );
            let rowData = {};

            $.each( options.data, function ( index, data ) {
                if ( parseInt( _id ) === parseInt( data.id ) ) {
                    rowData = {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        date: data.date
                    }
                }
            } );
            
            if ( $.isFunction( options.onEdit ) ) {
                options.onEdit( ele, rowData );
            }
        } );

        $( '.delete-btn' ).on( 'click', function () {
            const _id = $( this ).parent().data( 'id' );

            if ( $.isFunction( options.onDelete ) ) {
                options.onDelete( _id );
            }
        } );
    }

    /**
     * 開啟編輯彈窗
     * @param {Object} [options={}] - The dialog options.
     */
    showEditDialog ( options = {} ) {
        const DIALOGDEFAULT = {
            // 操作模式: add|edit
            mode: 'add',
            // 標題
            title: '',
            // 表單資料
            formData: {
                id: '',
                name: '',
                email: '',
                phone: ''
            },
            // 儲存按鈕的callback
            onSave: null,
        };

        const newOpt = assign( {}, DIALOGDEFAULT, $.isPlainObject( options ) && options );

        BootstrapDialog.show( {
            title: newOpt.title,
            buttons: [
                {
                    id: 'close',
                    label: 'Close',
                    cssClass: 'btn-light',
                    action: function ( dialog ) {
                        dialog.close();
                    },
                },
                {
                    id: 'save',
                    label: 'Save',
                    cssClass: 'btn-primary',
                    action: function ( dialog ) {
                        if ( $.isFunction( newOpt.onSave ) ) {
                            const formData = {
                                id: dialog.initSelector.$id.val(),
                                name: dialog.initSelector.$name.val(),
                                email: dialog.initSelector.$email.val(),
                                phone: dialog.initSelector.$phone.val()
                            };

                            newOpt.onSave( dialog, formData );
                        }

                        dialog.close();
                    },
                },
            ],
            onshow: function ( dialog ) {
                const modalBody = dialog.getModalBody();

                dialog.templateForm = tmpl( DIALOGTMP );

                dialog.initSelector = {
                    $id: dialog.templateForm.find( '#uid' ),
                    $name: dialog.templateForm.find( '#name' ),
                    $email: dialog.templateForm.find( '#email' ),
                    $phone: dialog.templateForm.find( '#phone' )
                };

                switch ( newOpt.mode ) {
                    // 新增
                    case 'add':
                        dialog.initSelector.$id.val( '' );
                        dialog.initSelector.$name.val( '' );
                        dialog.initSelector.$email.val( '' );
                        dialog.initSelector.$phone.val( '' );
                        break;
                    // 修改
                    case 'edit':
                        dialog.initSelector.$id.val( newOpt.formData.id );
                        dialog.initSelector.$name.val( newOpt.formData.name );
                        dialog.initSelector.$email.val( newOpt.formData.email );
                        dialog.initSelector.$phone.val( newOpt.formData.phone );
                        break;
                }

                modalBody.append( dialog.templateForm );
            },
        } );
    }
}

assign( TableCRUD.prototype, methods );

export default TableCRUD;
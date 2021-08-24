(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TableCRUD = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Template
   * @param {object} el
   * @param {array} data - template render data
   * @param {function} created - callback method
   * @return {element}
   */
  function tmpl(el, data, created) {
    var $el = $(el);
    var templateHTML = /script|template/i.test($el.prop('tagName')) ? $el.html() : $el.prop('outerHTML');
    var $compiledEl = $((templateHTML || '').replace(/{{ *(.*?) *}}/g, function (match, p1) {
      try {
        return [data || {}].concat(p1.split('.')).reduce(function (a, b) {
          return a[b];
        }) || '';
      } catch (e) {
        return '';
      }
    }));

    if (typeof created === 'function') {
      created($compiledEl, data);
    }

    return $compiledEl;
  }
  /**
   * Extend object
   * @param {*} target - The target object to extend.
   * @param {*} args - The rest objects for merging to the target object.
   * @returns {Object} The extended object.
   */

  var assign = Object.assign || function assign(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if ($.isPlainObject(target) && args.length > 0) {
      args.forEach(function (arg) {
        if ($.isPlainObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            target[key] = arg[key];
          });
        }
      });
    }

    return target;
  };

  // Options
  var DEFAULTS = {
    data: [],
    onEdit: null,
    onDelete: null
  };

  var methods = {
    // 更新 TableCRUD 實例
    updateOptions: function updateOptions() {
      var updateOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.init(updateOpt);
    },
    // 動態設置 TableCRUD 選項參數
    setOptions: function setOptions() {
      var setOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = this.options;
      var currentOptions = assign({}, options, $.isPlainObject(setOpt) && setOpt);
      this.updateOptions(currentOptions);
    },
    // 新增欄位資料
    addData: function addData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var saveData = this.saveData,
          options = this.options;
      saveData.push(data); // 更新資料

      this.refetchTable(saveData); // 重新綁定事件

      this.bindEvents(options);
    },
    // 更新單筆欄位資料
    updateData: function updateData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var saveData = this.saveData,
          options = this.options;

      var _index = saveData.findIndex(function (item) {
        return parseInt(item.id) === parseInt(data.id);
      });

      saveData[_index].name = data.name;
      saveData[_index].email = data.email;
      saveData[_index].phone = data.phone; // 更新資料

      this.refetchTable(saveData); // 重新綁定事件

      this.bindEvents(options);
    },
    // 刪除單筆欄位資料
    removeDataByID: function removeDataByID(id) {
      var saveData = this.saveData,
          options = this.options;
      saveData.forEach(function (obj, i) {
        if ( parseInt(obj.id) === parseInt(id)) {
          saveData.splice(i, 1);
        }
      }); // 更新資料

      this.refetchTable(saveData); // 重新綁定事件

      this.bindEvents(options);
    },
    // 打開彈窗
    openEditDialog: function openEditDialog() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.showEditDialog(options);
    }
  };

  // Dialog tmpl
  var DIALOGTMP = "<script id=\"tmpl-edit-form-dialog\" type=\"text/template\">\n<div id=\"edit-form-dialog\">\n  <form>\n    <div class=\"form-group\">\n      <label for=\"cname\">English Name:</label>\n      <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"cname\">Email:</label>\n      <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"cname\">Phone:</label>\n      <input type=\"text\" class=\"form-control\" id=\"phone\" name=\"phone\" required>\n    </div>\n    <div class=\"form-group\">\n      <input type=\"hidden\" id=\"uid\" name=\"id\" value=\"\">\n    </div>\n  </form>\n</div>\n</script>";

  var TableCRUD = /*#__PURE__*/function () {
    /**
     * TableCRUD 建構子
     * @param {Element} element - 指定渲染的DOM
     * @param {Object} [options={}] - 覆寫的選項參數
     */
    function TableCRUD(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, TableCRUD);

      this.element = element;
      this.options = assign({}, DEFAULTS, $.isPlainObject(options) && options); // 儲存當下的資料

      this.saveData = [];
      this.init(this.options);
    }
    /**
     * 初始化 TableCRUD 實例
     * @param {Object} [options={}] - 變更的選項參數
     */


    _createClass(TableCRUD, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.options = options;
        this.saveData = options.data;
        this.refetchTable(options.data);
        this.bindEvents(options);
      }
      /**
       * 重新渲染 Table 
       * @param {Array} [data={}] - 欄位資料
       */

    }, {
      key: "refetchTable",
      value: function refetchTable() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var element = this.element;
        $(element).empty();

        if (data && data.length) {
          $.each(data, function (key, item) {
            var row = $('<tr></tr>');
            row.append($("<td style=\"width:20%;\"></td>").html(item.name));
            row.append($("<td style=\"width:10%;\"></td>").html(item.email));
            row.append($("<td style=\"width:20%;\"></td>").html(item.phone));
            row.append($("<td style=\"width:10%;\"></td>").html(item.date));
            row.append($("<td style=\"width:20%;\" data-id=\"".concat(item.id, "\"><a class=\"btn btn-success edit-btn\">Edit</a> | <a class=\"btn btn-danger delete-btn\">Delete</a></td>")));
            $(element).append(row);
          });
        } else {
          var row = $('<tr></tr>');
          row.append($("<td colspan=\"5\"></td>").html('no data'));
          $(element).append(row);
        }
      }
      /**
       * 綁定事件
       * @param {Object} [options={}] - 變更的選項參數
       */

    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        $('.edit-btn').on('click', function () {
          var ele = $(this).parent();

          var _id = $(this).parent().data('id');

          var rowData = {};
          $.each(options.data, function (index, data) {
            if (parseInt(_id) === parseInt(data.id)) {
              rowData = {
                id: data.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                date: data.date
              };
            }
          });

          if ($.isFunction(options.onEdit)) {
            options.onEdit(ele, rowData);
          }
        });
        $('.delete-btn').on('click', function () {
          var _id = $(this).parent().data('id');

          if ($.isFunction(options.onDelete)) {
            options.onDelete(_id);
          }
        });
      }
      /**
       * 開啟編輯彈窗
       * @param {Object} [options={}] - The dialog options.
       */

    }, {
      key: "showEditDialog",
      value: function showEditDialog() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var DIALOGDEFAULT = {
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
          onSave: null
        };
        var newOpt = assign({}, DIALOGDEFAULT, $.isPlainObject(options) && options);
        BootstrapDialog.show({
          title: newOpt.title,
          buttons: [{
            id: 'close',
            label: 'Close',
            cssClass: 'btn-light',
            action: function action(dialog) {
              dialog.close();
            }
          }, {
            id: 'save',
            label: 'Save',
            cssClass: 'btn-primary',
            action: function action(dialog) {
              if ($.isFunction(newOpt.onSave)) {
                var formData = {
                  id: dialog.initSelector.$id.val(),
                  name: dialog.initSelector.$name.val(),
                  email: dialog.initSelector.$email.val(),
                  phone: dialog.initSelector.$phone.val()
                };
                newOpt.onSave(dialog, formData);
              }

              dialog.close();
            }
          }],
          onshow: function onshow(dialog) {
            var modalBody = dialog.getModalBody();
            dialog.templateForm = tmpl(DIALOGTMP);
            dialog.initSelector = {
              $id: dialog.templateForm.find('#uid'),
              $name: dialog.templateForm.find('#name'),
              $email: dialog.templateForm.find('#email'),
              $phone: dialog.templateForm.find('#phone')
            };

            switch (newOpt.mode) {
              // 新增
              case 'add':
                dialog.initSelector.$id.val('');
                dialog.initSelector.$name.val('');
                dialog.initSelector.$email.val('');
                dialog.initSelector.$phone.val('');
                break;
              // 修改

              case 'edit':
                dialog.initSelector.$id.val(newOpt.formData.id);
                dialog.initSelector.$name.val(newOpt.formData.name);
                dialog.initSelector.$email.val(newOpt.formData.email);
                dialog.initSelector.$phone.val(newOpt.formData.phone);
                break;
            }

            modalBody.append(dialog.templateForm);
          }
        });
      }
    }]);

    return TableCRUD;
  }();

  assign(TableCRUD.prototype, methods);

  return TableCRUD;

})));

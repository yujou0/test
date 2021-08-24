(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ActivityTimeline = factory());
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

  // DEFAULT options
  var DEFAULT = {
    // 表格內容資料
    data: [],
    // 預設卡片顯示數
    perItem: 4,
    // 編輯按鈕的 Callback
    onEdit: null,
    // 刪除按鈕的 Callback
    onDelete: null
  };

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

  var ActivityTimeline = /*#__PURE__*/function () {
    /**
     * ActivityTimeline 建構子
     * @param {Element} element - 指定渲染的DOM
     * @param {Object} [options={}] - 覆寫的選項參數
     */
    function ActivityTimeline(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ActivityTimeline);

      this.$element = element; // 繼承外部客製選項

      this.options = Object.freeze($.extend(true, {}, DEFAULT, options)); // 儲存當下的資料

      this.saveData = []; // 初始化

      this.init(this.options);
    }
    /**
     * 初始化 ActivityTimeline 實例
     * @param {Object} [options={}] - 變更的選項參數
     */


    _createClass(ActivityTimeline, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.options = options;
        this.saveData = options.data;
        this.refetchTable(options.data);
        this.bind(options);
      } // 更新 ActivityTimeline 實例

    }, {
      key: "updateOptions",
      value: function updateOptions() {
        var updateOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.init(updateOpt);
      }
      /**
       * 重新渲染 Table
       * @param {Array} [data={}] - 欄位資料
       * @param {Number} [origPerItem={}] - 顯示筆數
       */

    }, {
      key: "refetchTable",
      value: function refetchTable() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var origPerItem = arguments.length > 1 ? arguments[1] : undefined;
        var $element = this.$element,
            options = this.options;
        $element.empty();
        if (options.showInfo) $element.empty(); // 預設卡片顯示數的陣列

        var newData = data.slice(0, -(data.length - options.perItem));

        if (origPerItem !== options.data.length && data.length > options.perItem) {
          printCard(newData);
        } else {
          printCard(data);
        }
        /**
         * 渲染卡片內容
         * @param {Array} [data={}] - 欄位資料
         */


        function printCard(data) {
          $.each(data, function (key, item) {
            var row = $("<div class=\"card\">\n       <div class=\"card_body\" id=\"".concat(item.id, "\"><span class=\"card_ball-show\">").concat(item.id, "</span></div></div>"));
            row.append($("<div class=\"card-title py-2\"><h5 class=\"mx-3 text-white\">".concat(item.title, "</h5></div>")));
            row.append($("<ul class=\"card-text pl-3 pr-3\">\n            <li  class=\"font-weight-bold cardName\">".concat(item.name, "</li>\n            <li class=\"cardEmail\">").concat(item.email, "</li>\n            <hr class=\"mt-1 mb-0 card__hr\">\n            <li class=\"cardContent\">").concat(item.bref, "</li>\n            <li  class=\"my-3 cardFooter\">\n              <span data-id=\"").concat(item.id, "\">\n              <a href=\"#\" class=\"edit-btn btn\">Edit</a>\n              <a href=\"#\" class=\"delete-btn btn\">X</a>\n              </span>\n              <span class=\"cardDate\">").concat(item.datetime, "</span></li>\n          </ul>")));
            $element.append(row);
          });
        }
      }
      /**
       * 綁定事件
       * @param {Object} [options={}] - 變更的選項參數
       */

    }, {
      key: "bind",
      value: function bind() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // 綁訂edit按鈕
        $(".edit-btn").on("click", function (e) {
          // _id是修改按鈕的父元素的id
          var _id = $(this).parent().data("id");

          var result = $.grep(options.data, function (e) {
            return e.id == _id;
          });
          var rowData = {};
          rowData = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            title: result[0].title,
            bref: result[0].bref,
            datetime: result[0].datetime
          };

          if ($.isFunction(options.onEdit)) {
            options.onEdit(rowData);
            rowData = "";
          }
        }); // 綁訂delete按鈕

        $(".delete-btn").on("click", function () {
          var _id = $(this).parent().data("id");

          if ($.isFunction(options.onDelete)) {
            options.onDelete(_id);
          }
        });
      }
      /*
       * 動態設置 ActivityTimeline 選項參數
       * @param {Object} [options] - 更新預設參數
       */

    }, {
      key: "setOptions",
      value: function setOptions() {
        var setOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = this.options;
        var currentOptions = assign({}, options, $.isPlainObject(setOpt) && setOpt);
        this.updateOptions(currentOptions);
      }
      /*
       * 新增資料
       * @param {Object} [data] - 回傳的新增資料
       */

    }, {
      key: "addData",
      value: function addData() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = this.options; // 新值加入data

        options.data.push(data); // 加入新值後重新渲染畫面

        this.bind(options);
        this.refetchTable(options.data); // 送出後欄位清空

        $("#activityTitle,#name,#email,#activityContent").val("");
      }
      /*
       * 更新單筆資料
       * @param {Object} [data] - 回傳的更新資料
       */

    }, {
      key: "updateData",
      value: function updateData() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // 找到原陣列裡面 id符合回傳資料id的第一筆資料，parseInt字串轉數字
        var _index = this.options.data.findIndex(function (item) {
          return parseInt(item.id) === parseInt(data.id);
        }); // 撈savaData找到的那筆資料把內容換成data


        this.options.data[_index].name = data.name;
        this.options.data[_index].email = data.email;
        this.options.data[_index].title = data.title;
        this.options.data[_index].bref = data.bref;
        this.options.data[_index].datetime = data.datetime; // 更新資料

        this.refetchTable(this.options.data);
        this.bind(this.options);
      }
      /*
       * 刪除單筆資料
       * @param {Number} [id] - 資料序號
       */

    }, {
      key: "removeDataByID",
      value: function removeDataByID(id) {
        var options = this.options,
            saveData = this.saveData;
        options.data.forEach(function (obj, i) {
          if (parseInt(obj.id) === parseInt(id)) {
            options.data.splice(i, 1);
          }
        });
        $("#DataTable_filter > label >input").val("");
        this.refetchTable(saveData);
        this.bind(options);
      }
      /*
       * 排序資料
       * @param {String} [type] - (asc|desc)
       * asc: 小至大
       * desc: 大至小
       */

    }, {
      key: "sort",
      value: function sort(type) {
        if (type == "asc") {
          this.saveData.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
          });
          this.refetchTable(this.saveData);
          this.bind(this.options);
        } else {
          this.saveData.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
          });
          var reverseData = this.saveData.reverse();
          this.refetchTable(reverseData);
          this.bind(this.options);
        }
      }
    }]);

    return ActivityTimeline;
  }();

  return ActivityTimeline;

})));

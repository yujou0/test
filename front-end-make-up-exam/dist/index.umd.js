(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UserInfo = factory());
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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  // DEFAULT options
  var DEFAULT = {
    // Table 來源資料
    data: [],
    // 預設資料列顯示數
    perRow: 5,
    // 是否顯示搜尋功能
    search: true,
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

  var isClick = true;

  var UserInfo = /*#__PURE__*/function () {
    function UserInfo(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, UserInfo);

      this.$element = element; // 繼承外部客製選項

      this.options = Object.freeze($.extend(true, {}, DEFAULT, options)); // 暫存 Table Data

      this.saveData = []; // 初始化

      this.init(options);
    }

    _createClass(UserInfo, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.options = options;
        this.saveData = options.data;
        this.refetchTable(options.data);
        this.perPage(this.saveData, options.perRow);
        this.creatToolBar(options.search);
        this.bind(options);
      }
      /**
       * 重新渲染 Table
       * @param {Array} [data={}] - 欄位資料
       */

    }, {
      key: "refetchTable",
      value: function refetchTable() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var $element = this.$element;
        var tableContent = $("<thead>\n    <tr>\n      <th scope=\"col\">English Name</th>\n      <th scope=\"col\">Email</th>\n      <th scope=\"col\">Phone</th>\n      <th scope=\"col\">Date</th>\n      <th scope=\"col\">Actions</th>\n    </tr>\n    </thead>\n    <tbody></tbody>");
        $("#accountTable").empty();
        $("#accountTable").append(tableContent);
        $element.empty();
        $.each(data, function (key, item) {
          var row = $("<tr id=\"".concat(item.id, "\"></tr>"));
          row.append($("<td></td>").html(item.name));
          row.append($("<td></td>").html(item.email));
          row.append($("<td></td>").html(item.phone));
          row.append($("<td></td>").html(item.date));
          row.append($("<td style=\"width:20%;\" data-id=\"".concat(item.id, "\"><a class=\"btn btn-success edit-btn\">Edit</a> | <a class=\"btn btn-danger delete-btn\">Delete</a></td>")));
          $element.append(row);
        });
        $("#showPerRow").html("\u5DF2\u986F\u793A".concat(this.options.perRow, "\u7B46\u8CC7\u6599"));
      }
      /**
       * 渲染顯示搜尋欄
       * @param {Boolean}} [search] - 搜尋欄是否顯示
       */

    }, {
      key: "creatToolBar",
      value: function creatToolBar(search) {
        if (!search) return;
        var searchTool = $("<label id=\"searchTxtLabel\" for=\"searchTxt\" class=\"searchTxtLabel\"\n      ><span>\u641C\u5C0B</span>\n      <input\n        id=\"searchTxt\"\n        class=\"w-75\"\n        type=\"text\"\n        placeholder=\"\u8ACB\u8F38\u5165\u82F1\u6587\u540D\u7A31\u6216email\"\n    /></label>");
        $("#toolBar").empty();
        $("#toolBar").append(searchTool);
      }
      /**
       * 動態設置 UserInfo 選項參數
       * @param {Object} [options] - 更新預設參數
       */

    }, {
      key: "setOptions",
      value: function setOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var currentOptions = assign({}, this.options, $.isPlainObject(options) && options);
        this.updateOptions(currentOptions);
      }
      /**
       * 新增資料
       * @param {Object} [data] - 回傳的新增資料
       */

    }, {
      key: "addData",
      value: function addData(data) {
        var options = this.options,
            saveData = this.saveData;
        this.refetchTable(saveData); // 新值加入data

        saveData.push(data); // 加入新值後重新渲染畫面

        this.perPage(saveData, options.perRow);
        this.bind(options);
        options.showMoreClick = 1; // 送出後欄位清空

        $("#name,#email,#phone").val("");
      }
      /**
       * 更新單筆資料
       * @param {Object} [data] - 回傳的更新資料
       */

    }, {
      key: "updateData",
      value: function updateData() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var saveData = this.saveData,
            options = this.options; // 找到saveData裡面 id符合回傳資料id的第一筆資料，parseInt字串轉數字

        var _index = saveData.findIndex(function (item) {
          return parseInt(item.id) === parseInt(data.id);
        }); // 撈savaData找到的那筆資料把內容換成data


        saveData[_index].name = data.name;
        saveData[_index].email = data.email;
        saveData[_index].phone = data.phone; // 更新資料

        this.refetchTable(saveData);
        this.perPage(saveData, options.perRow);
        this.bind(options);
        options.showMoreClick = 1;
      }
      /**
       * 刪除單筆資料
       * @param {object} id - 資料序號
       */

    }, {
      key: "removeDataByID",
      value: function removeDataByID(id) {
        var options = this.options,
            saveData = this.saveData;
        saveData.forEach(function (obj, i) {
          if (parseInt(obj.id) === parseInt(id)) {
            saveData.splice(i, 1);
          }
        });
        this.refetchTable(saveData);
        this.perPage(saveData, options.perRow);
        this.showMoreClick = 1;
        this.bind(options);
        options.showMoreClick = 1;

        if (saveData.length < options.perRow) {
          $("#showPerRow").html("\u5DF2\u986F\u793A".concat(saveData.length, "\u7B46\u8CC7\u6599"));
        }
      }
      /**
       * 綁定事件
       * @param {Object} [options={}] - 變更的選項參數
       * @param {Object} newData
       */

    }, {
      key: "bind",
      value: function bind() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var newData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.data;
        // 綁訂edit按鈕
        $(".edit-btn").on("click", function (e) {
          // _id是修改按鈕的父元素的id
          var _id = $(this).parent().data("id");

          var result = $.grep(newData, function (e) {
            return e.id == _id;
          });
          var rowData = {};
          rowData = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            phone: result[0].phone,
            date: result[0].date
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
      /**
       * 更新 UserInfo 實例
       * @param {Object} [updateOpt] - 更新UserInfo 實例
       */

    }, {
      key: "updateOptions",
      value: function updateOptions() {
        var updateOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.init(updateOpt);
      }
      /**
       * 顯示功能
       * @param {object[]} data 資料
       * @param {string} perRow 資料列顯示數
       */

    }, {
      key: "perPage",
      value: function perPage() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var perRow = arguments.length > 1 ? arguments[1] : undefined;
        var options = this.options; // 每頁顯示幾筆資料

        var pageCount = perRow; //容器，總筆數切成好幾批存放，每批是一組陣列 1~10，11~20，21~30，31~40 ....

        var pageBox = []; // 第幾頁

        var pageIndex = 1;
        var totalPage = Math.ceil(data.length / pageCount);

        if (data.length < options.perRow) {
          $("#showPerRow").html("\u5DF2\u986F\u793A".concat(data.length, "\u7B46\u8CC7\u6599"));
        }

        $("#allPage").empty();

        for (var i = 1; i <= totalPage; i++) {
          // 將總筆數資料切成好幾批，使用二維陣列紀錄它，1~10，11~20，21~30 ...
          pageBox[i] = data.slice(0 + pageCount * (i - 1), i * pageCount); // 顯示有幾頁

          $("#allPage").append("<li class=\"page-item\"><a class=\"page-link\" href=\"#\">".concat(i, "</a></li>"));
        }
        /**
         * 依顯示筆數渲染到表格
         * @param {object[]} array
         */


        function page(array) {
          $("#accountTable tbody").empty();

          if (array && array.length) {
            var _iterator = _createForOfIteratorHelper(array),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var item = _step.value;
                $("#accountTable tbody").append("\n           <tr id=\"".concat(item.id, "\">\n             <td><div class=\"th__item--show\"><b>English Name</b></div>").concat(item.name, "</td>\n             <td><div class=\"th__item--show\"><b>Email</b></div>").concat(item.email, "</td>\n             <td><div class=\"th__item--show\"><b>Phone</b></div>").concat(item.phone, "</td>\n             <td><div class=\"th__item--show\"><b>Date</b></div>").concat(item.date, "</td>\n             <td style=\"width:20%;\" data-id=\"").concat(item.id, "\">\n             <a class=\"btn btn-success edit-btn\">Edit</a> | <a class=\"btn btn-danger delete-btn\">Delete</a></td>\n           </tr>\n         ")); // 綁訂edit按鈕

                if (!array) {
                  $(".edit-btn").on("click", function (e) {
                    // _id是修改按鈕的父元素的id
                    var _id = $(this).parent().data("id");

                    var result = $.grep(options.data, function (e) {
                      return e.id == _id;
                    });
                    var rowData = {}; // 抓點擊列的值

                    rowData = {
                      id: result[0].id,
                      name: result[0].name,
                      email: result[0].email,
                      phone: result[0].phone,
                      date: result[0].date
                    };

                    if ($.isFunction(options.onEdit)) {
                      options.onEdit(rowData); // 修改點擊列的值後清空rowData，變回空陣列

                      rowData = "";
                    }
                  });
                } else {
                  $(".edit-btn").on("click", function (e) {
                    // _id是修改按鈕的父元素的id
                    var _id = $(this).parent().data("id");

                    var result = $.grep(array, function (e) {
                      return e.id == _id;
                    });
                    var rowData = {};
                    rowData = {
                      id: result[0].id,
                      name: result[0].name,
                      email: result[0].email,
                      phone: result[0].phone,
                      date: result[0].date
                    };

                    if ($.isFunction(options.onEdit)) {
                      options.onEdit(rowData);
                      rowData = "";
                    }
                  });
                } // 綁訂delete按鈕


                $(".delete-btn").on("click", function () {
                  var _id = $(this).parent().data("id");

                  if ($.isFunction(options.onDelete)) {
                    options.onDelete(_id);
                  }
                });
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        } // 開始顯示資料


        page(pageBox[pageIndex]);
      }
      /**
       * 增加顯示筆數
       */

    }, {
      key: "showMore",
      value: function showMore() {
        var options = this.options,
            saveData = this.saveData;
        var data = saveData || options.data; // isClick防止連續點擊

        if (isClick) {
          options.showMoreClick++;
          var copyPerRow = options.perRow; // 顯示筆數 = 顯示行數*點擊次數

          var newData = copyPerRow * options.showMoreClick; // 如果顯示筆數大於data資料筆數

          if (newData < data.length) {
            var renderData = data.slice(0, newData);
            this.perPage(renderData, newData);
            $("#showPerRow").html("\u5DF2\u986F\u793A".concat(newData, "\u7B46\u8CC7\u6599"));
          }

          if (newData >= data.length) {
            var _renderData = data.slice(0, newData);

            this.perPage(_renderData, newData);
            $("#showPerRow").html("\u5DF2\u986F\u793A".concat(data.length, "\u7B46\u8CC7\u6599"));
          }

          isClick = false;
          setTimeout(function () {
            isClick = true;
          }, 500);
        }
      }
      /**
       * 關鍵字搜尋
       * @param {string} value
       * @param {object[]} _array
       * @return {object[]} 回傳符合搜尋結果的物件陣列
       */

    }, {
      key: "filterKeywords",
      value: function filterKeywords(value, _array) {
        // 字串不限制大小寫與去除空白
        var regexpResult = new RegExp($.trim(value), "ig"); // 篩選物件陣列

        var result = _array.filter(function (obj) {
          // 組合一個新字串
          var scanValue = Object.keys(obj).reduce(function (res, key) {
            // 只搜尋name和email欄位
            return key == "name" || key == "email" ? res + obj[key] : res;
          }, ""); // 比對正則條件字串

          return scanValue.match(regexpResult);
        }); // 依搜尋後資料重新渲染表格


        this.refetchTable(result);
        this.perPage(result, this.options.perRow);
        this.bind(this.options);
        this.options.showMoreClick = 1;

        if (result.length < this.options.perRow) {
          $("#showPerRow").html("\u5DF2\u986F\u793A".concat(result.length, "\u7B46\u8CC7\u6599"));
        }

        this.saveData = result; // 如果關鍵字欄是空的，把items的值改回一開始的值重新渲染畫面

        if (!value) {
          this.refetchTable(this.saveData);
          this.perPage(this.saveData, this.options.perRow);
          this.bind(this.options);
          this.options.showMoreClick = 1;
        }

        return result;
      }
    }]);

    return UserInfo;
  }();

  return UserInfo;

})));

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
    // Table ????????????
    data: [],
    // ????????????????????????
    perRow: 5,
    // ????????????????????????
    search: true,
    // ??????????????? Callback
    onEdit: null,
    // ??????????????? Callback
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

      this.$element = element; // ????????????????????????

      this.options = Object.freeze($.extend(true, {}, DEFAULT, options)); // ?????? Table Data

      this.saveData = []; // ?????????

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
       * ???????????? Table
       * @param {Array} [data={}] - ????????????
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
       * ?????????????????????
       * @param {Boolean}} [search] - ?????????????????????
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
       * ???????????? UserInfo ????????????
       * @param {Object} [options] - ??????????????????
       */

    }, {
      key: "setOptions",
      value: function setOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var currentOptions = assign({}, this.options, $.isPlainObject(options) && options);
        this.updateOptions(currentOptions);
      }
      /**
       * ????????????
       * @param {Object} [data] - ?????????????????????
       */

    }, {
      key: "addData",
      value: function addData(data) {
        var options = this.options,
            saveData = this.saveData;
        this.refetchTable(saveData); // ????????????data

        saveData.push(data); // ?????????????????????????????????

        this.perPage(saveData, options.perRow);
        this.bind(options);
        options.showMoreClick = 1; // ?????????????????????

        $("#name,#email,#phone").val("");
      }
      /**
       * ??????????????????
       * @param {Object} [data] - ?????????????????????
       */

    }, {
      key: "updateData",
      value: function updateData() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var saveData = this.saveData,
            options = this.options; // ??????saveData?????? id??????????????????id?????????????????????parseInt???????????????

        var _index = saveData.findIndex(function (item) {
          return parseInt(item.id) === parseInt(data.id);
        }); // ???savaData????????????????????????????????????data


        saveData[_index].name = data.name;
        saveData[_index].email = data.email;
        saveData[_index].phone = data.phone; // ????????????

        this.refetchTable(saveData);
        this.perPage(saveData, options.perRow);
        this.bind(options);
        options.showMoreClick = 1;
      }
      /**
       * ??????????????????
       * @param {object} id - ????????????
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
       * ????????????
       * @param {Object} [options={}] - ?????????????????????
       * @param {Object} newData
       */

    }, {
      key: "bind",
      value: function bind() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var newData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.data;
        // ??????edit??????
        $(".edit-btn").on("click", function (e) {
          // _id??????????????????????????????id
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
        }); // ??????delete??????

        $(".delete-btn").on("click", function () {
          var _id = $(this).parent().data("id");

          if ($.isFunction(options.onDelete)) {
            options.onDelete(_id);
          }
        });
      }
      /**
       * ?????? UserInfo ??????
       * @param {Object} [updateOpt] - ??????UserInfo ??????
       */

    }, {
      key: "updateOptions",
      value: function updateOptions() {
        var updateOpt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.init(updateOpt);
      }
      /**
       * ????????????
       * @param {object[]} data ??????
       * @param {string} perRow ??????????????????
       */

    }, {
      key: "perPage",
      value: function perPage() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var perRow = arguments.length > 1 ? arguments[1] : undefined;
        var options = this.options; // ????????????????????????

        var pageCount = perRow; //??????????????????????????????????????????????????????????????? 1~10???11~20???21~30???31~40 ....

        var pageBox = []; // ?????????

        var pageIndex = 1;
        var totalPage = Math.ceil(data.length / pageCount);

        if (data.length < options.perRow) {
          $("#showPerRow").html("\u5DF2\u986F\u793A".concat(data.length, "\u7B46\u8CC7\u6599"));
        }

        $("#allPage").empty();

        for (var i = 1; i <= totalPage; i++) {
          // ??????????????????????????????????????????????????????????????????1~10???11~20???21~30 ...
          pageBox[i] = data.slice(0 + pageCount * (i - 1), i * pageCount); // ???????????????

          $("#allPage").append("<li class=\"page-item\"><a class=\"page-link\" href=\"#\">".concat(i, "</a></li>"));
        }
        /**
         * ??????????????????????????????
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
                $("#accountTable tbody").append("\n           <tr id=\"".concat(item.id, "\">\n             <td><div class=\"th__item--show\"><b>English Name</b></div>").concat(item.name, "</td>\n             <td><div class=\"th__item--show\"><b>Email</b></div>").concat(item.email, "</td>\n             <td><div class=\"th__item--show\"><b>Phone</b></div>").concat(item.phone, "</td>\n             <td><div class=\"th__item--show\"><b>Date</b></div>").concat(item.date, "</td>\n             <td style=\"width:20%;\" data-id=\"").concat(item.id, "\">\n             <a class=\"btn btn-success edit-btn\">Edit</a> | <a class=\"btn btn-danger delete-btn\">Delete</a></td>\n           </tr>\n         ")); // ??????edit??????

                if (!array) {
                  $(".edit-btn").on("click", function (e) {
                    // _id??????????????????????????????id
                    var _id = $(this).parent().data("id");

                    var result = $.grep(options.data, function (e) {
                      return e.id == _id;
                    });
                    var rowData = {}; // ??????????????????

                    rowData = {
                      id: result[0].id,
                      name: result[0].name,
                      email: result[0].email,
                      phone: result[0].phone,
                      date: result[0].date
                    };

                    if ($.isFunction(options.onEdit)) {
                      options.onEdit(rowData); // ??????????????????????????????rowData??????????????????

                      rowData = "";
                    }
                  });
                } else {
                  $(".edit-btn").on("click", function (e) {
                    // _id??????????????????????????????id
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
                } // ??????delete??????


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
        } // ??????????????????


        page(pageBox[pageIndex]);
      }
      /**
       * ??????????????????
       */

    }, {
      key: "showMore",
      value: function showMore() {
        var options = this.options,
            saveData = this.saveData;
        var data = saveData || options.data; // isClick??????????????????

        if (isClick) {
          options.showMoreClick++;
          var copyPerRow = options.perRow; // ???????????? = ????????????*????????????

          var newData = copyPerRow * options.showMoreClick; // ????????????????????????data????????????

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
       * ???????????????
       * @param {string} value
       * @param {object[]} _array
       * @return {object[]} ???????????????????????????????????????
       */

    }, {
      key: "filterKeywords",
      value: function filterKeywords(value, _array) {
        // ???????????????????????????????????????
        var regexpResult = new RegExp($.trim(value), "ig"); // ??????????????????

        var result = _array.filter(function (obj) {
          // ?????????????????????
          var scanValue = Object.keys(obj).reduce(function (res, key) {
            // ?????????name???email??????
            return key == "name" || key == "email" ? res + obj[key] : res;
          }, ""); // ????????????????????????

          return scanValue.match(regexpResult);
        }); // ????????????????????????????????????


        this.refetchTable(result);
        this.perPage(result, this.options.perRow);
        this.bind(this.options);
        this.options.showMoreClick = 1;

        if (result.length < this.options.perRow) {
          $("#showPerRow").html("\u5DF2\u986F\u793A".concat(result.length, "\u7B46\u8CC7\u6599"));
        }

        this.saveData = result; // ?????????????????????????????????items?????????????????????????????????????????????

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

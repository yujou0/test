(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DataTable = factory());
}(this, (function () { 'use strict';

    // Options
    var DEFAULTS = {
      data: [],
      // 是否顯示自訂筆數
      showPerPage: true,
      // 是否顯示搜尋輸入框
      showSearch: true,
      // 是否顯示總筆數資訊
      showInfo: true,
      // 是否顯示分頁導航
      showPage: true,
      // 初始筆數
      perPage: 5,

      /**
       * 更新按鈕的callback,並提供相關參數值使用
       * @param {Object} [tr] 列的element
       * @param {Object} [rowData] 當列的欄位資料
       */
      onEdit: null,

      /**
       * 刪除按鈕的callback,並提供相關參數值使用
       * @param {Number} [id] 資料序號
       */
      onDelete: null,

      /**
       * 新增按鈕的callback,並提供相關參數值使用
       * @param {Number} [id] 資料序號
       * @param {Object} [rowData] 當列的欄位資料
       */
      onAdd: null
    };

    /**
     * Extend object
     * @param {*} target - The target object to extend.
     * @param {*} args - The rest objects for merging to the target object.
     * @returns {Object} The extended object.
     */
    const assign = Object.assign || function assign(target, ...args) {
      if ($.isPlainObject(target) && args.length > 0) {
        args.forEach(arg => {
          if ($.isPlainObject(arg)) {
            Object.keys(arg).forEach(key => {
              target[key] = arg[key];
            });
          }
        });
      }

      return target;
    };

    var methods = {
      // 更新 DataTable 
      updateOptions(updateOpt = {}) {
        this.init(updateOpt);
      },

      // 設置 DataTable 選項參數
      setOptions(setOpt = {}) {
        let {
          options
        } = this;
        const currentOptions = assign({}, options, $.isPlainObject(setOpt) && setOpt);
        this.updateOptions(currentOptions);
      },

      /**
       * 搜尋字串比對
       * @param {string} value 搜尋字詞
       * @param {Object} data
       * @param {Object} [options={}] - 變更的選項參數
       */
      search(value, data, options = {}) {
        let matchArray = []; //比對字詞 並不限大小寫無空白 

        let regexpResult = new RegExp($.trim(value), "ig"); // === 將array轉為字串(不含key) 並排除id ===

        for (let i = 0; i < data.length; i++) {
          for (let key in data[i]) {
            let keepValue = Object.keys(data[i]).reduce((val, key) => {
              // 字詞間以逗號區隔
              return key == "id" ? val : val + data[i][key];
            }, "");
            if (keepValue.match(regexpResult)) matchArray.push(data[i]);
          }
        } // === 僅保留一組相同內容的value ===


        const set = new Set();
        let result = matchArray.filter(item => !set.has(JSON.stringify(item)) ? set.add(JSON.stringify(item)) : false);
        let newRes = result;

        if (options.showPage) {
          this.curPage = 1;
          this.createTable(newRes.slice(options.perPage * (this.curPage - 1), options.perPage * (this.curPage - 1) + options.perPage), newRes.length);
          this.page(newRes, options);
          this.bind(options);
          this.searchArr = newRes;
        } else {
          this.createTable(newRes, newRes.length);
          this.page(newRes, options);
          this.bind(options);
          this.searchArr = newRes;
        }
      },

      /**
       * 新增 User 
       * @param {object} data 新 User 資料
       */
      addData(data) {
        this.data.push(data);
        $("#addform")[0].reset();
        $('.formenname p').empty();
        $('.formemail p').empty();
        $('.formphone p').empty();
        $('#search').val("");
        $("#dialog-addconfirm").modal("toggle");

        if (this.options.showPage) {
          // 將目前頁數跳至最後一頁
          this.curPage = Math.ceil(this.data.length / this.options.perPage);
          this.createTable(this.data.slice(this.options.perPage * (this.curPage - 1), this.options.perPage * (this.curPage - 1) + this.options.perPage), this.data.length);
          this.page(this.data, this.options);
          this.bind(this.options);
        } else {
          this.createTable(this.data, this.data.length);
          this.page(this.data, this.options);
          this.bind(this.options);
        } // 畫面移至頁尾


        $("html, body").animate({
          scrollTop: $(document).height() - $(window).height()
        });
      },

      /**
       * 更新 User 
       * @param {object} data 新 User 資料
       */
      updateData(data) {
        let index = this.data.findIndex(d => d.id == data.id);
        let search = $('#search').val();
        this.data[index].name = data.name;
        this.data[index].email = data.email;
        this.data[index].phone = data.phone;

        if (search == "") {
          if (this.options.showPage) {
            this.createTable(this.data.slice(this.options.perPage * (this.curPage - 1), this.options.perPage * (this.curPage - 1) + this.options.perPage), this.data.length);
            this.page(this.data, this.options);
            this.bind(this.options);
          } else {
            this.createTable(this.data, this.data.length);
            this.page(this.data, this.options);
            this.bind(this.options);
          }
        } else {
          this.search(search, this.data, this.options);
        }

        $("#dialog-modifyconfirm").modal("toggle");
      },

      /**
       * Remove User 
       * @param {Number} id User id
       */
      removeData(id) {
        let search = $('#search').val();
        this.data.forEach((d, i) => {
          if (d.id == id) {
            this.data.splice(i, 1);
          }
        });
        this.searchArr.forEach((d, i) => {
          if (d.id == id) {
            this.searchArr.splice(i, 1);
          }
        });

        if (search == "") {
          if (this.options.showPage) {
            this.createTable(this.data.slice(this.options.perPage * (this.curPage - 1), this.options.perPage * (this.curPage - 1) + this.options.perPage), this.data.length);
            this.page(this.data, this.options);
            this.bind(this.options);
          } else {
            this.createTable(this.data, this.data.length);
            this.page(this.data, this.options);
            this.bind(this.options);
          }
        } else {
          this.search(search, this.data, this.options);
        }
      }

    };

    class DataTable {
      /**
       * DataTable 建構子
       * @param {Element} element - 指定渲染的DOM
       * @param {Object} [options={}] - 覆寫的選項參數
       * @param {Object} [data={}]
       */
      constructor(element, options = {}, data = []) {
        this.element = element; // 覆寫定義好的預設值

        this.options = assign({}, DEFAULTS, $.isPlainObject(options) && options);
        this.data = []; // 符合搜尋資料 array

        this.searchArr = []; // 初始頁數

        this.curPage = 1, // 計算次數，避免 pagination 錯誤
        this.firstTime = true, // 初始化
        this.init(this.options);
      }
      /**
         * 初始化 DataTable
         * @param {Object} data
         * @param {Object} [options={}] - 變更的選項參數
         */


      init(options = {}) {
        this.options = options;
        this.data = options.data; // === 確認分頁功能需求，以顯示資料 ===

        if (options.showPage) {
          this.createToolBar(options);
          this.dropdownShow(options);
          this.createTable(this.data.slice(0, options.perPage), this.data.length);
        } else {
          options.showPerPage = false;
          this.createToolBar(options);
          this.dropdownShow(options);
          this.createTable(this.data, this.data.length);
        }

        this.page(this.data, options);
        this.bind(options);
        this.firstTime = false;
      }
      /**
       * 渲染 整體架構及 ToolBar
       * @param {Object} [options={}] - 變更的選項參數
       */


      createToolBar(options = {}) {
        const {
          element
        } = this;
        $(element).empty();
        let toolBar = $(`<div class="tool-bar"></div>`);
        let dropdown = $(`<div class="dropdown"></div>`);

        if (options.showPerPage) {
          let dropdownLabelFirst = $(`<label>顯示</label>`);
          let dropdownLabelLast = $(`<label>筆數</label>`);
          let dropdownBtn = $(`<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>`);
          let dropdownShow = $(`<span id="dropdownShow"></span>`);
          let dropdownMenu = $(`<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>`);
          $.each([5, 10, 15, 20, 25], function (key, item) {
            let row = $(`<li class="dropdown-item">${item}</li>`);
            dropdownMenu.append(row);
          });
          dropdown.append(dropdownLabelFirst);
          dropdownBtn.append(dropdownShow);
          dropdown.append(dropdownBtn);
          dropdown.append(dropdownLabelLast);
          dropdown.append(dropdownMenu);
        }

        let search = $(`<div class="search"></div>`);

        if (options.showSearch) {
          let searchInput = $(`<input id="search" placeholder="關鍵字搜尋" />`);
          search.append(searchInput);
        }

        let data = $(`<div class="data"></div>`);
        let totalNumber = $(`<div class="dataTotal"></div>`);
        let paginationNav = $(`<nav class="paginationNav" aria-label="Page navigation"></nav>`);
        let footer = $(`<div class="footer"></div>`);
        $(footer).append(totalNumber);
        $(footer).append(paginationNav);
        toolBar.append(dropdown);
        toolBar.append(search);
        $(element).append(toolBar);
        $(element).append(data);
        $(element).append(footer);
      }
      /**
       * 渲染 Table 
       * @param {Array} [feedbackData={}] 欄位資料
       * @param {number} length 資料長度
       */


      createTable(feedbackData = [], length) {
        let self = this;
        let data = $('.data');
        let totalNumber = $('.dataTotal');
        data.empty();
        totalNumber.empty();
        let table = $(`<table id="userTable" class="table"></table>`);
        let tableThead = $(`<thead></thead>`);
        let tableTr = $(`<tr></tr>`);
        $.each(['English Name', 'Email', 'Phone', 'Date', 'Edit', 'Delete'], function (key, item) {
          let row = $(`<th>${item}</th>`);
          tableTr.append(row);
        });
        let tableTbody = $(`<tbody></tbody>`);
        tableThead.append(tableTr);
        $(table).append(tableThead);
        $(table).append(tableTbody);
        $('.data').append(table);

        if (feedbackData && feedbackData.length) {
          // === 產生資料 ===
          $.each(feedbackData, function (key, item) {
            let row = $(`<tr ></tr>`);
            let editBtn = $(`<button class="edi-btn" id="edi-btn-${item.id}">Edit</button>`);
            let delBtn = $(`<button class="del-btn" id="del-btn-${item.id}">Delete</button>`);
            row.append($('<td data-th="English Name"></td>').html(item.name));
            row.append($('<td data-th="Email"></td>').html(item.email));
            row.append($('<td data-th="Phone"></td>').html(item.phone));
            row.append($('<td data-th="Date"></td>').html(item.date));
            row.append($('<td data-th="Edit"></td>').append(editBtn));
            row.append($('<td data-th="Delete"></td>').append(delBtn));
            $(table).append(row);
          });
          if (self.options.showInfo) $(totalNumber).html(`共 ${length} 筆資料`);
        } else if (!self.firstTime && self.curPage) {
          if (self.options.showPage) {
            // 若目前頁面無資料，則向前推一頁
            self.curPage -= 1;

            if ($('#search').val() == "") {
              self.createTable(self.data.slice(self.options.perPage * (self.curPage - 1), self.options.perPage * (self.curPage - 1) + self.options.perPage), self.data.length);
              self.page(self.data, self.options);
              self.bind(self.options);
            } else {
              self.createTable(self.searchArr.slice(self.options.perPage * (self.curPage - 1), self.options.perPage * (self.curPage - 1) + self.options.perPage), self.searchArr.length);
              self.page(self.searchArr, self.options);
              self.bind(self.options);
            }
          } else {
            self.createTable(self.data, self.data.length);
            self.page(self.data, self.options);
            self.bind(self.options);
          }
        } else {
          $(tableTbody).html($(`<tr class="noData"></tr>`).append('<td colspan="6">No Data.</td>'));
          $(totalNumber).empty();
        }
      }
      /**
       * 渲染 分頁導航 
       * @param {Object} data 目前顯示的資料
       * @param {Object} [options={}] - 變更的選項參數
       */


      page(data, options = {}) {
        if (!options.showPage) return;
        let self = this;
        let paginationNav = $('.paginationNav');
        let lastPage = Math.ceil(data.length / options.perPage);
        paginationNav.empty();
        let pagination = $(`<ul class="pagination"></ul>`);
        if (data.length == 0) return null;
        $(pagination).append(`<li class="page-item" name="1"><span class="page-link">&laquo;</span></li><li class="page-item" name="prev"><span class="page-link">Prev</span></li>`);

        for (let i = 1; i <= lastPage; i++) {
          $(pagination).append(`<li class="page-item ${self.curPage == i ? 'active' : ''}" name="${i}"><span class="page-link">${i}</span></li>`);
        }

        $(pagination).append(`<li class="page-item" name="next"><span class="page-link" >Next</span></li><li class="page-item" name="${lastPage}"><span class="page-link" >&raquo;</span></li>`);
        $(paginationNav).append(pagination);
        $('.footer').append(paginationNav); // === 綁定點擊頁數功能 ===

        $('.pagination li').on('click', function () {
          if ($(this).attr("name") == "prev") {
            if (self.curPage == 1) {
              $('html, body').scrollTop(0);
              return null;
            }

            $('.pagination li').attr('class', 'page-item');
            self.curPage = Number(self.curPage) - 1;
          } else if ($(this).attr('name') == "next") {
            if (self.curPage == lastPage) {
              $('html, body').scrollTop(0);
              return null;
            }

            $('.pagination li').attr('class', 'page-item');
            self.curPage = Number(self.curPage) + 1;
          } else {
            $('.pagination li').attr('class', 'page-item');
            self.curPage = Number($(this).attr("name"));
          } // 顯示當前頁面


          $(`.pagination :nth-child( ${self.curPage + 2} )`).attr('class', 'page-item active');
          self.createTable(data.slice(options.perPage * (self.curPage - 1), options.perPage * (self.curPage - 1) + options.perPage), data.length);
          self.bind(options);
          $('html, body').scrollTop(0);
        });
      }
      /**
       * 渲染下拉選單
       * @param {Object} [options={}] - 變更的選項參數
       */


      dropdownShow(options = {}) {
        if (!options.showPerPage) return; // 下拉式選單顯示當前筆數

        $(`.dropdown-menu :nth-child( ${options.perPage / 5} )`).attr('id', 'default-option');
        $('#dropdownShow').text($(".dropdown-menu li[id='default-option']").text());
      }
      /**
       * 綁定事件 
       * @param {Object} [options={}] - 變更的選項參數
       */


      bind(options = {}) {
        let self = this; // === 偵測搜尋input ===

        $('#search').on("keyup", function () {
          let value = $(this).val(); // 事件延遲1秒執行, 減少reflow

          setTimeout(() => {
            self.search(value, self.data, options);
          }, 1000);
        }); // === 點擊 Edit 後，modal 內填入data，並提供 tr & data ===

        $(".edi-btn").on('click', function () {
          // const ele = $( this ).parent().parent();
          let modifyId = $(this).attr('id').substring(8);
          $('#modifyconfirm-send').attr('name', `modifyconfirm-send${modifyId}`);
          let data = {};
          $.each(self.data, function (i, d) {
            if (Number(modifyId) === d.id) {
              data = {
                id: d.id,
                name: d.name,
                email: d.email,
                phone: d.phone,
                date: d.date
              };
            }
          });
          $('#modifyform')[0].reset();
          $("#modDate").html(data.date);
          $("#modName").val(data.name);
          $("#modEmail").val(data.email);
          $("#modPhone").val(data.phone);
          $("#dialog-modifyconfirm").modal("toggle");
        }); // === 點擊 Delete 後，提供 tr & id，並刪除 data ===

        $(".del-btn").on('click', function () {
          // const ele = $( this ).parent().parent();
          let deleteId = $(this).attr('id').substring(8);

          if ($.isFunction(options.onDelete)) {
            options.onDelete(Number(deleteId));
          } // self.removeData( Number( deleteId ) );

        }); // === 下拉選單變換筆數 ===

        $('.dropdown-menu li').on('click', function () {
          if ($(this).text() == options.perPage) {
            return null;
          } else {
            $('#dropdownShow').text($(this).text()); // === 替換 dropdown id ===

            $(`.dropdown-menu :nth-child( ${options.perPage / 5} )`).attr('id', '');
            options.perPage = Number($(this).text());
            self.curPage = 1;
            $(`.dropdown-menu :nth-child( ${options.perPage / 5} )`).attr('id', 'default-option');

            if ($('#search').val() == "") {
              self.createTable(self.data.slice(options.perPage * (self.curPage - 1), options.perPage * (self.curPage - 1) + options.perPage), self.data.length);
              self.page(self.data, options);
              self.bind();
            } else {
              self.search($('#search').val(), self.data, options);
            }
          }
        });
      }

    }

    assign(DataTable.prototype, methods);

    return DataTable;

})));

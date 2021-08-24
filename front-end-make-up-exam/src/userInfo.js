import DEFAULT from "./default.js";
import { assign } from "./lib.js";
let isClick = true;

class UserInfo {
  constructor(element, options = {}) {
    this.$element = element;
    // 繼承外部客製選項
    this.options = Object.freeze($.extend(true, {}, DEFAULT, options));
    // 暫存 Table Data
    this.saveData = [];
    // 初始化
    this.init(options);
  }
  init(options = {}) {
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
  refetchTable(data = {}) {
    const { $element } = this;
    const tableContent = $(`<thead>
    <tr>
      <th scope="col">English Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Date</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody></tbody>`);

    $("#accountTable").empty();
    $("#accountTable").append(tableContent);

    $element.empty();

    $.each(data, function (key, item) {
      let row = $(`<tr id="${item.id}"></tr>`);
      row.append($("<td></td>").html(item.name));
      row.append($("<td></td>").html(item.email));
      row.append($("<td></td>").html(item.phone));
      row.append($("<td></td>").html(item.date));
      row.append(
        $(
          `<td style="width:20%;" data-id="${item.id}"><a class="btn btn-success edit-btn">Edit</a> | <a class="btn btn-danger delete-btn">Delete</a></td>`
        )
      );
      $element.append(row);
    });
    $("#showPerRow").html(`已顯示${this.options.perRow}筆資料`);
  }
  /**
   * 渲染顯示搜尋欄
   * @param {Boolean}} [search] - 搜尋欄是否顯示
   */
  creatToolBar(search) {
    if (!search) return;
    const searchTool =
      $(`<label id="searchTxtLabel" for="searchTxt" class="searchTxtLabel"
      ><span>搜尋</span>
      <input
        id="searchTxt"
        class="w-75"
        type="text"
        placeholder="請輸入英文名稱或email"
    /></label>`);

    $("#toolBar").empty();
    $("#toolBar").append(searchTool);
  }
  /**
   * 動態設置 UserInfo 選項參數
   * @param {Object} [options] - 更新預設參數
   */
  setOptions(options = {}) {
    const currentOptions = assign(
      {},
      this.options,
      $.isPlainObject(options) && options
    );
    this.updateOptions(currentOptions);
  }
  /**
   * 新增資料
   * @param {Object} [data] - 回傳的新增資料
   */
  addData(data) {
    const { options, saveData } = this;

    this.refetchTable(saveData);
    // 新值加入data
    saveData.push(data);
    // 加入新值後重新渲染畫面
    this.perPage(saveData, options.perRow);
    this.bind(options);
    options.showMoreClick = 1;

    // 送出後欄位清空
    $("#name,#email,#phone").val("");
  }
  /**
   * 更新單筆資料
   * @param {Object} [data] - 回傳的更新資料
   */
  updateData(data = {}) {
    let { saveData, options } = this;
    // 找到saveData裡面 id符合回傳資料id的第一筆資料，parseInt字串轉數字
    const _index = saveData.findIndex(
      (item) => parseInt(item.id) === parseInt(data.id)
    );

    // 撈savaData找到的那筆資料把內容換成data
    saveData[_index].name = data.name;
    saveData[_index].email = data.email;
    saveData[_index].phone = data.phone;

    // 更新資料
    this.refetchTable(saveData);
    this.perPage(saveData, options.perRow);
    this.bind(options);
    options.showMoreClick = 1;
  }
  /**
   * 刪除單筆資料
   * @param {object} id - 資料序號
   */
  removeDataByID(id) {
    let { options, saveData } = this;
    saveData.forEach(function (obj, i) {
      if (true && parseInt(obj.id) === parseInt(id)) {
        saveData.splice(i, 1);
      }
    });
    this.refetchTable(saveData);
    this.perPage(saveData, options.perRow);
    this.showMoreClick = 1;
    this.bind(options);
    options.showMoreClick = 1;
    if (saveData.length < options.perRow) {
      $("#showPerRow").html(`已顯示${saveData.length}筆資料`);
    }
  }
  /**
   * 綁定事件
   * @param {Object} [options={}] - 變更的選項參數
   * @param {Object} newData
   */
  bind(options = {}, newData = options.data) {
    // 綁訂edit按鈕
    $(".edit-btn").on("click", function (e) {
      // _id是修改按鈕的父元素的id
      const _id = $(this).parent().data("id");
      let result = $.grep(newData, function (e) {
        return e.id == _id;
      });
      let rowData = {};
      rowData = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        phone: result[0].phone,
        date: result[0].date,
      };
      if ($.isFunction(options.onEdit)) {
        options.onEdit(rowData);
        rowData = "";
      }
    });
    // 綁訂delete按鈕
    $(".delete-btn").on("click", function () {
      const _id = $(this).parent().data("id");
      if ($.isFunction(options.onDelete)) {
        options.onDelete(_id);
      }
    });
  }
  /**
   * 更新 UserInfo 實例
   * @param {Object} [updateOpt] - 更新UserInfo 實例
   */
  updateOptions(updateOpt = {}) {
    this.init(updateOpt);
  }
  /**
   * 顯示功能
   * @param {object[]} data 資料
   * @param {string} perRow 資料列顯示數
   */
  perPage(data = {}, perRow) {
    const { options } = this;
    // 每頁顯示幾筆資料
    let pageCount = perRow;
    //容器，總筆數切成好幾批存放，每批是一組陣列 1~10，11~20，21~30，31~40 ....
    let pageBox = [];
    // 第幾頁
    let pageIndex = 1;

    let totalPage = Math.ceil(data.length / pageCount);

    if (data.length < options.perRow) {
      $("#showPerRow").html(`已顯示${data.length}筆資料`);
    }

    $("#allPage").empty();
    for (let i = 1; i <= totalPage; i++) {
      // 將總筆數資料切成好幾批，使用二維陣列紀錄它，1~10，11~20，21~30 ...
      pageBox[i] = data.slice(0 + pageCount * (i - 1), i * pageCount);
      // 顯示有幾頁
      $("#allPage").append(
        `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
      );
    }
    /**
     * 依顯示筆數渲染到表格
     * @param {object[]} array
     */
    function page(array) {
      $("#accountTable tbody").empty();
      if (array && array.length) {
        for (const item of array) {
          $("#accountTable tbody").append(`
           <tr id="${item.id}">
             <td><div class="th__item--show"><b>English Name</b></div>${item.name}</td>
             <td><div class="th__item--show"><b>Email</b></div>${item.email}</td>
             <td><div class="th__item--show"><b>Phone</b></div>${item.phone}</td>
             <td><div class="th__item--show"><b>Date</b></div>${item.date}</td>
             <td style="width:20%;" data-id="${item.id}">
             <a class="btn btn-success edit-btn">Edit</a> | <a class="btn btn-danger delete-btn">Delete</a></td>
           </tr>
         `);
          // 綁訂edit按鈕
          if (!array) {
            $(".edit-btn").on("click", function (e) {
              // _id是修改按鈕的父元素的id
              const _id = $(this).parent().data("id");
              let result = $.grep(options.data, function (e) {
                return e.id == _id;
              });
              let rowData = {};
              // 抓點擊列的值
              rowData = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                date: result[0].date,
              };
              if ($.isFunction(options.onEdit)) {
                options.onEdit(rowData);
                // 修改點擊列的值後清空rowData，變回空陣列
                rowData = "";
              }
            });
          } else {
            $(".edit-btn").on("click", function (e) {
              // _id是修改按鈕的父元素的id
              const _id = $(this).parent().data("id");
              let result = $.grep(array, function (e) {
                return e.id == _id;
              });
              let rowData = {};
              rowData = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                phone: result[0].phone,
                date: result[0].date,
              };
              if ($.isFunction(options.onEdit)) {
                options.onEdit(rowData);
                rowData = "";
              }
            });
          }
          // 綁訂delete按鈕
          $(".delete-btn").on("click", function () {
            const _id = $(this).parent().data("id");
            if ($.isFunction(options.onDelete)) {
              options.onDelete(_id);
            }
          });
        }
      }
    }
    // 開始顯示資料
    page(pageBox[pageIndex]);
  }
  /**
   * 增加顯示筆數
   */
  showMore() {
    const { options, saveData } = this;
    let data = saveData || options.data;
    // isClick防止連續點擊
    if (isClick) {
      options.showMoreClick++;
      let copyPerRow = options.perRow;
      // 顯示筆數 = 顯示行數*點擊次數
      let newData = copyPerRow * options.showMoreClick;
      // 如果顯示筆數大於data資料筆數
      if (newData < data.length) {
        const renderData = data.slice(0, newData);
        this.perPage(renderData, newData);
        $("#showPerRow").html(`已顯示${newData}筆資料`);
      }
      if (newData >= data.length) {
        const renderData = data.slice(0, newData);
        this.perPage(renderData, newData);
        $("#showPerRow").html(`已顯示${data.length}筆資料`);
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
  filterKeywords(value, _array) {
    // 字串不限制大小寫與去除空白
    const regexpResult = new RegExp($.trim(value), "ig");
    // 篩選物件陣列
    const result = _array.filter((obj) => {
      // 組合一個新字串
      const scanValue = Object.keys(obj).reduce((res, key) => {
        // 只搜尋name和email欄位
        return key == "name" || key == "email" ? res + obj[key] : res;
      }, "");
      // 比對正則條件字串
      return scanValue.match(regexpResult);
    });
    // 依搜尋後資料重新渲染表格
    this.refetchTable(result);
    this.perPage(result, this.options.perRow);
    this.bind(this.options);
    this.options.showMoreClick = 1;
    if (result.length < this.options.perRow) {
      $("#showPerRow").html(`已顯示${result.length}筆資料`);
    }
    this.saveData = result;

    // 如果關鍵字欄是空的，把items的值改回一開始的值重新渲染畫面
    if (!value) {
      this.refetchTable(this.saveData);
      this.perPage(this.saveData, this.options.perRow);
      this.bind(this.options);
      this.options.showMoreClick = 1;
    }
    return result;
  }
}
export default UserInfo;

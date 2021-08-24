import DEFAULT from "./default.js";
import methods from "./methods.js";

class TableCRUD {
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
    // this.refetchTable(options.data);
    this.saveData = options.data;
    // this.perPage(this.saveData, options.perPage);
    // this.creatToolBar();
    this.bind(options);
  }
  /**
   * 重新渲染 Table
   */
  refetchTable(items) {
    const { $element, options } = this;
    let tableContent = $(`<thead>
    <tr>
      <th scope="col">English Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Date</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody></tbody>`);

    $("#DataTable").empty();
    $("#DataTable").append(tableContent);

    if (options.showInfo)
      $(".dataTotalNum").html(
        "<div>" + "共" + items.length + "筆資料" + "</div>"
      );

    $element.empty();

    $.each(items, function (key, item) {
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
  }
  /**
   * 渲染顯示筆數欄和搜尋欄
   */
  creatToolBar() {
    const { options } = this;

    let selectTool = $(` <label id="ItemQuantityLabel" for="ItemQuantity"
    >顯示筆數:
    <select id="ItemQuantity">
      <option id="initPageValue" value="5" selected>5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
    </select></label
  >`);
    let searchTool =
      $(`<label id="searchTxtLabel" for="searchTxt" class="searchTxtLabel"
      ><span>綜合搜尋：</span>
      <input
        id="searchTxt"
        class="w-50"
        type="text"
        placeholder="關鍵字"
    /></label>`);
    let selectAndSearch = $(` <div class="d-flex align-items-center">
      <div class="showSelect">
      </div>
      <div class="showSearch">
      </div>
      </div>`);
    $("#toolBar").empty();
    $("#toolBar").append(selectAndSearch);
    if (options.showPerPage) $(".showSelect").append(selectTool);
    if (options.showSearch) $(".showSearch").append(searchTool);
  }
  /**
   * 資料更新
   * @param {object} feedbackData
   * @param {object[]} saveData
   */
  updateData(feedbackData = {}, origiData) {
    // 撈savaData找到的那筆資料把內容換成feedbackData
    origiData.name = feedbackData.name;
    origiData.email = feedbackData.email;
    origiData.phone = feedbackData.phone;

    this.bind(this.options);
  }

  removeData(id) {
    const { options } = this;
    console.log(options.data.userData)
    // let data = this.options.data.userData;
    options.data.userData.forEach(function (obj, i) {
      if (true && parseInt(obj.id) === parseInt(id)) {
        options.data.userData.splice(i, 1);
      }
    });
  }
  /**
   * 綁定事件
   * @param {Object} [options={}] - 變更的選項參數
   */
  bind(options = {}) {
    // console.log(options)
    // === 偵測搜尋input ===
    $("#search").on("keyup", function () {
      let value = $(this).val();

      // 事件延遲1秒執行, 減少reflow
      setTimeout(() => {
        this.search(value, this.data, options);
      }, 1000);
    });

    $(".edit-btn").on("click", function (e) {
      // $tr是修改按鈕的所有父元素
      const $tr = $(this).parents();
      // _id是修改按鈕的父元素的id
      const _id = $(this).parent().data("id");
      let rowData = {};
      $.each(options.data, function (index, data) {
        if (parseInt(_id) === parseInt(data[_id - 1].id)) {
          rowData = {
            id: data[_id - 1].id,
            name: data[_id - 1].name,
            email: data[_id - 1].email,
            phone: data[_id - 1].phone,
            date: data[_id - 1].date,
          };
        }
        if ($.isFunction(options.onEdit)) {
          options.onEdit($tr, rowData);
        }
      });
    });

    $(".delete-btn").on("click", function (e) {
      // console.log(options.onDelete)
      if ($.isFunction(options.onDelete)) {
        console.log(options.onDelete)
        options.onDelete( e.target.parentNode.parentNode);
        // console.log(123)
      } else {
        console.error("Must be a function.");
      }
    });
  }
}
Object.assign(TableCRUD.prototype, methods);
export default TableCRUD;

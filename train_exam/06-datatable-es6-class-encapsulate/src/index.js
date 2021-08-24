// User 欄位資料
const _data = [
  {
    id: 1,
    name: "George Maria Anderson",
    email: "f.lhp@izxld.to",
    phone: ["0996-001371"],
    date: "2021-03-01",
  },
  {
    id: 2,
    name: "Scott Dorothy Lewis",
    email: "x.uqtt@eoeuyhtxs.com.cn",
    phone: ["0956-127745"],
    date: "2021-03-02",
  },
  {
    id: 3,
    name: "Donna Timothy Brown",
    email: "y.dnfhyk@odu.th",
    phone: ["0959-871815"],
    date: "2021-03-05",
  },
  {
    id: 4,
    name: "Brenda Mary Miller",
    email: "v.bxtk@tjmpxkwbr.fo",
    phone: ["0948-327435"],
    date: "2021-03-10",
  },
  {
    id: 5,
    name: "Steven Jose Martin",
    email: "o.gxs@tlcv.de",
    phone: ["0953-745908"],
    date: "2021-03-15",
  },
  {
    id: 6,
    name: "Michelle Lisa Harris",
    email: "g.bxci@irqoiy.re",
    phone: ["0931-155138"],
    date: "2021-03-02",
  },
  {
    id: 7,
    name: "Richard Scott Young",
    email: "c.synbon@qyouvyx.az",
    phone: ["0934-303587"],
    date: "2021-03-03",
  },
  {
    id: 8,
    name: "Robert Jeffrey Allen",
    email: "i.bsyehyz@hiznxb.gi",
    phone: ["0946-244714"],
    date: "2021-03-06",
  },
  {
    id: 9,
    name: "Melissa Karen Johnson",
    email: "p.riefbalc@boqmwc.lu",
    phone: ["0905-131221"],
    date: "2021-03-21",
  },
  {
    id: 10,
    name: "Dorothy Karen Harris",
    email: "k.fdu@ymrjgxs.lk",
    phone: ["0970-944111"],
    date: "2021-03-30",
  },
  {
    id: 11,
    name: "John Linda Anderson",
    email: "s.rwdrw@jnbsdplf.pm",
    phone: ["0922-782576"],
    date: "2021-03-31",
  },
  {
    id: 12,
    name: "Larry Christopher Hernandez",
    email: "k.cctncwn@kpwpkoor.museum",
    phone: ["0927-842481"],
    date: "2021-03-01",
  },
  {
    id: 13,
    name: "Karen Nancy Thomas",
    email: "n.xlnl@hkpg.mp",
    phone: ["0953-883864"],
    date: "2021-03-22",
  },
  {
    id: 14,
    name: "Anthony Sarah Harris",
    email: "w.lipm@qmexko.ye",
    phone: ["0974-331398"],
    date: "2021-03-24",
  },
  {
    id: 15,
    name: "Angela William Garcia",
    email: "m.ovcmohtpb@akzovhh.de",
    phone: ["0966-210234"],
    date: "2021-03-11",
  },
  {
    id: 16,
    name: "Sandra David Taylor",
    email: "y.hwzpr@qoame.ke",
    phone: ["0993-787941"],
    date: "2021-03-17",
  },
  {
    id: 17,
    name: "David Laura Anderson",
    email: "z.zicwf@grtwucgkt.ly",
    phone: ["0973-644816"],
    date: "2021-03-05",
  },
  {
    id: 18,
    name: "Jason Dorothy Rodriguez",
    email: "u.ykeweu@jsoqrxte.pf",
    phone: ["0957-447222"],
    date: "2021-03-04",
  },
  {
    id: 19,
    name: "Kevin Steven Robinson",
    email: "o.zcvql@ixojb.gn",
    phone: ["0909-131886"],
    date: "2021-03-09",
  },
  {
    id: 20,
    name: "Betty Sharon Jackson",
    email: "s.mtrlx@wnivluqes.ki",
    phone: ["0930-335482"],
    date: "2021-03-10",
  },
  {
    id: 21,
    name: "Robert Donald Harris",
    email: "l.njhlplihy@ulioq.ci",
    phone: ["0918-582288"],
    date: "2021-03-29",
  },
  {
    id: 22,
    name: "Joseph Sharon Lopez",
    email: "e.nciqeidv@qzoinaudbx.pw",
    phone: ["0938-217401"],
    date: "2021-03-18",
  },
  {
    id: 23,
    name: "Steven Mark Jones",
    email: "j.zmanq@axmsx.tn",
    phone: ["0931-283902"],
    date: "2021-03-19",
  },
  {
    id: 24,
    name: "Sandra Eric Thomas",
    email: "k.svhwbemp@mjnmh.ma",
    phone: ["0999-821075"],
    date: "2021-03-20",
  },
  {
    id: 25,
    name: "Deborah Daniel Walker",
    email: "p.giszzjsg@ixqfmlnxo.cy",
    phone: ["0930-744958"],
    date: "2021-03-03",
  },
];

class DataTable {
  constructor(dataPerPage) {
    // 紀錄每頁顯示數量
    this.dataPerPage = dataPerPage;
    // 紀錄當前頁數
    this.currentPage = 1;
    // 符合搜尋資料 array
    this.searchArr = [];
  }

  /**
   * 渲染 ToolBar
   * @param {Element} enter 指定 DOM
   */
  createToolBar(enter) {
    let self = this;
    $(enter).empty();

    let toolBar = $(`<div class="tool-bar"></div>`);

    let dropdown = $(`<div class="dropdown"></div>`);
    let dropdownLabelFirst = $(`<label>顯示</label>`);
    let dropdownLabelLast = $(`<label>筆數</label>`);
    let dropdownBtn = $(
      `<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>`
    );
    let dropdownShow = $(`<span id="dropdownShow"></span>`);
    let dropdownMenu = $(
      `<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>`
    );
    $.each([5, 10, 15, 20, 25], function (key, item) {
      let row = $(`<li class="dropdown-item">${item}</li>`);
      dropdownMenu.append(row);
    });

    let search = $(`<div class="search"></div>`);
    let searchInput = $(`<input id="search" placeholder="關鍵字搜尋" />`);
    search.append(searchInput);

    let data = $(`<div class="data"></div>`);

    let totalNumber = $(`<div class="dataTotal"></div>`);
    let paginationNav = $(
      `<nav class="paginationNav" aria-label="Page navigation"></nav>`
    );
    let footer = $(`<div class="footer"></div>`);
    $(footer).append(totalNumber);
    $(footer).append(paginationNav);

    dropdown.append(dropdownLabelFirst);
    dropdownBtn.append(dropdownShow);
    dropdown.append(dropdownBtn);
    dropdown.append(dropdownLabelLast);
    dropdown.append(dropdownMenu);
    toolBar.append(dropdown);
    toolBar.append(search);
    $(enter).append(toolBar);
    $(enter).append(data);
    $(enter).append(footer);

    // === 偵測搜尋input ===
    $("#search").on("keyup", function () {
      let value = $(this).val();

      // 事件延遲0.5秒執行, 減少reflow
      setTimeout(() => {
        self.search(value, _data);
      }, 500);
    });
  }

  /**
   * 渲染 Table
   * @param {Array} feedbackData 欄位資料
   * @param {number} length 欄位長度
   */
  createTable(feedbackData = [], length) {
    let self = this;
    let data = $(".data");
    let totalNumber = $(".dataTotal");
    data.empty();
    totalNumber.empty();

    let table = $(`<table id="userTable" class="table"></table>`);
    let tableThead = $(`<thead></thead>`);
    let tableTr = $(`<tr></tr>`);
    $.each(
      ["English Name", "Email", "Phone", "Date", "Edit", "Delete"],
      function (key, item) {
        let row = $(`<th>${item}</th>`);
        tableTr.append(row);
      }
    );
    let tableTbody = $(`<tbody></tbody>`);
    tableThead.append(tableTr);
    $(table).append(tableThead);
    $(table).append(tableTbody);
    $(".data").append(table);

    if (feedbackData && feedbackData.length) {
      // === 產生資料 ===
      $.each(feedbackData, function (key, item) {
        let row = $(`<tr ></tr>`);
        let editBtn = $(
          `<button class="edi-btn" id="edi-btn-${item.id}">Edit</button>`
        );
        let delBtn = $(
          `<button class="del-btn" id="del-btn-${item.id}">Delete</button>`
        );

        row.append($('<td data-th="English Name"></td>').html(item.name));
        row.append($('<td data-th="Email"></td>').html(item.email));
        row.append($('<td data-th="Phone"></td>').html(item.phone));
        row.append($('<td data-th="Date"></td>').html(item.date));
        row.append($('<td data-th="Edit"></td>').append(editBtn));
        row.append($('<td data-th="Delete"></td>').append(delBtn));

        $(table).append(row);
      });
      $(totalNumber).html(`共 ${length} 筆資料`);
    } else {
      $(tableTbody).html(
        $("<tr></tr>").append('<td colspan="4">No Data.</td>')
      );
      $(totalNumber).html(`無資料`);
    }

    $(".edi-btn").on("click", function () {
      let modifyId = $(this).attr("id").substring(8);
      $("#modifyconfirm-send").attr("name", `modifyconfirm-send${modifyId}`);
      let data = _data[modifyId - 1];
      $("#modifyform")[0].reset();

      $("#modDate").html(data.date);
      $("#modName").val(data.name);
      $("#modEmail").val(data.email);
      $("#modPhone").val(data.phone);

      $("#dialog-modifyconfirm").modal("toggle");
    });

    $(".del-btn").on("click", function () {
      let deleteId = $(this).attr("id").substring(8);
      self.delete(deleteId);
    });
  }

  /**
   * 重新渲染 分頁導航
   * @param {number} data 總資料
   */
  page(data) {
    let self = this;
    let paginationNav = $(".paginationNav");
    let lastPage = Math.ceil(data.length / this.dataPerPage);
    paginationNav.empty();

    let pagination = $(`<ul class="pagination"></ul>`);

    if (data.length == 0) return null;

    $(pagination).append(
      `<li class="page-item" name="1"><span class="page-link">&laquo;</span></li><li class="page-item" name="prev"><span class="page-link">Prev</span></li>`
    );
    for (let i = 1; i <= lastPage; i++) {
      $(pagination).append(
        `<li class="page-item ${
          this.currentPage == i ? "active" : ""
        }" name="${i}"><span class="page-link">${i}</span></li>`
      );
    }
    $(pagination).append(
      `<li class="page-item" name="next"><span class="page-link" >Next</span></li><li class="page-item" name="${lastPage}"><span class="page-link" >&raquo;</span></li>`
    );
    $(paginationNav).append(pagination);
    $(".footer").append(paginationNav);

    $(".pagination li").on("click", function () {
      // 如果點擊到的屬性name == 'prev'
      if ($(this).attr("name") == "prev") {
        if (self.currentPage == 1) {
          // 回到最頂端
          $("html, body").scrollTop(0);
          return null;
        }
        $(".pagination li").attr("class", "page-item");
        self.currentPage = Number(self.currentPage) - 1;
      } else if ($(this).attr("name") == "next") {
        if (self.currentPage == lastPage) {
          $("html, body").scrollTop(0);
          return null;
        }
        $(".pagination li").attr("class", "page-item");
        self.currentPage = Number(self.currentPage) + 1;
      } else {
        $(".pagination li").attr("class", "page-item");
        self.currentPage = Number($(this).attr("name"));
      }

      // 顯示當前頁面
      $(`.pagination :nth-child(${self.currentPage + 2})`).attr(
        "class",
        "page-item active"
      );

      self.createTable(
        // 切出每個分頁
        data.slice(
          // 每頁顯示資料*(當前顯示頁數-1) ex.5筆資料*第一頁，從index[currentPag-1]後開始slice
          self.dataPerPage * (self.currentPage - 1),
          // 每頁顯示資料*(當前顯示頁數-1) + 當前顯示頁數，slice到index[currentPage - 1] + self.dataPerPage這一筆結束
          self.dataPerPage * (self.currentPage - 1) + self.dataPerPage
        ),
        data.length
      );
      $("html, body").scrollTop(0);
    });
  }

  /**
   * 顯示下拉選單
   * @param {number} data 總資料
   */
  dropdownShow() {
    let self = this;
    // 下拉式選單顯示當前筆數
    $(`.dropdown-menu :nth-child(${this.dataPerPage / 5})`).attr(
      "id",
      "default-option"
    );
    $("#dropdownShow").text($(".dropdown-menu li[id='default-option']").text());

    // === 下拉選單變換筆數 ===
    $(".dropdown-menu li").on("click", function () {
      if ($(this).text() == self.dataPerPage) {
        return null;
      } else {
        $("#dropdownShow").text($(this).text());

        $(`.dropdown-menu :nth-child(${self.dataPerPage / 5})`).attr("id", "");
        self.dataPerPage = Number($(this).text());
        self.currentPage = 1;
        $(`.dropdown-menu :nth-child(${self.dataPerPage / 5})`).attr(
          "id",
          "default-option"
        );
        // 如果搜尋欄是空的
        if ($("#search").val() == "") {
          self.createTable(
            _data.slice(
              self.dataPerPage * (self.currentPage - 1),
              self.dataPerPage * (self.currentPage - 1) + self.dataPerPage
            ),
            _data.length
          );
          // 用原始_data分頁
          self.page(_data);
        } else {
          // 不是空的話 重新createTable
          self.createTable(
            // 用搜尋回來的arr 去切分頁內容
            self.searchArr.slice(
              self.dataPerPage * (self.currentPage - 1),
              self.dataPerPage * (self.currentPage - 1) + self.dataPerPage
            ),
            self.searchArr.length
          );
          // 用搜尋回來的arr a分頁
          self.page(self.searchArr);
        }
      }
    });
  }

  /**
   * 搜尋字串比對
   * @param {string} value 搜尋字詞
   * @param {Array} data 需比對的資料
   */
  search(value, data = []) {
    let matchArray = [];

    //比對字詞 並不限大小寫無空白
    let regexpResult = new RegExp($.trim(value), "ig");

    // === 將array轉為字串(不含key) 並排除id ===
    for (let i = 0; i < data.length; i++) {
      // for...in輸出data[i]的屬性名稱
      for (let key in data[i]) {
        // Object.keys() 方法會回傳一個由指定物件所有可列舉之"屬性組成的陣列"，
        // 該陣列中的的排列順序與使用 for...in 進行迭代的順序相同
        // （兩者的差異在於for-in 迴圈還會迭代出物件自其原型鏈所繼承來的可列舉屬性）。

        // reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。
        let keepValue = Object.keys(data[i]).reduce((val, key) => {
          // 字詞間以逗號區隔
          return key == "id" ? val : val + data[i][key];
        }, "");
        if (keepValue.match(regexpResult)) matchArray.push(data[i]);
      }
    }

    // === 僅保留一組相同內容的value ===
    const set = new Set();
    let result = matchArray.filter((item) =>
      // Set.prototype.has()方法對一個指定值元素在 Set 物件中的存在與否回傳一個布林值。
      // JSON.stringify(item)把item轉變為 JSON 字串
      !set.has(JSON.stringify(item)) ? set.add(JSON.stringify(item)) : false
    );

    let newRes = result;

    this.currentPage = 1;

    this.createTable(
      newRes.slice(
        this.dataPerPage * (this.currentPage - 1),
        this.dataPerPage * (this.currentPage - 1) + this.dataPerPage
      ),
      newRes.length
    );
    this.page(newRes);
    this.searchArr = newRes;
  }

  /**
   * 新增 User
   * @param {object} data 新 User 資料
   */
  add(data) {
    _data.push(data);
    // addform重設回預設值
    $("#addform")[0].reset();
    // 清空搜尋欄
    $("#search").val("");
    // 打開add彈窗
    $("#dialog-addconfirm").modal("toggle");

    // 將目前頁數跳至最後一頁
    this.currentPage = Math.ceil(_data.length / this.dataPerPage);
    this.createTable(
      _data.slice(
        this.dataPerPage * (this.currentPage - 1),
        this.dataPerPage * (this.currentPage - 1) + this.dataPerPage
      ),
      _data.length
    );
    
    this.page(_data);

    // 移至頁尾
    $("html, body").animate({
      scrollTop: $(document).height() - $(window).height(),
    });
  }

  /**
   * 新增 User
   * @param {object} data 新 User 資料
   */
  modify(data) {
    // findIndex() 方法將依據提供的測試函式，尋找陣列中符合的元素，並返回其 index（索引）。如果沒有符合的對象，將返回 -1 。
    // 找_data中id符合目前data id的資料
    let index = _data.findIndex((d) => d.id == data.id);

    // 讓_data[index]的值 = 當下回傳data的值
    _data[index].name = data.name;
    _data[index].email = data.email;
    _data[index].phone = data.phone;
    // 重新渲染表格和分頁
    if ($("#search").val() == "") {
      this.createTable(
        _data.slice(
          this.dataPerPage * (this.currentPage - 1),
          this.dataPerPage * (this.currentPage - 1) + this.dataPerPage
        ),
        _data.length
      );
      this.page(_data);
    } else {
      this.createTable(
        this.searchArr.slice(
          this.dataPerPage * (this.currentPage - 1),
          this.dataPerPage * (this.currentPage - 1) + this.dataPerPage
        ),
        this.searchArr.length
      );
      this.page(this.searchArr);
    }
    // 關閉修改彈窗
    $("#dialog-modifyconfirm").modal("toggle");
  }

  /**
   * 刪除單筆資料
   * @param {number} id 資料序號
   */
  delete(id) {
    // d是item i是index
    _data.forEach((d, i) => {
      if (d.id == id) {
        // 拿掉_data[i] 一個
        _data.splice(i, 1);
      }
    });

    if ($("#search").val() == "") {
      this.createTable(
        _data.slice(
          this.dataPerPage * (this.currentPage - 1),
          this.dataPerPage * (this.currentPage - 1) + this.dataPerPage
        ),
        _data.length
      );

      this.page(_data);
    } else {
      this.createTable(
        this.searchArr.slice(
          this.dataPerPage * (this.currentPage - 1),
          this.dataPerPage * (this.currentPage - 1) + this.dataPerPage
        ),
        this.searchArr.length
      );
      this.page(this.searchArr);
    }
  }
}

// ====== Used ======
const test = new DataTable(5);
test.createToolBar(".enterPoint");
test.dropdownShow();
test.createTable(_data.slice(0, 5), _data.length);
test.page(_data);

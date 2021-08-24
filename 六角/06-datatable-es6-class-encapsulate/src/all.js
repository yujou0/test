// DEFAULT options
const DEFAULT = {
  feedbackData: [],
  value: 0,
  _array: [],
  dataLen: 0,
};

// User 欄位資料
let items = [
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
// 宣告origiItems和items原始值相同
let origiItems = items;
// 取得顯示資料筆數欄
const ItemQuantity = document.getElementById("ItemQuantity");
// 取得關鍵字欄
const searchTxt = document.getElementById("searchTxt");
// 宣告day是當下時間再加一天
let currentDate = dayjs().add(1, "day").format("YYYY-MM-DD");

  /**
   * 顯示搜尋結果
   * @param {string} value
   * @param {object[]} arr
   */
   const showSearchResult = (value, arr = []) => {
    // 使用 new 關鍵字實體化類別搜尋後的result
    const showResult = new MainData('',value, arr);
    $("#jsonResult")
      .empty()
      .html(
        `<pre>${JSON.stringify(showResult.filterKeywords(), null, 1)}</pre>`
      );
  };
class MainData {
  constructor(feedbackData = [],value, _array = [],dataLen) {
    this.options = $.extend(true,{},DEFAULT, options);
    
    this.feedbackData = options.feedbackData;
    this.value = value;
    this._array = _array;
    this.dataLen = options.feedbackData;
  }

  //#region METHODS
  /**
 * 重新渲染 Table
 * @param {Array} feedbackData 欄位資料
 */
  refetchTable() {
    refetchItems.showPages();
    $(".dataTotalNum").html("<div>" + "共" + items.length + "筆資料" + "</div>");
    // 在#addDate中顯示當下時間
    $("#addDate").html(`<div>` + currentDate + `</div>`);

    if (!(this.feedbackData && this.feedbackData.length)) return;

    let $element = $("#userTable>tbody");

    $.each(this.feedbackData, function (key, item) {
      let row = $("<tr></tr>");
      row.append($('<td style="width:25%;"></td>').html(item.name));
      row.append($('<td style="width:30%;"></td>').html(item.email));
      row.append($('<td style="width:25%;"></td>').html(item.phone));
      row.append($('<td style="width:15%;"></td>').html(item.date));
      $element.append(row);
    });
  }
  /**
   * 表單驗證
   */
  validateForm() {
    //表單提交
    $("#addForm").on("submit", function (e) {
      e.preventDefault();
      $("#addForm").submit();
    });
    // 宣告驗證規則
    let nameRule = /^.{1,}$/;
    let emailRule =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let phoneRule = /^09\d{2}-\d{6}$/;

    let nameValue = $("#name").val();
    let emailValue = $("#email").val();
    let phoneValue = $("#phone").val();

    let nameResult = nameRule.test(nameValue);
    let emailResult = emailRule.test(emailValue);
    let phoneResult = phoneRule.test(phoneValue);

    // 驗證
    if (!nameResult) $(".errorName").text("此欄位必填");
    else $(".errorName").text("");
    if (!emailResult) $(".errorEmail").text("email格式錯誤");
    else $(".errorEmail").text("");
    if (!phoneResult) $(".errorPhone").text("手機號碼格式錯誤");
    else $(".errorPhone").text("");

    // 如果驗證都通過，提交表單
    if (nameResult && emailResult && phoneResult) refetchItems.addItem();
  }
  /**
   * 表單提交
   */
  addItem() {
    // 宣告點擊儲存新增次數(從一開始的陣列繼續往後上數字)用來取id名稱
    let count = items.length + 1;
    let newItem = {
      id: count,
      name: $("#name").val(),
      email: $("#email").val(),
      phone: [$("#phone").val()],
      date: currentDate,
    };
    count++;
    $("#searchTxt").val("");
    // 新值加入items
    items= origiItems
    items.push(newItem);
    // 加入新值後重新渲染畫面
    refetchItems.refetchTable();
    refetchItems.showPages();
    $(".dataTotalNum").html(
      "<div>" + "共" + items.length + "筆資料" + "</div>"
    );
    // 送出後欄位清空
    $("#name,#email,#phone").val("");

    return items[items.length - 1];
  }
  /**
 * 關鍵字搜尋
 * @param {string} value
 * @param {object[]} _array
 * @return {object[]} 回傳符合搜尋結果的物件陣列
 */
  filterKeywords() {
    // 字串不限制大小寫與去除空白
    const regexpResult = new RegExp($.trim(this.value), "ig");
    // 篩選物件陣列
    const result = this._array.filter((obj) => {
      // 組合一個新字串
      const scanValue = Object.keys(obj).reduce((res, key) => {
        // 排除id欄位
        return key !== "id" ? res + obj[key] : res;
      }, "");
      // 比對正則條件字串
      return scanValue.match(regexpResult);
    });
    // 使用 new 關鍵字實體化類別搜尋後資料
    const newResult = new MainData(result);
    // 依搜尋後資料重新渲染表格
    newResult.refetchTable();
    items = result;
    refetchItems.showPages();
    $(".dataTotalNum").html(
      "<div>" + "共" + result.length + "筆資料" + "</div>"
    );

    // 如果關鍵字欄是空的，把items的值改回一開始的值重新渲染畫面
    if (!this.value) {
      items = origiItems;
      refetchItems.showPages();
      refetchItems.refetchTable();
      $(".dataTotalNum").html(
        "<div>" + "共" + items.length + "筆資料" + "</div>"
      );
    }
    return result;
  }
  
/**
 * 分頁功能
 * @param {object[]} dataLen
 */
  showPages() {
    // 每頁顯示幾筆資料
    let pageCount = ItemQuantity.value;
    //容器，總筆數切成好幾批存放，每批是一組陣列 1~10，11~20，21~30，31~40 ....
    let pageBox = [];
    // 第幾頁
    let pageIndex = 1;
    // 如果dataLen 是truthy，抓items的值
    if (this.dataLen) this.dataLen = items;

    let totalPage = Math.ceil(this.dataLen.length / pageCount);
    $("#allPage").empty();

    for (let i = 1; i <= totalPage; i++) {
      // 將總筆數資料切成好幾批，使用二維陣列紀錄它，1~10，11~20，21~30 ...
      pageBox[i] = this.dataLen.slice(0 + pageCount * (i - 1), i * pageCount);
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
      $("#DataTable tbody").empty();
      if (array && array.length) {
        for (const item of array) {
          $("#DataTable tbody").append(`
        <tr>
          <td><div class="th__item--show"><b>English Name</b></div>${item.name}</td>
          <td><div class="th__item--show"><b>Email</b></div>${item.email}</td>
          <td><div class="th__item--show"><b>Phone</b></div>${item.phone}</td>
          <td><div class="th__item--show"><b>Date</b></div>${item.date}</td>
        </tr>
      `);
        }
      } else {
        $("#DataTable tbody").append(`
        <tr>
          <td colspan="4">No Result</td>
        </tr>
    `);
      }
    }
// 頁數長度
let pageLen = pageBox.length - 1;

    // 第一頁
    $("#firstPage").on("click", function (e) {
      e.preventDefault();
      page(pageBox[1]);
      $("#allPage li").removeClass("active");
      $("#allPage li")
        .eq((pageIndex = 0))
        .addClass("active");
    });

    // 最後一頁
    $("#lastPage").on("click", function (e) {
      e.preventDefault();
      pageIndex = pageLen;
      page(pageBox[pageLen]);
      $("#allPage li").removeClass("active");
      $("#allPage li")
        .eq(pageIndex - 1)
        .addClass("active");
    });
    // 上一頁
    $("#prev").on("click", function (e) {
      e.preventDefault();
      pageIndex--;
      if (pageIndex >= 1) {
        page(pageBox[pageIndex]);
        $("#allPage li").removeClass("active");
        $("#allPage li")
          .eq(pageIndex - 1)
          .addClass("active");
      } else {
        pageIndex = 1;
      }
    });
    // 下一頁
    $("#next").on("click", function (e) {
      e.preventDefault();
      pageIndex++;
      if (pageIndex <= totalPage) {
        page(pageBox[pageIndex]);
        $("#allPage li").removeClass("active");
        $("#allPage li")
          .eq(pageIndex - 1)
          .addClass("active");
      } else {
        pageIndex = totalPage;
      }
    });

    // 點數字換頁
    $("#allPage a").each(function (index) {
      $(this).on("click", function (e) {
        e.preventDefault();
        pageIndex = index + 1;
        page(pageBox[pageIndex]);
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
      });
    });
    // 開始顯示第一頁資料
    page(pageBox[pageIndex]);
    // 開始第一筆 active
    $("#allPage li").eq(0).addClass("active");
  }
  //#endregion
}
let options = {
  feedbackData: items,
  value:'',
  _array:'',
  dataLen: items
}
const refetchItems = new MainData(options);

// ====== Used ======
$(function () {

  $("#searchTxt").on("keyup", function () {
    const _value = $(this).val();
    // 事件延遲0.5秒執行, 減少reflow
    setTimeout(() => {
      showSearchResult(_value, items);
    }, 500);
  });
  // 一開始的items資料渲染畫面
  refetchItems.refetchTable();
});

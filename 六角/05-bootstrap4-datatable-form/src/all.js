$(function () {
  refetchTable(items);
  $(".dataTotalNum").html("<div>" + "共" + items.length + "筆資料" + "</div>");
  $("#add-btn").on("click", function (e) {
    e.preventDefault();
  });
});

// User 欄位資料
var items = [
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

/**
 * 重新渲染 Table
 * @param {Array} feedbackData 欄位資料
 */
function refetchTable(feedbackData = []) {
  if (!(feedbackData && feedbackData.length)) return;

  let $element = $("#userTable>tbody");

  $element.empty();

  $.each(feedbackData, function (key, item) {
    var row = $("<tr></tr>");

    row.append($('<td style="width:25%;"></td>').html(item.name));
    row.append($('<td style="width:30%;"></td>').html(item.email));
    row.append($('<td style="width:25%;"></td>').html(item.phone));
    row.append($('<td style="width:15%;"></td>').html(item.date));

    $element.append(row);
  });
  // showPages(feedbackData)
}

// 搜尋功能

/**
 * 1. 關鍵字搜尋(Slow)
 * (1) for迴圈比對每個物件value
 * (2) 將每個物件轉為字串
 * (3) 利用ES6 set(集合)方法篩選唯一值
 *
 * @param {string} value
 * @param {object[]} _array
 * @return {object[]} 回傳符合搜尋結果的物件陣列
 */
function searchKeywords(value, _array = []) {
  const matchsArray = [];
  // 字串不限制大小寫與去除空白
  const regexpResult = new RegExp($.trim(value), "ig");

  // 遍歷陣列中的object
  for (let i = 0; i < _array.length; i++) {
    for (key in _array[i]) {
      // 組合一個新字串
      const scanValue = Object.keys(_array[i]).reduce((res, key) => {
        // 排除id欄位篩選
        return key !== "id" ? res + _array[i][key] : res;
      }, "");

      // 比對正則條件字串
      if (scanValue.match(regexpResult)) matchsArray.push(_array[i]);
    }
  }

  /* === 集合方法篩選唯一值 === */
  const _set = new Set();
  const result = matchsArray.filter((item) =>
    !_set.has(JSON.stringify(item)) ? _set.add(JSON.stringify(item)) : false
  );

  // const result = [
  //   ...new Set(matchsArray.map((item) => JSON.stringify(item)))
  // ].map((item) => JSON.parse(item));

  const newRes = !result ? [] : result;

  refetchTable(newRes);

  // 依搜尋後資料筆數重新分頁
  showPages(newRes);

  // 得到搜尋後資料筆數，渲染到頁面
  $(".dataTotalNum").html("<div>" + "共" + newRes.length + "筆資料" + "</div>");
  return newRes;
}

/**
 * 2. 關鍵字搜尋(Quick)
 * @param {string} value
 * @param {object[]} _array
 * @return {object[]} 回傳符合搜尋結果的物件陣列
 */
function filterKeywords(value, _array = []) {
  // 字串不限制大小寫與去除空白
  const regexpResult = new RegExp($.trim(value), "ig");
  // 篩選物件陣列
  const result = _array.filter((obj) => {
    // 組合一個新字串
    const scanValue = Object.keys(obj).reduce((res, key) => {
      // 排除id欄位
      return key !== "id" ? res + obj[key] : res;
    }, "");

    // 比對正則條件字串
    return scanValue.match(regexpResult);
  });

  refetchTable(result);
  return result;
}

/**
 * 3. 關鍵字搜尋(Lodash)
 * @param {string} value
 * @param {object[]} _array
 * @return {object[]} 回傳符合搜尋結果的物件陣列
 */
function lodashFilterKeywords(value, _array = []) {
  // 篩選物件陣列
  const result = _.filter(_array, function (obj) {
    // 組合一個新字串
    const scanValue = Object.keys(obj).reduce((res, key) => {
      // 排除id欄位
      return key !== "id" ? res + obj[key] : res;
    }, "");

    // 比對符合的字串, 不限制大小寫與去除空白
    return _.includes(
      _.lowerCase(_.trim(scanValue)),
      _.lowerCase(_.trim(value))
    );
  });

  refetchTable(result);
  return result;
}

/**
 * 重新渲染 Table
 * @param {Array} feedbackData 欄位資料
 */
// function init(){
function refetchTable(feedbackData = []) {
  let $element = $("#DataTable>tbody");
  $element.empty();

  if (feedbackData && feedbackData.length) {
    $.each(feedbackData, function (key, item) {
      let row = $("<tr></tr>");

      row.append($('<td style="width:25%;"></td>').html(item.name));
      row.append($('<td style="width:30%;"></td>').html(item.email));
      row.append($('<td style="width:25%;"></td>').html(item.phone));
      row.append($('<td style="width:15%;"></td>').html(item.date));

      $element.append(row);
    });
  } else {
    $element
      .empty()
      .html($("<tr></tr>").append('<td colspan="4">No Data.</td>'));
  }
}

// ====== Used ======
$(function () {
  refetchTable(items);
  // 讓一開始只顯示5筆
  showPages(items);

  /**
   * 顯示搜尋結果
   * @param {string} value
   * @param {object[]} arr
   */
  const showSearchResult = (value, arr = []) => {
    $("#jsonResult")
      .empty()
      .html(
        `<pre>${JSON.stringify(searchKeywords(value, arr), null, 1)}</pre>`
      );

    searchKeywords(value, arr);
    // filterKeywords(value, arr);
    // lodashFilterKeywords(value, arr);
  };

  $("#searchTxt").on("keyup", function () {
    const _value = $(this).val();
    // showSearchResult(_value, items);

    // 事件延遲0.5秒執行, 減少reflow
    setTimeout(() => {
      showSearchResult(_value, items);
      // 過0.5秒後清空搜尋欄的值
    }, 500);
  });
});

// 分頁功能
// 取得顯示資料筆數
const ItemQuantity = document.getElementById("ItemQuantity");
const searchTxt = document.getElementById("searchTxt");

function showPages(dataLen) {
  let data = null; // 容器:接收資料
  let pageCount = ItemQuantity.value; // 每頁顯示幾筆資料
  console.log(pageCount)
  let pageBox = []; //容器，總筆數切成好幾批存放，每批是一組陣列 1~10，11~20，21~30，31~40 ....
  let pageIndex = 1; // 第幾頁
  let totalPage = 0; // 全部頁數
  data = dataLen;

  // 如果dataLen == undefined，讓他抓原本items的值
  if (searchTxt.value == ''){
  if (dataLen == undefined) {
    data = items;
  }}else{
    console.log(searchTxt.value)
  }
  console.log(data);


  totalPage = Math.ceil(data.length / pageCount);
  $("#allPage").empty();
  for (let i = 1; i <= totalPage; i++) {
    // 將總筆數資料切成好幾批，使用二維陣列紀錄它，1~10，11~20，21~30 ...
    pageBox[i] = data.slice(0 + pageCount * (i - 1), i * pageCount);
    // 顯示有幾頁
    $("#allPage").append(
      `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
    );
  }
  // 最末頁
  const pageLen = pageBox.length - 1;
  $("#lastPage").on("click", function (e) {
    e.preventDefault();
    page(pageBox[pageLen]);
    $("#allPage li");
    $("#allPage li").eq((pageIndex = pageLen - 1));
  });
  // 下一頁
  $("#next").on("click", function (e) {
    e.preventDefault();
    pageIndex++;
    if (pageIndex <= totalPage) {
      page(pageBox[pageIndex]);
      $("#allPage li");
      $("#allPage li").eq(pageIndex - 1);
    } else {
      pageIndex = totalPage;
    }
  });
  // 第一頁
  $("#firstPage").on("click", function (e) {
    e.preventDefault();
    page(pageBox[1]);
    $("#allPage li");
    $("#allPage li").eq((pageIndex = 0));
  });
  // 上一頁
  $("#prev").on("click", function (e) {
    e.preventDefault();
    pageIndex--;
    if (pageIndex >= 1) {
      page(pageBox[pageIndex]);
      $("#allPage li");
      $("#allPage li").eq(pageIndex - 1);
    } else {
      pageIndex = 1;
    }
  });

  // 點數字換頁
  $("#allPage a").each(function (index) {
    $(this).on("click", function (e) {
      e.preventDefault();
      pageIndex = index + 1;
      page(pageBox[pageIndex]);
      $(this).parent().siblings();
      $(this).parent();
    });
  });

  // 開始顯示第一頁資料
  page(pageBox[pageIndex]);
  // 開始第一筆 active
  $("#allPage li").eq(0);
  //   }
  // })

  function page(array) {
    $("#DataTable tbody").html("");
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
  }
}
// 宣告day是當下時間再加一天
let day = dayjs().add(1, "day").format("YYYY-MM-DD");
// 在#addDate中顯示當下時間
$("#addDate").html(`<div>` + day + `</div>`);

// 新增表單驗證
$(document).ready(function () {
  $(".inputform").focus(function () {
    $(this).css("border-color", "#006cff");
  });
  $(".inputform").blur(function () {
    $(this).css("border-color", "");
  });

  let flag1 = false;
  let flag2 = false;
  let flag3 = false;

  let rule1 = /^.{1,}$/;
  $("#name").blur(function () {
    if (rule1.test($("#name").val())) {
      $(".error1").text("");
      $(this).css("border-color", "green");
      flag1 = true;
    } else {
      $(".error1").text("此欄位必填");
      $(this).css("border-color", "red");
      flag1 = false;
    }
    let rule2 =
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    $("#email").blur(function () {
      if (rule2.test($(this).val())) {
        $(".error2").text("");
        $(this).css("border-color", "green");
        flag2 = true;
      } else {
        $(".error2").text("email格式錯誤");
        $(this).css("border-color", "red");
        flag2 = false;
      }
    });
    let rule3 = /^09\d{2}-\d{6}$/;
    $("#phone").blur(function () {
      if (rule3.test($(this).val())) {
        $(".error3").text("");
        $(this).css("border-color", "green");
        flag3 = true;
      } else {
        $(".error3").text("手機號碼格式錯誤");
        $(this).css("border-color", "red");
        flag3 = false;
      }
      // 驗證都符合時 可以送出表單
      if (flag1 && flag2 && flag3) {
        // 把新增的值丟進表格
        $(function () {
          // 宣告點擊儲存新增次數(從一開始的陣列繼續往後上數字)用來取id名稱
          let count = items.length + 1;

          $("#addSubmit").click(function () {
            // 每次儲存新增點擊就+1
            count += 1;
            items.push({
              id: count,
              name: $("#name").val(),
              email: $("#email").val(),
              phone: [$("#phone").val()],
              date: day,
            });
            // 送出後欄位清空
            $("#name").val("");
            $("#email").val("");
            $("#phone").val("");

            return items[items.length - 1];
          });
        });
      }
    });
  });
});

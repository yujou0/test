// User 欄位資料
var _data = [
  {
    id: 1,
    name: 'George Maria Anderson',
    email: 'f.lhp@izxld.to',
    phone: ['0996-001371'],
    date: '2021-03-01',
  },
  {
    id: 2,
    name: 'Scott Dorothy Lewis',
    email: 'x.uqtt@eoeuyhtxs.com.cn',
    phone: ['0956-127745'],
    date: '2021-03-02',
  },
  {
    id: 3,
    name: 'Donna Timothy Brown',
    email: 'y.dnfhyk@odu.th',
    phone: ['0959-871815'],
    date: '2021-03-05',
  },
  {
    id: 4,
    name: 'Brenda Mary Miller',
    email: 'v.bxtk@tjmpxkwbr.fo',
    phone: ['0948-327435'],
    date: '2021-03-10',
  },
  {
    id: 5,
    name: 'Steven Jose Martin',
    email: 'o.gxs@tlcv.de',
    phone: ['0953-745908'],
    date: '2021-03-15',
  },
  {
    id: 6,
    name: 'Michelle Lisa Harris',
    email: 'g.bxci@irqoiy.re',
    phone: ['0931-155138'],
    date: '2021-03-02',
  },
  {
    id: 7,
    name: 'Richard Scott Young',
    email: 'c.synbon@qyouvyx.az',
    phone: ['0934-303587'],
    date: '2021-03-03',
  },
  {
    id: 8,
    name: 'Robert Jeffrey Allen',
    email: 'i.bsyehyz@hiznxb.gi',
    phone: ['0946-244714'],
    date: '2021-03-06',
  },
  {
    id: 9,
    name: 'Melissa Karen Johnson',
    email: 'p.riefbalc@boqmwc.lu',
    phone: ['0905-131221'],
    date: '2021-03-21',
  },
  {
    id: 10,
    name: 'Dorothy Karen Harris',
    email: 'k.fdu@ymrjgxs.lk',
    phone: ['0970-944111'],
    date: '2021-03-30',
  },
  {
    id: 11,
    name: 'John Linda Anderson',
    email: 's.rwdrw@jnbsdplf.pm',
    phone: ['0922-782576'],
    date: '2021-03-31',
  },
  {
    id: 12,
    name: 'Larry Christopher Hernandez',
    email: 'k.cctncwn@kpwpkoor.museum',
    phone: ['0927-842481'],
    date: '2021-03-01',
  },
  {
    id: 13,
    name: 'Karen Nancy Thomas',
    email: 'n.xlnl@hkpg.mp',
    phone: ['0953-883864'],
    date: '2021-03-22',
  },
  {
    id: 14,
    name: 'Anthony Sarah Harris',
    email: 'w.lipm@qmexko.ye',
    phone: ['0974-331398'],
    date: '2021-03-24',
  },
  {
    id: 15,
    name: 'Angela William Garcia',
    email: 'm.ovcmohtpb@akzovhh.de',
    phone: ['0966-210234'],
    date: '2021-03-11',
  },
  {
    id: 16,
    name: 'Sandra David Taylor',
    email: 'y.hwzpr@qoame.ke',
    phone: ['0993-787941'],
    date: '2021-03-17',
  },
  {
    id: 17,
    name: 'David Laura Anderson',
    email: 'z.zicwf@grtwucgkt.ly',
    phone: ['0973-644816'],
    date: '2021-03-05',
  },
  {
    id: 18,
    name: 'Jason Dorothy Rodriguez',
    email: 'u.ykeweu@jsoqrxte.pf',
    phone: ['0957-447222'],
    date: '2021-03-04',
  },
  {
    id: 19,
    name: 'Kevin Steven Robinson',
    email: 'o.zcvql@ixojb.gn',
    phone: ['0909-131886'],
    date: '2021-03-09',
  },
  {
    id: 20,
    name: 'Betty Sharon Jackson',
    email: 's.mtrlx@wnivluqes.ki',
    phone: ['0930-335482'],
    date: '2021-03-10',
  },
  {
    id: 21,
    name: 'Robert Donald Harris',
    email: 'l.njhlplihy@ulioq.ci',
    phone: ['0918-582288'],
    date: '2021-03-29',
  },
  {
    id: 22,
    name: 'Joseph Sharon Lopez',
    email: 'e.nciqeidv@qzoinaudbx.pw',
    phone: ['0938-217401'],
    date: '2021-03-18',
  },
  {
    id: 23,
    name: 'Steven Mark Jones',
    email: 'j.zmanq@axmsx.tn',
    phone: ['0931-283902'],
    date: '2021-03-19',
  },
  {
    id: 24,
    name: 'Sandra Eric Thomas',
    email: 'k.svhwbemp@mjnmh.ma',
    phone: ['0999-821075'],
    date: '2021-03-20',
  },
  {
    id: 25,
    name: 'Deborah Daniel Walker',
    email: 'p.giszzjsg@ixqfmlnxo.cy',
    phone: ['0930-744958'],
    date: '2021-03-03',
  },
];

// === get URL parameters ===
$.urlParam = name => {
  let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results) {
    if(name == "id"){
      return 5;
    }else if(name == "page"){
      return 1;
    }
  }
  return decodeURI(results[1]) || 0;
}
// Date 隔天日期
let tomorrow = dayjs().add(1,'day').format("YYYY-MM-DD");
// URL id part
let dataPerPage = Number($.urlParam("id"));
// === 下拉式選單顯示當前筆數 ===
if(dataPerPage!==null){
  $(`.dropdown-menu :nth-child(${dataPerPage/5})`).attr('id', 'default-option');
}
// URL page part 無此頁時 則顯示最後一頁
let currentPage = dataPerPage*Number($.urlParam("page"))>_data.length ? Math.ceil(_data.length/dataPerPage) : Number($.urlParam("page")) ;
// email 認證
let emailRule = /^\w+((\.\w+)|(\-\w+))*\@[\w]+((\.|\-)\w+)*\.[A-Za-z]+$/;
// phone 認證
let phoneRule = /^09\d{2}-{1}\d{6}$/;
// 符合搜尋資料 array
let searchArr = [];

/**
 * 重新渲染 Table 
 * @param {Array} feedbackData 欄位資料
 */
let refetchTable = ( feedbackData = [], length) => {
  let $element = $( '#userTable>tbody' );
  if (feedbackData && feedbackData.length){
    $element.empty();
    $('.cardGroup').empty();
    $('.dataTotal').empty();

    // === 產生pc版資料 ===
    $.each( feedbackData, function ( key, item ) {
      var row = $( `<tr ></tr>` );

      row.append( $( '<td style="width:25%;"></td>' ).html( item.name ) );
      row.append( $( '<td style="width:30%;"></td>' ).html( item.email ) );
      row.append( $( '<td style="width:25%;"></td>' ).html( item.phone ) );
      row.append( $( '<td style="width:15%;"></td>' ).html( item.date ) );

      $element.append( row );
    } );  
    // === 產生mobile版資料 ===
    $.each( feedbackData, function ( key, item ) {
      var row = $( `<div class="card"></div>` );

      row.append( $( '<p></p>' ).html( 'English Name' ) );
      row.append( $( '<p></p>' ).html( item.name ) );
      row.append( $( '<p></p>' ).html( 'Email' ) );
      row.append( $( '<p></p>' ).html( item.email ) );
      row.append( $( '<p></p>' ).html( 'Phone' ) );
      row.append( $( '<p></p>' ).html( item.phone ) );
      row.append( $( '<p></p>' ).html( 'Date' ) );
      row.append( $( '<p></p>' ).html( item.date ) );

      $('.cardGroup').append( row );
    } );
    $('.dataTotal').html(`共 ${length} 筆資料`);    
  }else{
    $element
      .empty()
      .html($("<tr></tr>").append('<td colspan="4">No Data.</td>'));
    $('.cardGroup').empty();
    $('.dataTotal').html(`無資料`);
  }
}

/**
 * 重新渲染 分頁導航 
 * @param {number} length 總資料長度
 */
let page = data => {
  $('.pagination').empty();
  let lastPage = Math.ceil(data.length/dataPerPage);

  if (data.length == 0) return null;

  $('.pagination').append(`<li class="page-item" name="1"><span class="page-link">&laquo;</span></li><li class="page-item" name="prev"><span class="page-link">Prev</span></li>`)
  for(i=1; i<=lastPage; i++){
    $('.pagination').append(`<li class="page-item ${currentPage == i ? 'active' : ''}" name="${i}"><span class="page-link">${i}</span></li>`);
  }
  $('.pagination').append(`<li class="page-item" name="next"><span class="page-link" >Next</span></li><li class="page-item" name="${lastPage}"><span class="page-link" >&raquo;</span></li>`);

  $('.pagination li').on( 'click', function(){
    if($(this).attr("name") == "prev"){
      if (currentPage == 1) {
        $('html, body').scrollTop(0);
        return null;
      }
      $('.pagination li').attr('class', 'page-item');
      $.updateParam("page",currentPage-1);
      currentPage = Number($.urlParam("page"));
    } else if($(this).attr('name') == "next"){
      if (currentPage == lastPage) {
        $('html, body').scrollTop(0);
        return null;
      }
      $('.pagination li').attr('class', 'page-item');
      $.updateParam("page",currentPage+1);
      currentPage = Number($.urlParam("page"));
    } else {
      $('.pagination li').attr('class', 'page-item');
      $.updateParam("page",$(this).attr("name"));
      currentPage = Number($.urlParam("page"));
    }

    // 顯示當前頁面
    $(`.pagination :nth-child(${currentPage+2})`).attr('class', 'page-item active');

    refetchTable( data.slice(dataPerPage*(currentPage-1), dataPerPage*(currentPage-1)+dataPerPage), data.length);
    $('html, body').scrollTop(0);
  })
}

// === 新增 User 資料 ===
let addNewMember = data => {
  _data.push(data);

  $("#addform")[0].reset();
  $('#search').val("");

  $("#dialog-addconfirm").modal("toggle");
  
  // 將目前頁數跳至最後一頁
  $.updateParam("page",Math.ceil(_data.length/dataPerPage));
  currentPage = Number($.urlParam("page"));

  refetchTable( _data.slice(dataPerPage*(currentPage-1), dataPerPage*(currentPage-1)+dataPerPage), _data.length);
  page(_data);

  // 移至頁尾
  $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
}

// 新增->儲存按鈕
$("#addconfirm-send").click(function(){
  let enname = $("#addenname").val();
  let email = $("#addemail").val();
  let phone = $("#addphone").val();

  // === 新增欄位認證 ===
  if(enname!=="" && emailRule.test(email) && phoneRule.test(phone)){
    $('.formenname p').empty();
    $('.formphone p').empty();
    $('.formemail p').empty();
    addNewMember({
        id: _data.length+1,
        name: enname,
        email: email,
        phone: [phone],
        date: tomorrow
      });
  } else {
    if(enname == ""){$('.formenname p').html(`此欄位必填`)}else{$('.formenname p').empty()}
    if(!emailRule.test(email)){$('.formemail p').html(`Email 格式錯誤`)}else{$('.formemail p').empty()}
    if(!phoneRule.test(phone)){$('.formphone p').html(`手機號碼格式錯誤`)}else{$('.formphone p').empty()}
  }
})

// 新增->關閉按鈕
$("#addconfirm-close").click(function(){
  $("#addform")[0].reset();
  $('.formenname p').empty()
  $('.formemail p').empty()
  $('.formphone p').empty()
})

/**
 * 搜尋字串比對
 * @param {string} value 搜尋字詞
 * @param {Array} data 需比對的資料
 * 
 */
let search = (value, data = []) => {
  let matchArray = [];

  //比對字詞 並不限大小寫無空白 
  let regexpResult = new RegExp($.trim(value), "ig");
  
  // === 將array轉為字串(不含key) 並排除id ===
  for(let i=0; i<data.length; i++){
    for(key in data[i]){
      let keepValue = Object.keys(data[i]).reduce((val, key)=>{
        // 字詞間以逗號區隔
        return key == "id" ? val: val+","+data[i][key];
      },"")
      if(keepValue.match(regexpResult)) matchArray.push(data[i]);
    }
  }

  // === 僅保留一組相同內容的value ===
  const set = new Set();
  let result = matchArray.filter((item) =>
    !set.has(JSON.stringify(item)) ? set.add(JSON.stringify(item)) : false
  );

  let newRes = result;

  $.updateParam("page",1);
  currentPage = Number($.urlParam("page"));

  refetchTable(newRes.slice(dataPerPage*(currentPage-1), dataPerPage*(currentPage-1)+dataPerPage), newRes.length);
  page(newRes);
  
  searchArr = newRes;
}

refetchTable( _data.slice(dataPerPage*(currentPage-1), dataPerPage*(currentPage-1)+dataPerPage), _data.length);
page(_data);

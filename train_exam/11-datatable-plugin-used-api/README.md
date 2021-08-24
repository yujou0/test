# 主要
```
dist/
└── index.umd.js    (UMD)

src/
└── style.scss
```

# 依賴
- **jQuery**
- **Bootstrap**

# 使用說明
## 安裝
In browser
```html
<script src="../dist/index.umd.js"></script>
```

## 用法
### Syntax
```js
new DataTable( element [, options] )
```

- **element**
    - Type: `String`

- **options** (optional)
  - Type: `Object`
  - 可用的 [options](#options)

##範例
```html
<div class="DataTable">
    <!-- Show Template -->
</div>

<!-- or -->

<div id="DataTable">
    <!-- Show Template -->
</div>
```

```js
let dataTable = new DataTable( 'DataTable' , {
    showPerPage: true,
    showSearch: true,
    showInfo: true,
    showPage: true,
    perPage: 5,
});
```

# Options
### data
- Type: `Object`
- Default: `empty object`
- note: 所有 user 資料

### ShowPerPage
- Type: `Boolean`
- Default: `true`
- note: 是否顯示自訂筆數

### ShowSearch
- Type: `Boolean`
- Default: `true`
- note: 是否顯示搜尋框

### ShowInfo
- Type: `Boolean`
- Default: `true`
- note: 是否顯示總筆數資訊

### ShowPage
- Type: `Boolean`
- Default: `true`
- note: 是否顯示分頁導航

### perPage
- Type: `Number`
- Default: `5`
- note: 自訂筆數

### OnEdit
- Type: `Function`
- Default: `function( id, data )`
- note: 編輯 user 的 callback

### OnDelete
- Type: `Function`
- Default: `function( id )`
- note: 刪除 user 的 callback

### OnAdd
- Type: `Function`
- Default: `function( data )`
- note: 新增 user 的 callback

# Methods
### updateOptions(options)
更新預設參數

- **data**
  - Type: `Object`
  - Properties:
    - 可用的 [options](#options)

### setOptions(options)
動態設置參數

- **data**
  - Type: `Object`
  - Properties:
    - 可用的 [options](#options)

提供預設參數初始化後可以動態設置選項。  
```js
dataTable.setOption({ data: data });
```  

### search(value, data, options)
搜尋字詞

- **data**
  - value
    - Type: `String`
    - note: 搜尋框內字詞
  - data
    - Type: `Object`
    - note: 所有 user 資料
  - options
    - Type: `Object`
    - Properties:
      - 可用的 [options](#options)

### addData(data)
- **data**
  - Type: `Object`
  - note: 新 user 資料

### updateData(data)
- **data**
  - Type: `Object`
  - note: 更新的 user 資料

### removeData(id)
- **data**
  - Type: `Number`
  - note: 需刪除的 user 的 id
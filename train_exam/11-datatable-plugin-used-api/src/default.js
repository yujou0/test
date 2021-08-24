// Options
export default {
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
     * @param {Object} [rowData] 當列的欄位資料
     */ 
     onAdd: null,
};
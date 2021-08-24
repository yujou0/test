function count(){
    var hamPrice = 50;
    var cokePrice = 20;
    var hamNum = parseInt(document.getElementById('hamNumId').value)*hamPrice;
    var cokeNum = parseInt(document.getElementById('cokeNumId').value)*cokePrice;
    document.getElementById('totalId').textContent = hamNum + cokeNum
}
function checkContent(e){
    var str =  e.target.value;
    if(str==''){
        alert('此欄位不可為空')
    }
}
var el = document.getElementById('countId');
el.addEventListener('click',count,false);

var ham = document.getElementById('hamNumId');
ham.addEventListener('blur',checkContent,false);
var coke = document.getElementById('cokeNumId');
coke.addEventListener('blur',checkContent,false);

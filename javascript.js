const name = document.getElementById("name_btn");
const namesize = document.getElementById("inputname")

function ClickName(){
    if(namesize.value.length = 0){
        alert('종목을 입력하세요.');
    }else{
        alert('종목이 입력되었습니다.');
    }
}

if (name){
    name.addEventListener("click", ClickName);
}
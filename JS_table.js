
function openclose(){
    let status = $('#stocktable').css('display');
    if (status=='table'){
        $('#stocktable').hide();
        $('#onoffbtn').text('내 종목 보기');
    }else{
        $('#stocktable').show();
        $('#onoffbtn').text('숨기기');
        $('#stocktable').css('display','table')
    }
}


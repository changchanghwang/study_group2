
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

$(document).ready(function(){
    rate();
    myStock();
});

function rate(){
    $.ajax({
            type: "GET",
            url: "http://spartacodingclub.shop/sparta_api/rate",
            data: {},
            success: function (response){
                let rates = response['rate'];
                let temp_html = ""
                temp_html =`<span class="rates">${rates+'원'}</span>`
                $('#rate').append(temp_html)
            }
        })
}

function myStock() {
    $.ajax({
        type: "GET",
        url: "/Stock",
        data: {},
        success: function (response) {
            let stocks = response['view_stock']
            for (let i = 0; i<stocks.length; i++){
                let ticker = stocks[i]['ticker']
                let price = stocks[i]['price']
                let quantity = stocks[i]['quantity']
                let total = price * quantity
                let temp_html = `
                                <tbody>
                                    <th>${ticker}</th>
                                    <th>${price}</th>
                                    <th>${quantity}</th>
                                    <th>${total}</th>
                                </tbody>`
                $('#stocktable').append(temp_html);
            }
        }
    })
}
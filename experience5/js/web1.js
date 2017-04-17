$(document).ready(function() {
    $(".ui-box-max").hide();
    $(".ui-ex1-box").on("click",function(){
        var imgsrc=$(this).attr('src');
        $(".ui-box-max-img").attr("src",imgsrc);
        $(".ui-box-max").show();
    });
    $(".ui-box-max").on("click",function(){
    $(".ui-box-max").hide();
    })
    // experience2
    $(".ui-slides-part").on("mouseover",function(){
        var txt=$(this).index()+1;
        $(".ui-main-init").text(txt);
    })
    // experience3
    var newli = $(".ui-main-li").eq(0).clone();
    $(".ui-main-delete").on("click",function(){
        $(this).parent().remove();
        $(".ui-main-num").text(tolist);
    });
    $("#ui-add").unbind().click(function() {
        var addli=newli.clone();
        $("#ui-top").unbind().append(addli);
        $(".ui-main-num").text(tolist);
        $(".ui-main-delete").on("click",function(){
            $(this).parent().remove();
            $(".ui-main-num").text(tolist);
        });
    });
    function tolist(n){
        return n+1;
    }
});
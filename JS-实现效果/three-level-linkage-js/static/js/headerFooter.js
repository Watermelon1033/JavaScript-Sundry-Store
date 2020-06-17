$(function(){
    $.ajax({
        type: "get",
        url: "header.html",
        dataType: "html",
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        },
        success: function (data) {
            $(".headerWall").html(data);

        }
    });

    $.ajax({
        type: "get",
        url: "footer.html",
        dataType: "html",
        error: function (xhr, textStatus, errorThrown) {
            alert("error");
        },
        success: function (data) {
            $(".footerWall").html(data);
        }
    });

});




/* js利用ajax把数据传给后台
$(document).ready(function () {
    $("#saveAll").on("click", function () {  //点击id为saveAll
        $('input:text').each(function (i) {    //找到所有input的type为text的文本框
            $(this).trigger('blur');　　　　　　 //执行所有input的type为text的文本框失去焦点事件
        });
        //创建json数组
        var json = "{"
        $("input:text").each(function (i) {
            if (i == 0) {
                json += $(this).attr("id") + ":" + $(this).val();
            } else {
                json += "," + $(this).attr("id") + ":" + $(this).val();
            }
        });
        json += "}";
        //将json数组传到后台
        $.ajax({
            type: "Post",
            url: "/Exam/Correcting",
            data: { jsonmodel: json },
            dataType: "json",
            success: function (r) {
            },
            error: function (err) {
                alert("查询失败");
            }
        });

        $.post("/Exam/ExamCorrecting", $("form").serialize(), function (r) {});
        return false;
    });
});
*/


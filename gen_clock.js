
/**
 * Created by Administrator on 2017/2/16.
 */
$('.canvas_clock').each(function () {
    var hour=parseInt($(this).attr('hour'));
    var min=parseInt($(this).attr('minute'));
    //设置canvas的属性
    $(this).attr('width','250px');
    $(this).attr('height','250px');
    //$(this).get(0)把jq对象转化为js对象
    gen_clock(hour,min,$(this).get(0));
})

/**
 * 生成时钟图案的js
 * @param hour 小时
 * @param min 分钟
 * @param obj_name 对象的名字(string)
 */
function gen_clock(hour,min,obj_name){

    var canvas=obj_name;
    var c=canvas.getContext("2d");//getContentText  返回一个绘图的环境，其中2d是目前唯一合法的字符  指的是
        c.clearRect(0, 0, 500, 500);//清除画布,

        hour = hour + min / 60;
        hour = hour > 12 ? hour - 12 : hour;//21:36:21 把24小时转12小时制


        //表盘
        c.lineWidth = 10;
        c.strokeStyle = "blue";
        c.beginPath();
        c.arc(125, 125, 100, 0, 360, false);
        c.closePath();
        c.stroke();

        //1.刻度

        //1.1 时刻度
        c.lineWidth = 5;
        c.strokeStyle = "#000";
        for (var i = 0; i < 12; i++) {
            c.save();
            c.translate(125, 125);
            c.rotate(i * 30 * Math.PI / 180);
            c.beginPath();
            c.moveTo(0, -80);
            c.lineTo(0, -95);
            c.closePath();
            c.stroke();
            c.restore();
        }

        //1.2 分刻度
        c.lineWidth = 2;
        c.strokeStyle = "#000";
        for (var i = 0; i < 60; i++) {
            c.save();
            c.translate(125, 125);
            c.rotate(i * 6 * Math.PI / 180);
            c.beginPath();
            c.moveTo(0, -85);
            c.lineTo(0, -95);
            c.closePath();
            c.stroke();
            c.restore();
        }

        //2.1 时针
        c.save();
        c.lineWidth = 5;
        c.strokeStyle = "#000";
        c.translate(125, 125);
        c.rotate(hour * 30 * Math.PI / 180);
        c.beginPath();
        c.moveTo(0, -50);
        c.lineTo(0, 5);
        c.closePath();
        c.stroke();
        c.restore();

        //2.2 分针
        c.save();
        c.lineWidth = 3;
        c.strokeStyle = "#333";
        c.translate(125, 125);
        c.rotate(min * 6 * Math.PI / 180);
        c.beginPath();
        c.moveTo(0, -75);
        c.lineTo(0, 15);
        c.closePath();
        c.stroke();
        c.restore();
        //3 盘外时刻数字
        for (var i = 1; i < 13; i++) {
            c.save();
            c.lineWidth = 3;
            c.strokeStyle = "blue";
            c.font = "20px 黑体";
            c.translate(125, 125);
            c.rotate(i * 30 * Math.PI / 180);
            c.beginPath();
            c.strokeText("" + i, -10, -105);
            c.closePath();
            c.stroke();
            c.restore();
        }
}

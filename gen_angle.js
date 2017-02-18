/**
 * Created by Administrator on 2017/2/16.
 */
//This file is used to generate the angle file
$('.canvas_angle').each(function(){
    var angle=parseInt($(this).attr('angle'));
    $(this).attr('width','250px');
    $(this).attr('height','250px');
    genLine(angle,$(this).get(0));
})

function genLine(angle,obj){
    var context=obj.getContext('2d');
    //获取角度数组
    var angle_array=getRandomAngle(125);
    var x1=angle_array['x'];var y1=angle_array['y'];
    var angle_array1=getAngle(angle_array['angle'],angle,125);
    var x2=angle_array1['x'];var y2=angle_array1['y'];
    drawLine(context,0,0,x1,y1);
    drawLine(context,0,0,x2,y2);
    if(angle==90){
        //计算当angle为90度的时候的情况
        var OA=Math.sqrt(25*25+25*25);
        var Ya=OA*Math.sin((45+angle_array['angle'])/180*Math.PI);
        var Xa=OA*Math.cos((45+angle_array['angle'])/180*Math.PI);
        var OB=25;
        var Yb=OB*Math.sin(angle_array['angle']/180*Math.PI);
        var Xb=OB*Math.cos(angle_array['angle']/180*Math.PI);
        var Yc=OB*Math.sin((90+angle_array['angle'])/180*Math.PI);
        var Xc=OB*Math.cos((90+angle_array['angle'])/180*Math.PI);

        drawLine(context,Xa,Ya,Xc,Yc,'#FF00FF');
        drawLine(context,Xa,Ya,Xb,Yb,'#FF00FF');

    }else {
        drawCircle(context,0,0,angle_array['angle']/180*Math.PI,(angle_array['angle']+angle)/180*Math.PI,'#FF00FF');
    }


}
function drawLine(context,x1,y1,x2,y2,color){
    var color=arguments[5]?color:'#030303';
    context.beginPath();
    context.moveTo(x1+125,y1+125);
    context.lineTo(x2+125,y2+125);
    context.closePath();
    context.strokeStyle=color;
    context.stroke();
}

function drawCircle(context,x,y,arc_start,arc_end,color){
    var color=arguments[5]?arguments[5]:'#030303';
    context.beginPath();
    context.arc(x+125,y+125,25,arc_start,arc_end,false);
    context.strokeStyle=color;
    context.stroke();
}

/**
 * 获取angle的函数
 * @param angle_pre 之前的角度
 * @param angle_add 需要添加的角度
 * @param long
 * @return {Array}
 */
function getAngle(angle_pre,angle_add,long) {
    var angle = (angle_pre+angle_add)/180*Math.PI;
    var y = long*Math.sin(angle);
    var x = long*Math.cos(angle);
    var result=[];
    result['x']=x;
    result['y']=y;
    result['angle']=angle;
    return result;
}

/**
 * 获取随机随机角度
 * @param long
 * @return {Array}
 */
function getRandomAngle(long){
    //get random angle
    var angle1 = Math.random()*360;
    var angle = angle1/180*Math.PI;
    //get the coordinate of this point
    var y = long*Math.sin(angle);
    var x = long*Math.cos(angle);
    var result=[];
    result['x']=x;
    result['y']=y;
    result['angle']=angle1;
    return result;
}
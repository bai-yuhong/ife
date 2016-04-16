/**
 * Created by bai on 2016/4/15.
 */
var num=document.getElementById("num");
var bt1=document.getElementById("b1");
var bt2=document.getElementById("b2");
var bt3=document.getElementById("b3");
var bt4=document.getElementById("b4");
var arr=[];
var cons=document.getElementById("container");
function addEventHandle(ele,event,handle)
{
    if(ele.addEventListener)
    {
        ele.addEventListener(event,handle);
    }
    else if(ele.attachEvent)
    {
        ele.attachEvent("on"+event,handle);
    }
    else
    {
        ele["on"+event]=handle;
    }
}
function leftIn(){
    var value=num.value;
    num.value="";
    if(value<10||value>100)
    {
        alert("数字不在范围内");
        return;
    }
    if(arr.lenth>=60)
    {
        alert("超过了60个数");
        return;
    }
    arr.unshift(value);
    showDiv();
}
function leftOut(){
    arr.shift();
    showDiv();
}
function rightIn(){
    value=num.value;
    num.value="";
    if(value<10||value>100)
    {
        alert("数字不在范围内");
        return;
    }
    if(arr.lenth>=60)
    {
        alert("超过了60个数");
        return;
    }
    arr.push(value);
    showDiv();
}
function rightOut(){
    arr.pop();
    showDiv();
}
function showDiv()
{
    var len=arr.length;
    var innerHtml="";
    for(var i=0;i<len;i++)
    {
        innerHtml+="<div class='num'style='height: "+arr[i]+"px'></div>";
    }
    if(innerHtml!="")
    {
        cons.innerHTML=innerHtml;
    }
    else
    {
        cons.innerHTML="";
    }
}
addEventHandle(bt1,'click',leftIn);
addEventHandle(bt2,'click',rightIn);
addEventHandle(bt3,'click',leftOut);
addEventHandle(bt4,'click',rightOut);
/**
 * Created by bai on 2016/4/15.
 */

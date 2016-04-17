/**
 * Created by baiyuhong on 2016/4/16.
 */
var tag=document.getElementById("tag");
var hobby_value=document.getElementById("hobby");
var tag_arr=[];
var hobby_arr=[];
var tagList=document.getElementById("tagList");
var hobbyList=document.getElementById("hobbyList");
function addEventHandle(ele,event,handle)
{
    if(ele.addEventListener)
    {
        ele.addEventListener(event,handle);
    }else if(ele.attachEvent)
    {
        ele.attachEvent('on'+event,handle);
    }else{
        ele['on'+event]=handle;
    }
}
function deleteTag()
{
    var value=event.target.innerText.slice(4);
    var index=tag_arr.indexOf(value);
    alert(index);
    tag_arr.splice(index,1);
    showTag();
}
function hoverTag()
{
    console.log("f ssfg");
    event.target.style.background="red";
    event.target.innerText="点击删除"+event.target.innerText;
}
function hoverOutTag()
{
    var value=event.target.innerText.toString();
    value=value.slice(4);
    event.target.innerText=value;
}
function showTag()
{
    var innerHtml="";
    var len=tag_arr.length;
    for(var i=0;i<len;i++)
    {
        innerHtml+="<div>"+tag_arr[i]+"</div>";
    }
    tagList.innerHTML=innerHtml;
    var tags=tagList.getElementsByTagName("div");
    alert(tags.length);
    for(var j=0;j<tags.length;j++)
    {
        (function(m){
            addEventHandle(tags[m],'mouseover',hoverTag);
            addEventHandle(tags[m],'mouseout',hoverOutTag);
            addEventHandle(tags[m],'click',deleteTag);
        })(j)
    }
}
function tag_input()
{

    if(event.keyCode==32)
    {
        var value=tag.value.trim();
        if(tag_arr.indexOf(value)==-1&&value!="")
        {
            tag_arr.push(value);
        }
        tag.value="";
        while(tag_arr.length>10)
        {
            tag_arr.shift();
        }
    }

    showTag();
}
function showHobby()
{
    var innerHtml="";
    var len=hobby_arr.length;
    for(var i=0;i<len;i++)
    {
        innerHtml+="<div>"+hobby_arr[i]+"</div>";
    }
    hobbyList.innerHTML=innerHtml;
}
function hobby_Click()
{
    var value=hobby_value.value;
    value.trim();
    value=value.split(" ");
    for(var i=0;i<value.length;i++)
    {
        value[i].trim();
        if(hobby_arr.indexOf(value[i])==-1&&value[i]!="")//去重
        {
            hobby_arr.push(value[i]);
        }
    }
    while(hobby_arr.length>10)//不能多于10个
    {
        hobby_arr.shift();
    }
    showHobby();
}
addEventHandle(tag,'keyup',tag_input);
var btn=document.getElementById("btn");
addEventHandle(btn,'click',hobby_Click);

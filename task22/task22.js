/**
 * Created by baiyuhong on 2016/4/16.
 */
var bt1=document.getElementById("bt1");
var bt2=document.getElementById("bt2");
var bt3=document.getElementById("bt3");
var root=document.querySelector(".root");
function addEventHandle(ele,event,handle)
{
    if(ele.addEventListener)
    {
        ele.addEventListener(event,handle);
    }else if(ele.attachEvent)
    {
        ele.attachEvent("on"+event,handle);
    }else{
        ele['on'+event]=handle;
    }
}
function Tree_traver()
{
    this.stack=[];
    this.status=false;
}
Tree_traver.prototype.preOrder=function (node)
{
    this.stack.push(node);
    if(node.firstElementChild)
    {
        this.preOrder(node.firstElementChild);
    }
    if(node.lastElementChild)
    {
        this.preOrder(node.lastElementChild);
    }
}
Tree_traver.prototype.middleOrder=function (node)
{
    if(node.firstElementChild)
    {
        this.middleOrder(node.firstElementChild);
    }
    this.stack.push(node);
    if(node.lastElementChild)
    {
        this.middleOrder(node.lastElementChild);
    }
}
Tree_traver.prototype.afterOrder=function(node)
{
    if(node.firstElementChild)
    {
        this.preOrder(node.firstElementChild);
    }
    if(node.lastElementChild)
    {
        this.preOrder(node.lastElementChild);
    }
    this.stack.push(node);
}
Tree_traver.prototype.treeAnimation=function()
{
    var stack=this.stack;
    var self=this;
    var timer;
    var item=0;
    self.stack=[];
    if(!self.status)
    {
        self.status=true;
        timer=setInterval(function(){
            if(item<stack.length)
            {
                if(item-1>=0) {
                    stack[item - 1].style.background = "#ffffff";
                }
                stack[item++].style.background="red";
            }
            else
            {
                stack[item-1].style.background="#ffffff";
                self.status=false;
                clearInterval(timer);
            }
        },1000);
    }

};
addEventHandle(bt1,'click',function()
{
    var treeraver=new Tree_traver();
    treeraver.preOrder(root);
    treeraver.treeAnimation();
});
addEventHandle(bt2,'click',function()
{
    var treeraver=new Tree_traver();
    treeraver.middleOrder(root);
    treeraver.treeAnimation();
});
addEventHandle(bt3,'click',function()
{
    var treeraver=new Tree_traver();
    treeraver.afterOrder(root);
    treeraver.treeAnimation();
});
/*
 var bt1=document.getElementById("bt1");
 var bt2=document.getElementById("bt2");
 var bt3=document.getElementById("bt3");
 var root=document.querySelector(".root");
 var treeraver=new Tree_traver();
 function addEventHandle(ele,event,handle)
 {
 if(ele.addEventListener)
 {
 ele.addEventListener(event,handle);
 }else if(ele.attachEvent)
 {
 ele.attachEvent("on"+event,handle);
 }else{
 ele['on'+event]=handle;
 }
 }
 function Tree_traver()
 {
 this.stack=[];
 this.status=false;
 }
 Tree_traver.prototype.preOrder=function (node)
 {
 this.stack.push(node);
 if(node.firstElementChild)
 {
 this.preOrder(node.firstElementChild);
 }
 if(node.lastElementChild)
 {
 this.preOrder(node.lastElementChild);
 }
 }
 Tree_traver.prototype.middleOrder=function (node)
 {
 if(node.firstElementChild)
 {
 this.middleOrder(node.firstElementChild);
 }
 this.stack.push(node);
 if(node.lastElementChild)
 {
 this.middleOrder(node.lastElementChild);
 }
 }
 Tree_traver.prototype.afterOrder=function(node)
 {
 if(node.firstElementChild)
 {
 this.preOrder(node.firstElementChild);
 }
 if(node.lastElementChild)
 {
 this.preOrder(node.lastElementChild);
 }
 this.stack.push(node);
 }
 Tree_traver.prototype.treeAnimation=function()
 {
 var stack=this.stack;
 var self=this;
 var timer;
 var item=0;
 self.stack=[];
 if(!self.status)
 {
 self.status=true;
 timer=setInterval(function(){
 if(item<stack.length)
 {
 if(item-1>=0) {
 stack[item - 1].style.background = "#ffffff";
 }
 stack[item++].style.background="red";
 }
 else
 {
 stack[item-1].style.background="#ffffff";
 self.status=false;
 clearInterval(timer);
 }
 },1000);
 }

 };
 addEventHandle(bt1,'click',function()
 {

 treeraver.preOrder(root);
 treeraver.treeAnimation();
 });
 addEventHandle(bt2,'click',function()
 {
 treeraver.middleOrder(root);
 treeraver.treeAnimation();
 });
 addEventHandle(bt3,'click',function()
 {
 treeraver.afterOrder(root);
 treeraver.treeAnimation();
 });



 如果采用call实现方法的继承而不是prototypr.比如
 preOrder(treetraver,node)的时候只有遍历的第一次采用的是this指向treetraver，而以后的每一次递归采用的都是window
 */

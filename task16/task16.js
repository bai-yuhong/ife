/**
 * Created by bai on 2016/4/5.
 */
/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var table=document.getElementById("aqi-table");

var btn=document.getElementById("add-btn");
var aqiData = {};
var alphaReg = /^[\u4e00-\u9fa5aa-zA-z]+$/i;
var   numReg = /^[1-9]*$/i;
var nullReg = /[(^\s+)(\s+$)]/g;
var city=document.getElementById("aqi-city-input");
var number=document.getElementById("aqi-value-input");
/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
 */
function addAqiData( ) {

    scity=city.value.trim();
    num=number.value.trim();
    num=parseInt(num);
    if(!alphaReg.test(scity))
    {
        alert("����ĳ���������Ϊ��Ӣ���ַ�");
        return;
    }
    if(!numReg.test(num))
    {
        alert("��������ָ������Ϊ����");
        return;
    }
    aqiData[scity]=num;
}
/**
 * ��Ⱦaqi-table���
 */
function renderAqiList() {
    var items = "<tr><td>����</td><td>��������</td><td>����</td></tr>";
    for(var data in aqiData)
    {
        items+="<tr>"+"<td>"+data+"</td>"+"<td>"+aqiData[data]+"</td>"+"<td><button value='"+data+"'>ɾ��</button></td>"+"</tr>";
    }
    table.innerHTML=data?items:"";
}

/**
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
 */
function delBtnHandle(scity) {
    // do sth.
    delete aqiData[scity];
    renderAqiList();

}

function init() {
    // ���������add-btn��һ������¼������ʱ����addBtnHandle����
    btn.addEventListener("click",addBtnHandle);
    // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����
    table.addEventListener("click",function(event){
        if(event.target.nodeName.toLowerCase()==='button')
        {
            delBtnHandle.call(null,event.target.value);
        }
    })
}
window.onload=init;

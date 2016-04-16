/* ���ݸ�ʽ��ʾ
 var aqiSourceData = {
 "����": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// �������������������ģ�����ɲ�������
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "����": randomBuildData(500),
    "�Ϻ�": randomBuildData(300),
    "����": randomBuildData(200),
    "����": randomBuildData(100),
    "�ɶ�": randomBuildData(300),
    "����": randomBuildData(500),
    "����": randomBuildData(100),
    "����": randomBuildData(100),
    "����": randomBuildData(500)
};
var formGraTime = document.getElementById('form-gra-time');
var citySelect = document.getElementById('city-select');
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];

// ������Ⱦͼ�������
var chartData = {};

// ��¼��ǰҳ��ı�ѡ��
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * ��Ⱦͼ��
 */
function renderChart() {
    var color = '',text = '';
    for (var item in chartData) {
        color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
        text += '<div title="'+item+":"+chartData[item]+'" style="height:'+chartData[item]+'px; background-color:'+color+'"></div>';
    }
    aqiChartWrap.innerHTML = text;
}

/**
 * �ա��ܡ��µ�radio�¼����ʱ�Ĵ�����
 */
function graTimeChange() {
    // ȷ���Ƿ�ѡ����˱仯
    if(pageState.nowGraTime==this.value)
    {
        return;
    }else{
        pageState.nowGraTime=this.value;
    }
    // ���ö�Ӧ����
    initAqiChartData();
    renderChart();
    // ����ͼ����Ⱦ����
}

/**
 * select�����仯ʱ�Ĵ�����
 */
function citySelectChange() {
    // ȷ���Ƿ�ѡ����˱仯
    if(pageState.nowSelectCity==this.value)
    {
        return;
    }else{
        pageState.nowSelectCity=this.value;
    }
    // ���ö�Ӧ����
    initAqiChartData();
    renderChart();
    // ����ͼ����Ⱦ����
}
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
/**
 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���graTimeChange
 */
function initGraTimeForm() {
    var graTimes=document.getElementsByName("gra-time");
    for(var i=0;i<graTimes.length;i++)
    {
        addEventHandler(graTimes[i],'click',graTimeChange);
    }
}

/**
 * ��ʼ������Select����ѡ����е�ѡ��
 */
function initCitySelector() {
    // ��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��
    var cityLists="";
    for (var key in aqiSourceData)
    {
        cityLists+="<option>"+key+"</option>";
    }
    document.getElementById("city-select").innerHTML=cityLists;
    pageState.nowSelectCity=document.getElementsByTagName("option")[0].value;
    addEventHandler(document.getElementById("city-select"),'change',citySelectChange);
    // ��select�����¼�����ѡ����仯ʱ���ú���citySelectChange


}

/**
 * ��ʼ��ͼ����Ҫ�����ݸ�ʽ
 */
function initAqiChartData() {
    // ��ԭʼ��Դ���ݴ����ͼ����Ҫ�����ݸ�ʽ,�������ݶ���aqiSourceData[]��
    // ����õ����ݴ浽 chartData ��
    var nowCityData = aqiSourceData[pageState.nowSelectCity];
    //nowCityData��ȷ����һ�����е�92�콵ˮ���飬key�����ڣ�nowCityData[key]�ǽ�ˮ��
    if (pageState.nowGraTime == 'day') {
        chartData = nowCityData;
    }
    if (pageState.nowGraTime == 'week') {
        chartData = {};
        var countSum=0, daySum=0, week=0;
        for (var item in nowCityData) {
            countSum += nowCityData[item];
            daySum ++;
            if ((new Date(item)).getDay() == 6 ) {
                week ++;
                chartData['��'+week+'��'] = Math.floor(countSum/daySum);;
                countSum = 0;
                daySum = 0;
            }
        }
        if (daySum!=0) {
            week ++;
            chartData['��'+week+'��'] = Math.floor(countSum/daySum);
        }//��֤���һ��������Ҳ����һ��
    }
    if (pageState.nowGraTime == 'month') {
        chartData = {};
        var countSum=0, daySum=0, month=0;
        for (var item in nowCityData) {
            countSum += nowCityData[item];
            daySum ++;
            if ((new Date(item)).getMonth() !== month) {
                month ++;
                chartData['��'+month+'��'] = Math.floor(countSum/daySum);
                countSum = 0
                daySum = 0;
            }
        }
        if (daySum != 0) {
            month ++;
            chartData['��'+month+'��'] = Math.floor(countSum/daySum);
        }//�߼�ͬ�ܣ���֪���Բ���
    }
}

/**
 * ��ʼ������
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();


import React from 'react';
import ReactEcharts from 'echarts-for-react';

const option = {
    title: {
        text: '项目类别占比图',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#777' 
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend:{
        orient:'vertical',
        left:'left',
        data:['美容服务','维修服务','洗车','抢修']
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'项目类别',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'美容服务'},
                {value:310, name:'维修服务'},
                {value:234, name:'洗车'},
                {value:135, name:'抢修'},
            ].sort(function (a, b) { return a.value - b.value}),
            label: {
                normal: {
                    textStyle: {
                        color: '#777'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#777'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,0.5)'
                },

            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

const EchartsPie = () => (
    <ReactEcharts
        option={option}
        style={{height: '300px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default EchartsPie;
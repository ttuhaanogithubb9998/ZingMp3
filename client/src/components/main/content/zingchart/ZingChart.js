import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Highcharts from 'highcharts'
import HighchartReact from 'highcharts-react-official'

import Item from '../../listPlays/list/Item'


function ZingChart({ handleChangeList, idSong, handleChangeSong }) {


    const [options, setOptions] = useState();
    const [data, setData] = useState();
    const [showAll, setShowAll] = useState(false);



    useEffect(() => {
        axios.get('/api/chart-home')
            .then(res => {
                // console.log(res.data.data);

                let data = res.data.data;
                let categories = data.RTChart.chart.times.map((time, i) => {
                    if (i % 2 === 0) return time.hour + ":00"
                    return ""
                });

                setOptions({
                    credits: {
                        enabled: false
                      },
                    accessibility: {
                        enabled: false,
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 1.5,
                            states: {
                                hover: {
                                    lineWidth: 2,
                                    marker: {
                                        enabled: false
                                    },
                                }
                            },
                            marker: {
                                enabled: false,
                                symbol: "round",
                                fillColor: "white",
                                lineWidth: 2,
                                radius: 3,
                                states: {
                                    hover: {
                                        enabled: true,
                                        radius: 4,
                                    }
                                }
                            },
                        },
                        series: {
                            events: {
                                mouseOver() {

                                    const color = arguments[0].target.color;
                                    // this.chart.tooltip.options.backgroundColor = color; //first time overwrite
                                    setTimeout(() => {
                                        const tooltipMainBox = document.querySelector(`g.highcharts-tooltip path:last-of-type`);
                                        if (tooltipMainBox) {
                                            tooltipMainBox.setAttribute('fill', color);
                                        }
                                    });

                                    this.chart.update({
                                        series: {
                                            marker: {
                                                enabled: false,
                                            },
                                        },
                                    })

                                    this.update({
                                        marker: {
                                            enabled: true,
                                            lineColor: color,
                                        },
                                    })

                                    const g = document.querySelector("g.highcharts-yaxis-grid");
                                    let coordinates = g.getBoundingClientRect();
                                    document.querySelector(".highchartR").onmousemove = (e) => {
                                        if (e.pageX < coordinates.left || e.pageX > coordinates.right || e.pageY < coordinates.top || e.pageY > coordinates.bottom) {
                                            this.update({
                                                marker: {
                                                    enabled: true,
                                                    lineColor: color,
                                                },
                                            })
                                        }
                                    }

                                },
                                mouseOut() {
                                    this.update({
                                        marker: { enabled: false }
                                    })
                                }
                            },
                        }
                    },
                    chart: {
                        height: 250,
                        type: 'spline',
                        backgroundColor: "transparent",
                        events: {
                            load() {
                                let max = 0;
                                let cur = 0;
                                data.RTChart.chart.items[data.RTChart.items[0].encodeId].forEach((item, i) => {
                                    // console.log(item)
                                    if (max < item.counter) {
                                        max = item.counter;
                                        cur = i
                                    }
                                })
                                this.tooltip.refresh(this.series[0].points[cur]);
                                this.update({
                                    series: {
                                        marker: {
                                            enabled: true,
                                            lineColor: this.series[0].color
                                        },
                                    },
                                })
                                setTimeout(() => {
                                    const tooltipMainBox = document.querySelector(`g.highcharts-tooltip path:last-of-type`);
                                    if (tooltipMainBox) {
                                        tooltipMainBox.setAttribute('fill', this.series[0].color);
                                    }
                                });
                            },

                        }
                    },
                    title: {
                        text: ""
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: {
                            width: 1,
                        },
                        lineWidth: 0,

                    },
                    yAxis: {
                        title: {
                            text: ""
                        },
                        labels: {
                            formatter: () => ""
                        },
                        gridLineDashStyle: 'dash',
                        gridLineWidth: 0.2,
                        gridLineColor: "#cdc",

                    },
                    series: [
                        {
                            marker: {
                                lineColor: "#2596be"
                            },
                            artists: data.RTChart.items[0].artists.reduce((pre, cur, i) => {
                                if (i == 0) return pre + cur.name
                                return pre + ", " + cur.name
                            }, ""),
                            img: data.RTChart.items[0].thumbnail,
                            name: data.RTChart.items[0].title,
                            showInLegend: false,
                            color: "#2596be",
                            data: data.RTChart.chart.items[data.RTChart.items[0].encodeId].map(item => item.counter)
                        },
                        {
                            marker: {
                                lineColor: "#BB4708"
                            },
                            artists: data.RTChart.items[1].artists.reduce((pre, cur, i) => {
                                if (i == 0) return pre + cur.name
                                return pre + ", " + cur.name
                            }, ""),
                            img: data.RTChart.items[1].thumbnail,
                            name: data.RTChart.items[1].title,
                            color: "#BB4708",
                            showInLegend: false,
                            data: data.RTChart.chart.items[data.RTChart.items[1].encodeId].map(item => item.counter)
                        },
                        {
                            marker: {
                                lineColor: "#06AD4B"
                            },
                            artists: data.RTChart.items[2].artists.reduce((pre, cur, i) => {
                                if (i == 0) return pre + cur.name
                                return pre + ", " + cur.name
                            }, ""),
                            img: data.RTChart.items[2].thumbnail,
                            name: data.RTChart.items[2].title,
                            color: "#06AD4B",
                            showInLegend: false,
                            data: data.RTChart.chart.items[data.RTChart.items[2].encodeId].map(item => item.counter)
                        },

                    ],
                    tooltip: {
                        hideDelay: 10000000,
                        useHTML: true,
                        padding: 4,
                        borderWidth: 0,
                        headerFormat: "",
                        pointFormat: `<div class ="flex justify-between items-center">
                            <div class ="w-[30px] h-[30px] rounded-[2px] overflow-hidden">
                                <img class = "w-[30px]"src ="{series.options.img}"/> 
                            </div>
                            <div  class="flex flex-col leading-[12px] text-[9px] pl-1 text-zinc-50  ">
                                <div class = "font-semibold">{series.name}</div>
                                <div class = "text-[7px] text-slate-300">{series.options.artists}</div>
                            </div>
                        </div>`,
                    },

                });

                setData(data)

            })
    }, [])

    Highcharts.addEvent(Highcharts.Axis, 'afterDrawCrosshair', function ({
        point
    }) {
        if (this.cross && point) {
            this.cross.attr({
                stroke: point.series.color
            })
        }
    })

    const changeList = useCallback(() => {
        handleChangeList({ type: "chart-home", id: "" })
    }, [])



    return (
        <div className="pb-[90px] text-zinc-50 ">
            <div className="highchartR ">
                {options && <HighchartReact
                    highcharts={Highcharts}
                    options={options}
                />}
            </div>
            <div className=" px-[10%]">
                {
                    data && data.RTChart.items.map((item, i) => {
                        if (i <10) {
                            return <div key={i} className="flex items-center">
                                <div className="mr-3 text-gray-100">{i + 1}</div>
                                <Item
                                    vip={item.streamingStatus === 2}
                                    changeList={changeList}
                                    index={i}
                                    itemActive={idSong}
                                    dataItem={item}
                                    handleChangeSong={handleChangeSong}
                                />
                            </div>
                        }else{
                            if(showAll){
                                return <div key={i} className="flex items-center">
                                <div className="mr-3 text-gray-100">{i + 1}</div>
                                <Item
                                    vip={item.streamingStatus === 2}
                                    changeList={changeList}
                                    index={i}
                                    itemActive={idSong}
                                    dataItem={item}
                                    handleChangeSong={handleChangeSong}
                                />
                            </div>
                            }
                        }
                    })
                }
            </div>
            <div className="text-center">
                <div className={`${showAll && "hidden"} rounded-full border border-violet-900 w-[100px] cursor-pointer m-[auto] my-4 text-[13px]`} onClick={() => setShowAll(pre => !pre)} >Xem top 100</div>
            </div>
        </div>
    );
}

export default React.memo(ZingChart);
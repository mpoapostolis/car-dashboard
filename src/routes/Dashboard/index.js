import React, {Component} from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import mean from 'ramda/src/mean';
import max from 'ramda/src/max';
import pluck from 'ramda/src/pluck';
import * as styles from './css';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryContainer,
} from 'victory';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
const io = require('socket.io-client');
const socket = io('http://localhost:8080');

const theme = {
  axis: {
    style: {
      axis: {
        stroke: 'red',
      },
      tickLabels: {
        fill: 'red',
      },
    },
  },
};

class DashBoard extends Component {
  state = {
    cars: [
      {
        name: 'test',
        avgCarSpeed: 0,
        speed: 0,
        history: [...Array(70).keys()].map((e, i) => ({
          value: e,
        })),
      },
      {
        name: 'test1',
        avgCarSpeed: 0,
        speed: 0,
        history: [...Array(70).keys()].map((e, i) => ({
          value: e,
        })),
      },

      {
        name: 'test',
        avgCarSpeed: 0,
        overLimit: true,
        speed: 0,
        history: [...Array(70).keys()].map((e, i) => ({
          value: e,
        })),
      },
      {
        name: 'test2',
        avgCarSpeed: 0,
        speed: 0,
        history: [...Array(70).keys()].map((e, i) => ({
          value: e,
        })),
      },
    ],
    infos: {
      movingCars: 0,
      averageSpeed: 0,
      carsOverLimit: 0,
      riskyDrivers: 0,
      maxSpeed: 0,
      lanes: [
        {
          name: '1',
          value: 6,
        },
        {
          name: '2',
          value: 0,
        },
        {
          name: '3',
          value: 0,
        },
        {
          name: '4',
          value: 0,
        },
      ],
    },
    logs: [],
  };

  componentDidMount() {
    socket.on('update-browser', e => {
      console.log("ss")
      this.setState(s => ({...e}));
    });
    socket.on('log', e => {
      const tmpMsgs = this.state.logs.slice(0,40)
      this.setState(s => ({...s, logs: [e,...tmpMsgs]}));
    });

  }

  render() {
    const {
      container,
      labelClass,
      mainClass,
      warningBox,
      trafficBox,
      logBox,
      infoHead,
      carName,
      infoItem,
      bottomItem,
      speedMeterCont,
      chartCont,
      avgSpeed,
      warningInfo,
      graph,
      warningInfoCont,
      warningValues,
      progressCont,
      trfBoxCont,
      valueClass,
    } = styles;
    const {
      cars,
      infos: {
        movingCars = 0,
        averageSpeed = 0,
        maxSpeed = 0,
        carsOverLimit = 0,
        riskyDrivers = 0,
        lanes = Array(4).map((e, i) => ({
          name: `${i + 1}`,
          value: 6,
        })),
      },
    } = this.state;
    const isSix = cars.length > 4 ? 'isSix' : '';

    const myTheme = mergeDeepRight(VictoryTheme.grascale);
    const infosArr = [
      {name: 'Moving cars', value: movingCars, img: '/images/car.svg'},
      {
        name: 'Avg Speed',
        value: `${averageSpeed ? averageSpeed.toFixed(2) : 0} km/h`,
        img: '/images/speedometer.svg',
      },
      {
        name: 'Max Speed',
        value: `${maxSpeed.toFixed(2)} km/h`,
        img: '/images/speedometer.svg',
      },
    ];

    const warningInfoArr = [
      {
        name: 'Cars running over the Limit',
        value: carsOverLimit,
        img: '/images/car.svg',
      },
      {name: 'Risky drivers', value: riskyDrivers, img: '/images/wheel.svg'},
    ];

    return (
      <div className={container}>
        <div className={labelClass}>DASHBOARD</div>
        <div className={`${mainClass} ${isSix}`}>
          <div className={infoHead}>
            {infosArr.map((obj, key) => (
              <div key={key} className={infoItem}>
                <h3>{obj.name}</h3>
                <div className={bottomItem}>
                  <img src={obj.img} alt=":)" />
                  <h2>{obj.value}</h2>
                </div>
              </div>
            ))}
          </div>
          {cars.map((car, key) => (
            <div key={key} className={styles[`carBox${key + 1}`]}>
              <label className={carName}>
                {car.name}
                {car.overLimit ? (
                  <img src="/images/warning.svg" alt="" />
                ) : (
                  <div />
                )}
              </label>
              <div className={speedMeterCont}>
                <ReactSpeedometer
                  startColor={'#29D3CA'}
                  endColor={'#000000'}
                  height={window.screen.height < 1022 ? 150 : 190}
                  width={window.screen.height < 1022 ? 250 : 300}
                  needleColor={'#FFFFFF'}
                  segments={15}
                  ringWidth={10}
                  textColor="#676C7F"
                  maxValue={16}
                  currentValueText={`${car.speed ? +car.speed : 0} km/h`}
                  value={car.speed ? +car.speed : 0}
                />
              </div>
              <div className={chartCont}>
                <div className={avgSpeed}>
                  <div>AVG.SPEED</div>
                  <b>{car.avgCarSpeed ? car.avgCarSpeed.toFixed(2) : 0} km/h</b>
                </div>
                <div className={graph}>
                  <VictoryLine
                    interpolation="natural"
                    width={1000}
                    height={280}
                    style={{data: {stroke: '#317A73', strokeWidth: 10}}}
                    data={car.history}
                    x="time"
                    y="value"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className={warningBox}>
            <img src="/images/warning.svg" alt="" />
            <div className={warningInfoCont}>
              {warningInfoArr.map((obj, key) => [
                <div className={warningInfo} key={key}>
                  <div>{obj.name}</div>
                  <div className={warningValues}>
                    <img src={obj.img} alt="" />
                    <div>{obj.value}</div>
                  </div>
                </div>,
              ])}
            </div>
          </div>
          <div className={trafficBox}>
            <label>Traffic Overview</label>
            {lanes.map((obj, key) => (
              <div key={key} className={trfBoxCont}>
                <div className={progressCont}>
                  <div>Lane 0{obj.name}</div>
                  <progress value={obj.value} max={cars.length} />
                </div>
                <img src="/images/car.svg" alt=":)" />
                <div className={valueClass}>{obj.value}</div>
              </div>
            ))}
          </div>
          <div className={logBox}>
            {this.state.logs.map((e, key) => <p key={key}>{e}</p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;

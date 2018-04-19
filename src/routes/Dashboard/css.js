import {css} from 'emotion';

export const container = css`
  color: #9699a3;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 5px #2092cb;
  }
`;

export const labelClass = css`
  font-size: xx-large;
  color: #fff;
  margin-bottom: 30px;
  text-transform: capitalize;
`;

export const mainClass = css`
  width: 100%;
  height: calc(100vh - 180px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  display: grid;
  grid-template-rows: 100px repeat(4, 1fr);
  grid-template-columns: repeat(2, 1fr) 0.8fr;
  grid-template-areas:
    'infoHead infoHead  warningBox'
    'carBox1 carBox2  warningBox'
    'carBox1  carBox2 trafficBox'
    'carBox3  carBox4  trafficBox'
    'carBox3  carBox4 logBox';

  &.isSix {
    grid-template-columns: repeat(2, 1fr) 0.8fr;
    grid-template-areas:
      'infoHead infoHead infoHead  warningBox'
      'carBox1 carBox2 carBox3  warningBox'
      'carBox1  carBox2 carBox3 trafficBox'
      'carBox4  carBox5 carBox6  trafficBox'
      'carBox4  carBox5 carBox6 logBox';
  }
`;

export const infoHead = css`
  background: #1f1f1f;
  grid-area: infoHead;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const infoItem = css`
  border-right: solid 1px #3b4054;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  &:last-child {
    border: none;
  }
`;

export const bottomItem = css`
  display: flex;
  img {
    margin-right: 20px;
    width: 50px;
  }
  h2 {
    color: white;
  }
  height: 100px;
  align-items: center;
  justify-content: space-between;
`;

const carBox = css`
  background: #1f1f1f;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const speedMeterCont = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  border-bottom: solid 1px #3b4054;
`;

export const chartCont = css`
  display: flex;
  width: 70%;
  height: 20%;
  justify-content: center;
  align-items: center;
`;

export const avgSpeed = css`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: white;
  word-break: break;
  color: #3a3a3a;
  b {
    color: #fff;
  }
`;

export const graph = css`
  height: 100%;
  width: 100%;
`;

export const carBox1 = css`
  ${carBox};
  grid-area: carBox1;
`;
carBox2;
export const carBox2 = css`
  ${carBox};
  grid-area: carBox2;
`;

export const carBox3 = css`
  ${carBox};
  grid-area: carBox3;
`;

export const carBox4 = css`
  ${carBox};
  grid-area: carBox4;
`;

export const carBox5 = css`
  ${carBox};
  grid-area: carBox5;
`;

export const carBox6 = css`
  ${carBox};
  grid-area: carBox6;
`;

export const trfBoxCont = css`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  display: flex;
`;

export const progressCont = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-transform: uppercase;
  color: white;
  width: 70%;
  progress {
    width: 100%;
  }
  progress[value] {
    -webkit-appearance: none;
    background-color: red;
    height: 3px;
    &::-webkit-progress-value {
      background-image: -webkit-linear-gradient(left, #27cbc2, #0ea481);
    }
  }
`;

export const valueClass = css`
  font-size: large;
  font-weight: 600;
`;

export const warningBox = css`
  background: #1f1f1f;
  color: #fff;
  width: 100%;
  img {
    height: 60%;
    width: 60px;
  }
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  grid-area: warningBox;
`;

export const warningInfoCont = css`
  display: flex;
  justify-content: space-around;
  height: 100%;
  font-size: large;
`;

export const warningInfo = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 10px;
  font-weight: 600;
  height: 70%;
  &:first-child {
    border-right: 1px solid #ffffff1f;
  }
`;

export const warningValues = css`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  font-size: xx-large;
  img {
    height: 50px;
  }
`;

export const trafficBox = css`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
  background: #1f1f1f;
  grid-area: trafficBox;
`;

export const logBox = css`
  background: #1f1f1f;
  grid-area: logBox;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  word-break: break;
  p {
    color: #ffffffAf;
    margin-left: 20px;
  }
  color: white;
`;

export const logCont = css``;

export const carName = css`
  text-align: left;
  position: relative;
  top: 30px;
  left: 30px;
  width: 100%;
  font-weight: 600;
  text-transform: capitalize;
  &.connected {
    color: #32cd32;
  }
`;

import {css} from 'emotion';

export const container = css`
  display: grid;
  width: 100vw;
  overflow-x: hidden;

  height: 100vh;
  grid-template-areas:
    'header header header'
    'main main main'
    'main main main'
    'main main main';
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr;
`;

export const sidebar = css`
  position: fixed;
  width: 200px;
  height: 100vh;
  background-color: #121441;
  box-shadow: 1px 1px 1px 1px #0000005f;
  z-index: 1000000;
  grid-area: sidebar;
`;

export const header = css`
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.15);
  background: #000000;
  border-bottom: solid 1px #ffffff1f;
  grid-area: header;
  height: 60px;
  width: 100vw;
  position: fixed;
`;

export const main = css`
  background: #000000;
  overflow-y: auto;
  padding: 20px;
  grid-area: main;
`;

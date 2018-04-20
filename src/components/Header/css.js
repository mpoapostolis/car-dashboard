import {css} from 'emotion';

export const container = css`
  display: flex;
  user-select: none;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 0 20px;
  color: white;
`;

export const infoButton = css`
  display: flex;
  width: 90px;
  text-transform: capitalize;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`;

export const avatar = css`
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff1f;
  color: #fff;
  font-size: xx-large;
  padding: 3px;
  width: 35px;
  height: 35px;
  &.small {
    width: 25px;
    height: 25px;
    border-radius: 0%;
    background: transparent;
    margin: 0;
    font-size: large;
  }
`;

export const infoBox = css`
  display: flex;
  width: 150px;
  word-break: none;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  height: 100%;
  cursor: pointer;
`;

export const nameLabel = css`
  width: 150px;
  color: #696969;
  font-weight: 600;
`;

export const roleLabel = css`
  width: 120px;
  color: #999;
  font-weight: normal;
`;

export const menuItem = css`
  width: 200px;
  padding: 15px;
  user-select: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  outline: none;
  background: #0e0f2bdf;
  color: white;
  font-weight: 600;
  &:first-child {
    background: #0e0f2baf;
    b {
      text-transform: capitalize;
    }
  }
  cursor: pointer;
`;
export const leftSide = css`
  flex: 1;
  display: flex;
`;

export const rightSide = css`
  flex: 4;
`;

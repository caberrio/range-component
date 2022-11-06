import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RangeContainer = styled.div`
  display: flex;
  width: 300px;
  height: 16px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const RangeController = styled.div<{ left?: boolean; right?: boolean }>`
  width: 16px;
  height: 16px;
  background: black;
  border-radius: 50%;
  cursor: grab;
  position: absolute;
  ${({ left }) => left && 'left: 0;'}
  ${({ right }) => right && 'right: 0;'}
  &:hover {
    transform: scale(1.5);
    transform-origin: center;
  }
  &:active {
    cursor: grabbing;
  }
`;

export const RangeLabel = styled.div`
  padding: 0 10px;
`;

export const RangeLine = styled.div`
  height: 4px;
  width: 100%;
  background: black;
`;

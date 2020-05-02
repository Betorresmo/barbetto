import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #202020;
    padding: 10px;
    color: #ececec;
    font-size: 14px;
    border-radius: 5px;

    position: absolute;
    bottom: calc(100% + 15px);
    left: calc(100% + 10px);
    transform: translateX(-100%);

    opacity: 0;
    visibility: hidden;

    transition: all 200ms ease-in-out;

    &::before {
      content: '';
      border-style: solid;
      border-color: #202020 transparent;
      border-width: 8px 8px 0 8px;
      top: 100%;
      left: calc(100% - 14px);
      transform: translateX(-100%);
      position: absolute;
    }
  }

  &:hover {
    span {
      opacity: 100%;
      visibility: visible;
    }
  }
`;

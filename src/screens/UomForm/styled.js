import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { Images } from "../../constant";

const StyledDiv = styled.div`
  .header {
    /* position: sticky;
    top: 69px; */
    padding-top: 20px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    background: white;
    z-index: 2;

    h2 {
      font-size: 18px;
      color: #ffc401;
    }

    .right {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .required label::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }

  label {
    min-width: 200px;
  }

  .formWrapper {
    /* height: calc(100vh - 200px);
    overflow-y: scroll;
     */
    .loading {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100px;
      }
    }

    .group {
      margin-bottom: 60px;
    }
    .row {
      display: grid;
      grid-template-columns: 48% 48.8%;
      grid-gap: 40px;
    }

    .right input{
      text-align: right;
      padding-right: 30px;
    }

    .normal[disabled] {
        color: rgba(0, 0, 0, 0.85);
        background-color: transparent;
        border: unset;
        box-shadow: none;
        /* cursor: not-allowed; */
        opacity: 1;
        border-bottom: 1px solid black;
      }

      .ant-select-disabled.ant-select:not(.ant-select-customize-input)
        .ant-select-selector {
        color: rgba(0, 0, 0, 0.85);
        background: transparent;
        border: unset;
        box-shadow: none;
        border-bottom: 1px solid black;
        /* cursor: not-allowed; */
      }

      .ant-select-single:not(.ant-select-customize-input) .ant-select-selector::after {
          display: none;
      }
    }
  }

  .submit {
    text-align: right;
  }
`;

export { StyledDiv };

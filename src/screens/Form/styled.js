import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { Images } from "../../constant";

const StyledDiv = styled.div`
  .header {
    /* position: sticky;
    top: 64px; */
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
      text-align: right !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  label {
    min-width: 200px;
  }

  .formWrapper {
    height: calc(100vh - 200px);
    overflow-y: scroll;

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

    .right input[readonly], .right input[disabled]{
      padding-right:10px;
    }

    .right {
      text-align: right !important;
    }

    .edit {
      color: rgba(0, 0, 0, 1);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      box-shadow: none;
      cursor: not-allowed;
      opacity: 1;
    }
    
    .normal[disabled] {
        color: rgba(0, 0, 0, 1);
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

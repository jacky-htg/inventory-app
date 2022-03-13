import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { Images } from "../../constant";

const StyledDiv = styled.div`
  .header {
    position: sticky;
    top: 69px;
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

  label {
    min-width: 120px;
  }

  .formWrapper {
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

    .row2 {
      display: grid;
      grid-template-columns: 30% 30% 30%;
      grid-gap: 30px;

      .ant-form-item-control {
        max-width: 300px !important;
      }
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

        .normal[disabled] .ant-select-disabled.ant-select:not(.ant-select-customize-input)
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

  .detail-wrapper {
    /* background: grey; */
    border-top: 1px dashed black;
    padding: 40px 0px;

    .detail-card {
      position: relative;
      margin-bottom: 10px;

      .row2 {
        grid-template-columns: 32% 32% 32%;
      }

      .dual {
        display: grid;
        grid-template-columns: auto auto;
      }

      .border {
        border-radius: 10px;
        border: 1px solid lightgrey;
        width: 92%;
      }
      
      .Collapsible {
        min-height: 38px;
      }

      .Collapsible__trigger {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        width: 92%;
        font-weight: 400;
        text-decoration: none;
        position: absolute;
        top: 0px;
        left:0px;
        height: 40px;
        background: lightgrey;


        &:after {
          font-family: 'FontAwesome';
          content: '\f107';
          position: absolute;
          right: 10px;
          top: 10px;
          display: block;
          transition: transform 300ms;
        }

        &.is-open {
          border-radius: 10px 10px 0px 0px;
          &:after {
            transform: rotateZ(180deg);
          }
        }

        &.is-disabled {
          opacity: 0.5;
          background-color: grey;
        }
      }

      .inputs {
        margin-top: 30px;
        padding: 20px;
        padding-bottom: 10px;
      }

      label {
        min-width: 50px !important;

      }

      .smallInput {
        max-width: 90% !important;
        input {
          max-width: 90% !important;

        }
      }

      .ant-form-item-control {
        max-width: 90% !important;
      }
      

      .actions {
        position: absolute;
        right: 10px;
        top: 0px;
        bottom: 0px;
        margin-top: auto;
        margin-bottom: auto;
        display: flex;
        align-items: center;
      }
    }

  }

  .submit {
    text-align: right;
  }
`;

export { StyledDiv };

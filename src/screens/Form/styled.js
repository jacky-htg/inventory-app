import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { Images } from "../../constant";

const StyledDiv = styled.div`
  .header {
    position: sticky;
    top: 102px;
    padding-top: 20px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    background: white;
    z-index: 2;

    h2 {
      font-size: 30px;
      color: #1990ff;
    }

    .right {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  label {
    min-width: 200px;
  }

  .formWrapper {
    .group {
      margin-bottom: 60px;
    }
    .row {
      display: grid;
      grid-template-columns: 48% 48.8%;
      grid-gap: 40px;
    }
  }

  .submit {
    text-align: right;
  }
`;

export { StyledDiv };

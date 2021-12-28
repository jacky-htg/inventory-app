import styled from "styled-components";
import { isMobile } from "react-device-detect";

import { Images } from "../../constant";

const StyledDiv = styled.div`
  padding-top: 20px;

  .header {
    position: sticky;
    margin-top: -20px;
    padding-top: 20px;
    top: 102px;
    z-index: 2;
    background: white;
  }
`;

export { StyledDiv };

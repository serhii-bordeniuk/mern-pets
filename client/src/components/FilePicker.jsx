import styled from "@emotion/styled";
import { Box } from "@mui/material";
import fileIcon from "../resources/images/icons/file.svg"

const StyledFilePicker = styled(Box)`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 188px;
    width: 188px;
    border-radius: 100%;
    border: 1px solid #403128;
    cursor: pointer;
`;

const FilePicker = () => {
    return (
        <StyledFilePicker>
            <img src={fileIcon} alt="userImage" />
        </StyledFilePicker>
    );
};
export default FilePicker;

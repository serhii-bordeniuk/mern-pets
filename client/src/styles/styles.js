import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const inputStyles = css`
    width: 100%;
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #403128;
    }

    .MuiInputLabel-root.Mui-focused,
    .MuiInputLabel-root.MuiInputLabel-shrink {
        color: #402835;
    }
`;

export const buttonStyles = css`
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    height: 56px;
    width: 100%;
    background-color: #403128;

    &:hover {
        transform: scale(1.02);
        background-color: #403128;
    }
`;

export const LayoutContainer = styled.div`
    max-width: 1270px;
    margin: 0 auto;
    padding: 0 20px;
    overflow: hidden;
`;

export const FormWrapper = styled(Box)(({isNonMobile}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 0px',
    height: '100%',
    justifyContent: isNonMobile ? 'center' : 'normal'
}));

export const CategoryStyled = styled(Box)`
    width: 80px;
    text-align: center;
`;

export const CategoryTitle = styled(Typography)`
    font-size: 16px;
`;

export const CategoryStyledModal = styled(Box)`
    text-align: center;
    width: 150px;
    border: 2px solid ${(props) => (props.selected ? "#403128" : "transparent")};
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
`;

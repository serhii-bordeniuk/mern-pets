import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
    overflow: hidden
`;

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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

export const StyledSidebarLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    color: black;
    width: 100%;
    height: 69px;
    border-radius: 20px;
    border: none;
    text-decoration: none;
    &:hover {
        background-color: #ffff;
    }
    .MuiSvgIcon-root {
        margin-right: 28px;
        margin-left: 10px;
        width: 53px;
        height: 53px;
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
`;

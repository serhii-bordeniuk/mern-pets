import styled from "@emotion/styled";
import { Box } from "@mui/material";
import fileIcon from "../resources/images/icons/file.svg";
import { useState } from "react";

const StyledFilePicker = styled(Box)`
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 188px;
    width: 188px;
    border-radius: 100%;
    border: 1px solid #403128;
    cursor: pointer;

    input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        clip-path: circle(50%);
    }
`;

const FilePicker = ({ onChange, selectedImage }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            onChange(file);
        }
    };
    return (
        <StyledFilePicker>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg, image/png, image/jpg"
            />
            {previewImage || selectedImage ? (
                <img
                    style={{
                        objectFit: "cover",
                        borderRadius: "100%",
                        width: "100%",
                        height: "100%",
                    }}
                    src={previewImage || `http://localhost:3001/${selectedImage}`}
                    alt="user avatar"
                />
            ) : (
                <img src={fileIcon} alt="placeholder" />
            )}
        </StyledFilePicker>
    );
};
export default FilePicker;

import { Box, Typography, useTheme } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
const InputStyled = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;

const FilePicker = ({ title, attachedFile, handleFileChange }) => {
    const { palette } = useTheme();
    const primary = palette.primary.main;
    const secondary = palette.secondary.main;

    const handleFileOpen = () => {
        if (attachedFile instanceof File) {
            const blob = new Blob([attachedFile], { type: attachedFile.type });
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl);
        } else if (typeof attachedFile === "string") {
            const url = attachedFile.replace(/\\/g, "/");
            window.open(`http://localhost:3001/${url}`);
        }
    };

    return (
        <Box
            position="relative"
            width="196px"
            height="218px"
            border={`1px ${attachedFile ? "solid" : "dashed"} ${primary}`}
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            {!attachedFile && (
                <InputStyled
                    type="file"
                    onChange={(e) => handleFileChange(e, title)}
                    accept="application/pdf"
                />
            )}
            {attachedFile ? (
                <CloseIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFileChange(e, title, true);
                    }}
                    sx={{ position: "absolute", top: "2px", right: "2px", cursor: "pointer" }}
                />
            ) : null}
            {attachedFile ? (
                <Box
                    onClick={() => {
                        handleFileOpen(attachedFile);
                    }}
                    sx={{ backgroundColor: secondary, cursor: "pointer" }}
                    p="48px 60px"
                    borderRadius="10px"
                >
                    <InsertDriveFileIcon sx={{ color: primary }} />
                </Box>
            ) : (
                <UploadFileIcon sx={{ color: primary }} />
            )}
            <Typography variant="h6" mt={attachedFile ? "20px" : null}>
                {title}
            </Typography>
        </Box>
    );
};
export default FilePicker;

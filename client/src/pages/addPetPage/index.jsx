import { Box } from "@mui/material";
import AddPetForm from "./AddPetForm";
import styled from "@emotion/styled";

const StyledAddPetPage = styled(Box)`
    max-width: 789px;
    margin: 0 auto;
`;

const AddPetPage = () => {
    return (
        <StyledAddPetPage>
            <AddPetForm />
        </StyledAddPetPage>
    );
};
export default AddPetPage;

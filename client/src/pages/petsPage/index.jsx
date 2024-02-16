import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ListPlaceholder from "components/ListPlaceholder";
import placeholderImage from "../../resources/images/pet-banner.svg";
import { useEffect, useState } from "react";

const StyledPetsPage = styled(Box)``;

const PetsPage = () => {
    const [isForm, setIsForm] = useState(false);

    const toggleStateSwitcher = () => {
        setIsForm((state) => !state);
    };

    return (
        <div>
            
            {!isForm && (
                <ListPlaceholder
                    title="Create A Personal Profile Of Your Pet"
                    imageSrc={placeholderImage}
                    onClick={toggleStateSwitcher}
                />
            )}
        </div>
    );
};
export default PetsPage;

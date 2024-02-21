import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import ListPlaceholder from "components/ListPlaceholder";
import placeholderImage from "../../resources/images/pet-banner.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PetItem from "components/PetItem";
import FormButton from "components/ui/FormButton";

const PetsPage = () => {
    const token = useSelector((state) => state.auth.token);
    const isNonMobile = useMediaQuery("(min-width:1625px)");
    const { request } = useHttp();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [pets, setPets] = useState([]);
    const primary = palette.primary.main;
    useEffect(() => {
        const fetchedPets = async () => {
            const petsList = await request("http://localhost:3001/pets", {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (petsList) {
                setPets(petsList.pets);
            }
        };
        fetchedPets();
    }, []);

    return (
        <>
            {pets?.length < 1 ? (
                <ListPlaceholder
                    title="Create A Personal Profile Of Your Pet"
                    imageSrc={placeholderImage}
                    onClick={() => navigate("/pets/add-pet")}
                />
            ) : (
                <>
                    <Box mt="20px">
                        <Box
                            mt="50px"
                            display="flex"
                            flexWrap="wrap"
                            justifyContent={isNonMobile ? "space-between" : "space-around"}
                            gap="15px"
                        >
                            {pets.map((item) => {
                                return <PetItem key={item._id} name={item.name} petId={item._id} />;
                            })}
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                            <FormButton
                                sx={{
                                    bottom: "15px",
                                    position: "fixed",
                                    zIndex: "10",
                                    width: "150px",
                                    height: "56px",
                                }}
                                title="Add +"
                                color={primary}
                                onClick={() => navigate("/pets/add-pet")}
                            />
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};
export default PetsPage;

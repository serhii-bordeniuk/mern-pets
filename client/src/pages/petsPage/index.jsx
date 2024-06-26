import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, useTheme } from "@mui/material";
import { CircularProgress } from "@mui/material";
import ListPlaceholder from "components/ListPlaceholder";
import placeholderImage from "../../resources/images/pet-banner.svg";
import PetItem from "components/PetItem";
import FormButton from "components/ui/FormButton";

const PetsPage = () => {
    const token = useSelector((state) => state.auth.token);
    const { request, loading } = useHttp();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [pets, setPets] = useState([]);
    const primary = palette.primary.main;
    useEffect(() => {
        const fetchedPets = async () => {
            const petsList = await request(`${process.env.REACT_APP_BASE_URL}/pets`, {
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
        //eslint-disable-next-line
    }, []);

    return loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    ) : (
        <Box mt="20px" maxWidth="850px" m="auto">
            {pets && pets.length === 0 && (
                <ListPlaceholder
                    title="Create A Personal Profile Of Your Pet"
                    imageSrc={placeholderImage}
                    onClick={() => navigate("/pets/add-pet")}
                />
            )}
            {pets && pets.length > 0 && (
                <>
                    <Box
                        // sx={(theme) => ({[theme.breakpoints.down("sm")]: {flexDirection: "column"}}) }
                        mt="50px"
                        pb="80px"
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap="50px"
                    >
                        {pets.map((item) => {
                            return (
                                <PetItem
                                    key={item._id}
                                    name={item.name}
                                    petId={item._id}
                                    picturepath={item.picturepath}
                                />
                            );
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
                </>
            )}
        </Box>
    );
};
export default PetsPage;

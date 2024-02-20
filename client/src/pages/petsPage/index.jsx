import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { Box, useMediaQuery } from "@mui/material";
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
    const [pets, setPets] = useState([]);
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

    console.log("pets", pets);

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
                    <Box>
                        <FormButton title="Add" color="" />
                    </Box>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent={isNonMobile ? "space-between" : "space-around"}
                        gap="15px"
                        mt="85px"
                    >
                        {pets.map((item) => {
                            return <PetItem key={item._id} name={item.name} petId={item._id} />;
                        })}
                    </Box>
                </>
            )}
        </>
    );
};
export default PetsPage;

import { useEffect, useState } from "react";
import { useHttp } from "utils/useHttp";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ListPlaceholder from "components/ListPlaceholder";
import placeholderImage from "../../resources/images/pet-banner.svg";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PetsPage = () => {
    const token = useSelector((state) => state.auth.token);
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

    return (
        <>
            {pets?.length < 1 ? (
                <ListPlaceholder
                    title="Create A Personal Profile Of Your Pet"
                    imageSrc={placeholderImage}
                    onClick={() => navigate("/pets/add-pet")}
                />
            ) : (
                <p>pets list</p>
            )}
        </>
    );
};
export default PetsPage;

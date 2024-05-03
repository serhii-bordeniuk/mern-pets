import { Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import catImage from "../resources/images/cat-imgae.png";
import { useNavigate } from "react-router-dom";

const PetItem = ({ name, petId, picturepath }) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const primary = palette.primary.main;


    return (
        <Card sx={{ width: 400, height: 300, backgroundColor: primary, color: "#fff" }} onClick={() => navigate(`/pets/${petId}`)}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="250"
              width="400"
              image={picturepath ? `${process.env.REACT_APP_BASE_URL}/${picturepath}` : catImage}
              alt="your pet"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
};
export default PetItem;

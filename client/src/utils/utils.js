import dayjs from "dayjs";
import foodIcon from "../resources/images/icons/food-icon.svg";
import medicineIcon from "../resources/images/icons/medicine-icon.svg";
import entertainmentIcon from "../resources/images/icons/entertainment-icon.svg";
import othersIcon from "../resources/images/icons/others-icon.svg";

export const formatDate = (dateString) => {
    return dayjs(dateString).format("MM/DD/YYYY");
};

export const getYearsOld = (dateString) => {
    const birthDate = dayjs(dateString);
    const currentDate = dayjs();

    const yearsOld = currentDate.diff(birthDate, "year");

    return yearsOld;
};

export const getCategoryIcon = (category) => {
    let iconSrc;
    switch (category) {
        case "food":
            iconSrc = foodIcon;
            break;
        case "medicine":
            iconSrc = medicineIcon;
            break;
        case "entertainment":
            iconSrc = entertainmentIcon;
            break;
        case "others":
            iconSrc = othersIcon;
            break;
        default:
            break;
    }

    return <img width="25px" height="25px" src={iconSrc} alt={`${category} category`} />;
};

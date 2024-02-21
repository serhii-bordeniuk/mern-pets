import dayjs from "dayjs";

export const formatDate = (dateString) => {
    return dayjs(dateString).format("MM/DD/YYYY");
};

export const getYearsOld = (dateString) => {
    const birthDate = dayjs(dateString);
    const currentDate = dayjs();

    const yearsOld = currentDate.diff(birthDate, "year");

    return yearsOld;
};

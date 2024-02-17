import stepIcon from "../../resources/images/icons/step.svg";
import activeStepIcon from "../../resources/images/icons/step-active.svg";

const IconComponent = ({ step, activeStep }) => {
    const isActive = step <= activeStep;
    const iconSrc = isActive ? activeStepIcon : stepIcon;
    return <img src={iconSrc} alt="step" />;
};

export default IconComponent;

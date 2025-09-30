import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PassFormWrapper from "../common/PassFormWrapper";
import SubmitButton from "../common/SubmitButton";
import { requestPass } from "../../services/api";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  vehicleNumber: yup
    .string()
    .required("vehicleNumberRequired")
    .matches(/^[A-Z0-9-]+$/, "vehicleNumberInvalid"),
  vehicleType: yup.string().required("vehicleTypeRequired"),
});

function VehiclePassForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vehicleNumber: "",
      vehicleType: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await requestPass({ type: "Vehicle", ...data });
      alert(t("passRequestSuccess"));
    } catch (error) {
      alert(t("passRequestError"));
    }
  };

  return (
    <PassFormWrapper
      title={t("vehiclePassRequest")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("vehicleNumber")}
        label={t("vehicleNumber")}
        fullWidth
        margin="normal"
        error={!!errors.vehicleNumber}
        helperText={t(errors.vehicleNumber?.message)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>{t("vehicleType")}</InputLabel>
        <Select {...register("vehicleType")} label={t("vehicleType")}>
          <MenuItem value="Car">{t("car")}</MenuItem>
          <MenuItem value="Van">{t("van")}</MenuItem>
          <MenuItem value="Truck">{t("truck")}</MenuItem>
        </Select>
        {errors.vehicleType && (
          <p style={{ color: "red" }}>{t(errors.vehicleType.message)}</p>
        )}
      </FormControl>
      <SubmitButton label={t("submit")} disabled={isSubmitting} />
    </PassFormWrapper>
  );
}
export default VehiclePassForm;

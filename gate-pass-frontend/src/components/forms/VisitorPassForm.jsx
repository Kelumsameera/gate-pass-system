import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import PassFormWrapper from "../common/PassFormWrapper";
import SubmitButton from "../common/SubmitButton";
import { requestPass } from "../../services/api";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  visitorId: yup.string().required("visitorIdRequired"),
  purpose: yup
    .string()
    .required("purposeOfVisitRequired")
    .min(5, "purposeOfVisitMin"),
});

function VisitorPassForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      visitorId: "",
      purpose: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await requestPass({ type: "Visitor", ...data });
      alert(t("passRequestSuccess"));
    } catch (error) {
      alert(t("passRequestError"));
    }
  };

  return (
    <PassFormWrapper
      title={t("visitorPassRequest")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("visitorId")}
        label={t("visitorId")}
        fullWidth
        margin="normal"
        error={!!errors.visitorId}
        helperText={t(errors.visitorId?.message)}
      />
      <TextField
        {...register("purpose")}
        label={t("purposeOfVisit")}
        fullWidth
        margin="normal"
        error={!!errors.purpose}
        helperText={t(errors.purpose?.message)}
      />
      <SubmitButton label={t("submit")} disabled={isSubmitting} />
    </PassFormWrapper>
  );
}
export default VisitorPassForm;

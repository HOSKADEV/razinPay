"use client";
import { useTranslation } from "react-i18next";

const Tutorial = () => {
  const { t } = useTranslation("shared");
  return (
    <div>
      <h4 className="text-xl font-semibold text-primary">
        {t("tutorial.title")}
      </h4>
      <p className="text-gray-500">{t("tutorial.desc")}</p>
      <p className="my-10 border border-destructive p-10 text-center text-4xl font-bold uppercase text-destructive">
        Todo: vedio will be right here
      </p>
    </div>
  );
};

export default Tutorial;

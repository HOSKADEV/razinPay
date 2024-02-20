import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Step5 = () => {
    const {t} = useTranslation("dashboard");
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
  
    const handleClick = (step: number) => {
      const nextStep = step + 1;
      params.set("step", nextStep.toString());
      console.log(params);
    }
  
    return (
      <div className="space-y-16 my-10">
          <div className="">
            <ol className="flex items-center w-full">
            <li className="relative flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                      <Check size={24} />
                  </span>
                  <span className="absolute -bottom-8 right-2 text-primary lg:text-xl">
                      {t("home.start-deal.step-1.name")}
                  </span>
              </li>
              <li className="relative flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                      <Check size={24} />
                  </span>
                  <span className="absolute -bottom-8 right-0 text-primary lg:text-xl">
                      {t("home.start-deal.step-2.name")}
                  </span>
              </li>
              <li className="relative flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                      <Check size={24} />
                  </span>
                  <span className="absolute -bottom-8 -right-4 text-primary tex lg:text-xll">
                      {t("home.start-deal.step-3.name")}
                  </span>
              </li>
              <li className="relative flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                      <Check size={24} />
                  </span>
                  <span className="absolute -bottom-8 right-0 text-primary lg:text-xl">
                      {t("home.start-deal.step-4.name")}
                  </span>
              </li>
              <li className="relative flex items-center text-white">
              <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                    <Check size={24} />
                  </span>
                  <span className="absolute -bottom-8 right-0 text-primary lg:text-xl">
                      {t("home.start-deal.step-5.name")}
                  </span>
              </li>
            </ol>
          </div>
          <div className="w-full rounded-md border border-primary flex justify-between items-center p-10">
              <p>
                {t("home.start-deal.step-5.hint")} 
              </p>
              <div>
              <Button className="w-full" onClick={() => handleClick(Number(params.get("step")))}>
              {t("home.start-deal.step-5.confirm-btn")} 
              </Button>
              </div>
          </div>
      </div>
    );
  };
"use client";

import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import { LoadingOverlay, InlineSpinner } from "../ui/Loading";
import { useTranslations } from "next-intl";
import { PlusIcon } from "@/components/Icons";
import TextareaComponent from "../ui/Textarea";
import { SubmitHandler, useForm, type Resolver } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import snippetService from "@/services/snippets/index";
import { useToast } from "@/hooks/useToast";
interface Inputs {
  title: string;
  language: string;
  topic: string;
  code: string;
}
const schema: yup.ObjectSchema<Inputs> = yup
  .object({
    title: yup.string().required("Title is required"),
    language: yup.string().required("Language is required"),
    topic: yup.string().required("Topics are required"),
    code: yup.string().required("Code is required"),
  })
  .required();

const SnippetCreatePage = ({ onCreated }: { onCreated?: () => void }) => {
  const { success, error } = useToast();
  const t = useTranslations("createSnippet");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as Resolver<Inputs>,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      language: "JavaScript",
      topic: "",
      code: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const res = await snippetService.createSnippet(data);
    if (res.id) {
      success(t("createdSuccess"));
      onCreated?.();
    } else {
      error(res.error);
    }
  };

  return (
    <aside className="relative rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 h-max backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
          {t("title")}
        </h2>
        <p className="text-gray-600 text-sm">{t("subtitle")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="group">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div className="relative">
                <Input
                  label={t("fields.title")}
                  placeholder={t("placeholders.title")}
                  error={errors.title?.message}
                  onClearError={() => clearErrors("title")}
                  className="group-hover:shadow-md transition-all duration-200"
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <div className="group">
          <Controller
            control={control}
            name="topic"
            render={({ field }) => (
              <div className="relative">
                <Input
                  label={t("fields.topics")}
                  placeholder={t("placeholders.topics")}
                  error={errors.topic?.message}
                  onClearError={() => clearErrors("topic")}
                  className="group-hover:shadow-md transition-all duration-200"
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div className="group">
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <div className="relative">
                <Dropdown
                  label={t("fields.language")}
                  options={[
                    "JavaScript",
                    "TypeScript",
                    "Python",
                    "Go",
                    "Java",
                    "C++",
                    "C#",
                    "PHP",
                    "Ruby",
                    "Swift",
                  ]}
                  handleSelect={field.onChange}
                  error={errors.language?.message}
                  onClearError={() => clearErrors("language")}
                  value={field.value || ""}
                  className="group-hover:shadow-md transition-all duration-200"
                />
              </div>
            )}
          />
        </div>
        <div className="group">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <div className="relative">
                <TextareaComponent
                  label={t("fields.code")}
                  rows={8}
                  placeholder={t("placeholders.code")}
                  error={errors.code?.message}
                  onClearError={() => clearErrors("code")}
                  className="group-hover:shadow-md transition-all duration-200 font-mono text-sm"
                  {...field}
                />
                <div className="mt-2 text-xs text-gray-500">
                  {t("hints.code")}
                </div>
              </div>
            )}
          />
        </div>
        <div className="pt-6 border-t border-gray-200/50">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? (
                <InlineSpinner message={t("processing")} />
              ) : (
                <>
                  <PlusIcon className="w-5 h-5" />
                  {t("submit")}
                </>
              )}
            </span>
          </Button>
        </div>
      </form>

      <LoadingOverlay show={isSubmitting} message={t("submitting")} />
    </aside>
  );
};

export default SnippetCreatePage;

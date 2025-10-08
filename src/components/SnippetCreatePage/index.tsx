"use client";

import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import TextareaComponent from "../ui/Textarea";
// import { useToast } from "@/hooks/useToast";
import { SubmitHandler, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface Inputs {
  topic: string;
  language: string;
  tags: string;
  code: string;
}
const schema = yup
  .object({
    topic: yup.string().required("Topic is required"),
    language: yup.string().required("Language is required"),
    tags: yup.string().required("Tags is required"),
    code: yup.string().required("Code is required"),
  })
  .required();

const SnippetCreatePage = () => {
  // const { success } = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      topic: "",
      language: "JavaScript",
      tags: "",
      code: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <aside className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 h-max backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
          Add Snippet
        </h2>
        <p className="text-gray-600 text-sm">
          Create and share your code snippets
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="group">
          <Controller
            control={control}
            name="topic"
            render={({ field }) => (
              <div className="relative">
                <Input
                  label="Topic"
                  placeholder="Enter a descriptive topic"
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
                  label="Programming Language"
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
            name="tags"
            render={({ field }) => (
              <div className="relative">
                <Input
                  label="Tags"
                  placeholder="e.g. sorting, recursion, algorithms"
                  error={errors.tags?.message}
                  onClearError={() => clearErrors("tags")}
                  className="group-hover:shadow-md transition-all duration-200"
                  {...field}
                />
                <div className="mt-2 text-xs text-gray-500">
                  Separate multiple tags with commas
                </div>
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
                  label="Code Snippet"
                  rows={8}
                  placeholder="// Write your code here..."
                  error={errors.code?.message}
                  onClearError={() => clearErrors("code")}
                  className="group-hover:shadow-md transition-all duration-200 font-mono text-sm"
                  {...field}
                />
                <div className="mt-2 text-xs text-gray-500">
                  Use proper indentation and comments for better readability
                </div>
              </div>
            )}
          />
        </div>
        <div className="pt-6 border-t border-gray-200/50">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Snippet
            </span>
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default SnippetCreatePage;

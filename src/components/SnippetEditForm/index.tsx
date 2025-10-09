"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import TextareaComponent from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { InlineSpinner } from "@/components/ui/Loading";
import { useToast } from "@/hooks/useToast";
import { SubmitHandler, useForm, type Resolver } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Inputs {
  title: string;
  language: string;
  topics: string;
  code: string;
}

const schema: yup.ObjectSchema<Inputs> = yup
  .object({
    title: yup.string().required("Title is required"),
    language: yup.string().required("Language is required"),
    topics: yup.string().required("Topics are required"),
    code: yup.string().required("Code is required"),
  })
  .required();

const SnippetEditForm = ({
  id,
  defaultTitle,
  defaultCode,
  defaultLanguage,
  defaultTopics,
  onSuccess,
  onCancel,
}: {
  id: string;
  defaultTitle: string;
  defaultCode: string;
  defaultLanguage?: string;
  defaultTopics?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}) => {
  const { success, error } = useToast();

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
      title: defaultTitle || "",
      language: defaultLanguage || "JavaScript",
      topics: defaultTopics || "",
      code: defaultCode || "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const res = await fetch(`/api/snippets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData = await res.json().catch(() => ({}));
      if (!res.ok) {
        error(responseData?.error || "Update failed");
        return;
      }
      success("Snippet updated");
      onSuccess?.();
    } catch {
      error("Update failed");
    }
  };

  return (
    <aside className="w-full max-w-7xl mx-auto px-6 py-8 mt-10 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
          Edit Snippet
        </h2>
        <p className="text-gray-600 text-sm">Update your code snippet</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="group">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div className="relative">
                <Input
                  label="Title"
                  placeholder="ex: Quick Sort in JavaScript"
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
            name="topics"
            render={({ field }) => (
              <div className="relative">
                <Input
                  label="Topics"
                  placeholder="ex: sorting, algorithm"
                  error={errors.topics?.message}
                  onClearError={() => clearErrors("topics")}
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
                  label="Language"
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
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <InlineSpinner message="Updating..." />
                ) : (
                  <>
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Update Snippet
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default SnippetEditForm;

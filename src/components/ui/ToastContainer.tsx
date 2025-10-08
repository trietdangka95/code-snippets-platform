"use client";

import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useToast, Toast } from "@/contexts/ToastContext";

const ToastItem = ({ toast }: { toast: Toast }) => {
  const { removeToast } = useToast();

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return CheckCircleIcon;
      case "error":
        return XMarkIcon;
      case "warning":
        return ExclamationTriangleIcon;
      case "info":
        return InformationCircleIcon;
      default:
        return CheckCircleIcon;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 text-green-800 ring-green-500/20";
      case "error":
        return "bg-red-50 text-red-800 ring-red-500/20";
      case "warning":
        return "bg-yellow-50 text-yellow-800 ring-yellow-500/20";
      case "info":
        return "bg-blue-50 text-blue-800 ring-blue-500/20";
      default:
        return "bg-gray-50 text-gray-800 ring-gray-500/20";
    }
  };

  const Icon = getIcon();
  const colors = getColors();

  return (
    <Transition
      show={true}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 ${colors}`}
      >
        <div className="p-4 flex items-start">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-current" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{toast.title}</p>
            {toast.description && (
              <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={() => removeToast(toast.id)}
              className="inline-flex rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6 z-[9999]"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};

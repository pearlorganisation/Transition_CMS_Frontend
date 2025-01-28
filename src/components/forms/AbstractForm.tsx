import React, { useState } from "react";
import { IconX } from "@tabler/icons-react";

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

interface AbstractFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  includeFileInput?: boolean;
  fields: FormField[];
  onSubmit: (formData: FormData) => void;
  loading?: boolean;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  file?: File;
  formLabel?: string;

  [key: string]: string | File | undefined;
}

const AbstractForm: React.FC<AbstractFormProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  includeFileInput = false,
  fields,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Record<string, string | File>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      onSubmit(formData as FormData);
    }
  };

  return (
    <dialog id="abstract_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-xl">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <IconX size={20} />
          </button>
        </form>
        <h3 className="font-bold mb-4 md:text-4xl">{title}</h3>
        {subtitle && <p className="mb-4">{subtitle}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="form-control">
              <label className="label" htmlFor={field.id}>
                <span className="label-text font-mono font-medium text-xl">
                  {field.label}
                  {field.required && <span className="text-error">*</span>}
                </span>
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  className="textarea textarea-bordered h-24"
                  placeholder={field.placeholder}
                  onChange={handleInputChange}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="input input-bordered w-full"
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          {includeFileInput && (
            <div className="form-control">
              <label className="label">
                <div className="btn btn-outline btn-success text-lg font-bold">
                  <span className="text-black">Choose file (max 5MB)</span>
                </div>
                <input
                  type="file"
                  className="file-input w-full text-lg [&::file-selector-button]:hidden p-2.5"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
          <button
            type="submit"
            className={`btn btn-block btn-lg bg-secondary text-black hover:bg-primary border-none ${
              loading ? "btn-disabled" : ""
            } `}
          >
            Send
            <span className={`ml-2 ${loading ? "loading loading-spinner" : ""}`}></span>
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default AbstractForm;

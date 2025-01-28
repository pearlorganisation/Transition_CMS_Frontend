"use client";
import React, { useState, useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import AbstractForm, { FormData } from "./AbstractForm";
import { sendEmail } from "../utils/send-email";

interface ClickHereModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AlertProps {
  type: "success" | "error";
  message: string;
}

const Alert: React.FC<AlertProps & { onClose: () => void }> = ({
  type,
  message,
  onClose,
}) => (
  <div className="toast z-50">
    <div className={`alert ${type === "success" ? "alert-success" : "alert-error"} mt-4`}>
      <span>{message}</span>
      <button onClick={onClose} className="btn btn-sm btn-ghost">
        <IconX size={16} />
      </button>
    </div>
  </div>
);

const ClickHereModal: React.FC<ClickHereModalProps> = ({ isOpen, onClose }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "eg.Abdul", required: true },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "eg.info@transitionventurecapital.com",
      required: true,
    },
    {
      id: "phone",
      label: "Contact Number",
      type: "tel",
      placeholder: "eg.9810******",
      required: true,
    },
    {
      id: "message",
      label: "How can we help",
      type: "textarea",
      placeholder: "eg.type your message here...",
    },
  ];

  const handleSubmit = async (formData: FormData) => {
    // Here you would implement your sendEmail function
    // console.log('Form data:', formData);

    // Example of how you might send an email:
    setLoading(true);
    formData.formLabel = "Contact Us";
    try {
      const response = await sendEmail(formData);
      // console.log("response", response);
      if (response) {
        setAlert({ type: "success", message: "Form submitted successfully!" });
        setTimeout(() => {
          setAlert(null);
        }, 10_000);
        onClose();
      } else {
        // console.log("error");
        setAlert({ type: "error", message: "Form submission failed. Please try again." });
        setTimeout(() => {
          setAlert(null);
        }, 10_000);
        onClose();
      }
    } catch (error) {
      setAlert({ type: "error", message: "Form submission failed. Please try again." });
      onClose();
    }

    setLoading(false);
  };

  return (
    <>
      <AbstractForm
        isOpen={isOpen}
        onClose={onClose}
        title="Contact Transition VC"
        subtitle="Learn more about investment opportunities"
        includeFileInput={false}
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
      />
      <div ref={alertRef}>
        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      </div>
    </>
  );
};

export default ClickHereModal;

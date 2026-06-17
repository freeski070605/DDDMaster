"use client";

import { useEffect } from "react";

export function LeadConnectorSubmitDelay({
  formId,
  delayMs = 1200,
}: {
  formId: string;
  delayMs?: number;
}) {
  useEffect(() => {
    const form = document.getElementById(formId);

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const formElement = form;

    function onSubmit(event: SubmitEvent) {
      if (event.target !== formElement) {
        return;
      }

      if (formElement.dataset.leadconnectorDelayedSubmit === "true") {
        return;
      }

      if (!formElement.checkValidity()) {
        return;
      }

      event.preventDefault();
      formElement.dataset.leadconnectorDelayedSubmit = "true";

      window.setTimeout(() => {
        formElement.submit();
      }, delayMs);
    }

    document.addEventListener("submit", onSubmit);

    return () => {
      document.removeEventListener("submit", onSubmit);
    };
  }, [delayMs, formId]);

  return null;
}

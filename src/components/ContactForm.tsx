import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Spinner from "./Spinner";

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;
const CAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_ID; // '6LcxiX4rAAAAAO3uMCcnCU3vnOOEzvpGm3mrkgk1';

/* -------------------------------------------------------------------------- */
/*                               Form schema                                  */
/* -------------------------------------------------------------------------- */

const schema = z.object({
  firstname: z
    .string()
    .nonempty("Please enter your first name")
    .max(60, "Length may not exceed 60 characters."),
  lastname: z
    .string()
    .nonempty("Please enter your last name")
    .max(60, "Length may not exceed 60 characters."),
  organizationname: z
    .string()
    .nonempty("Please enter your organization")
    .max(250, "Length may not exceed 250 characters."),
  email: z
    .string()
    .nonempty("Please enter your email")
    .email("Please enter a valid email address")
    .max(256, "Length may not exceed 256 characters."),
});

export type FormValues = z.infer<typeof schema>;

/* -------------------------------------------------------------------------- */
/*                          Form implementation                               */
/* -------------------------------------------------------------------------- */

function ContactFormInner() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  /**
   * Handle valid form submission.
   */
  const onSubmit = async (data: FormValues) => {
    /* --------------------------- get reCAPTCHA token --------------------------- */
    if (!executeRecaptcha) {
      setMessage("reCAPTCHA is not loaded. Please try again.");
      setIsSuccess(false);
      return;
    }

    let token: string;
    try {
      token = await executeRecaptcha("contact_form_submit");
    } catch {
      setMessage("Failed to get reCAPTCHA token. Please try again.");
      setIsSuccess(false);
      return;
    }

    /* ------------------------------ call backend ------------------------------ */
    try {
      const res = await fetch(`${BASE_URL}website/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webContact: data,
          recaptchaCode: token,
          recaptchaAction: "contact_form_submit",
        }),
      });

      if (!res.ok) {
        let errorText = `Request failed (${res.status}).`;
        try {
          const detail = await res.json();
          if (detail?.message) errorText = detail.message;
        } catch {/* ignore */}

        switch (res.status) {
          case 403:
            errorText = "The reCAPTCHA verification failed. Please refresh and try again.";
            break;
          case 409:
            errorText = "Thanks. We already have this email on file.";
            break;
          case 500:
            errorText = "Whoops – something went wrong on our side. Please try again.";
            break;
        }
        throw new Error(errorText);
      }

      /* --------------------------- success feedback --------------------------- */
      setMessage("Thank you. You will now receive periodic updates!");
      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      let friendlyMessage = "Unexpected error – please try again.";

      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          friendlyMessage = "Server is currently unreachable. Do you have a network connection?";
        } else {
          friendlyMessage = err.message;
        }
      }

      setMessage(friendlyMessage);
      setIsSuccess(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   JSX                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="p-6 bg-slate-100 border rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* FIRST NAME ------------------------------------------------------- */}
        <div>
          <label htmlFor="firstname" className="block pb-1">
            First Name
          </label>
          <input id="firstname" className="bg-white w-full" {...register("firstname")} />
          {errors.firstname && (
            <p className="text-red-500 text-sm pt-1">{errors.firstname.message}</p>
          )}
        </div>

        {/* LAST NAME -------------------------------------------------------- */}
        <div>
          <label htmlFor="lastname" className="block pb-1">
            Last Name
          </label>
          <input id="lastname" className="bg-white w-full" {...register("lastname")} />
          {errors.lastname && (
            <p className="text-red-500 text-sm pt-1">{errors.lastname.message}</p>
          )}
        </div>

        {/* ORG -------------------------------------------------------------- */}
        <div>
          <label htmlFor="organization" className="block pb-1">
            Organization
          </label>
          <input id="organization" className="bg-white w-full" {...register("organizationname")} />
          {errors.organizationname && (
            <p className="text-red-500 text-sm pt-1">
              {errors.organizationname.message}
            </p>
          )}
        </div>

        {/* EMAIL ------------------------------------------------------------ */}
        <div>
          <label htmlFor="email" className="block pb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="bg-white w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm pt-1">{errors.email.message}</p>
          )}
        </div>

        {/* MESSAGE AREA ------------------------------------------------------ */}
        {message && (
          <p
            className={`h-5 text-center font-semibold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? <Spinner size={21} /> : "Send"}
          </button>

        </div>
      </form>
      <p className="mt-4 text-xs text-gray-500 text-center">
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline mx-1">Privacy&nbsp;Policy</a>
        and
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline mx-1">Terms&nbsp;of&nbsp;Service</a>
        apply.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                     Provider wrapper = one React root                      */
/* -------------------------------------------------------------------------- */

export default function ContactFormWithProvider() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={CAPTCHA_SITE_KEY}
      scriptProps={{ async: true, defer: true }}
    >
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
}

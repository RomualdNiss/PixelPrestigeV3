"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types/content";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.enum(["web", "app", "automation", "other"]),
  message: z.string().min(12),
  hp_field: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

type ContactFormProps = {
  locale: "fr" | "en";
  dictionary: Dictionary;
  className?: string;
};

export function ContactForm({ locale, dictionary, className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [startedAt] = useState<number>(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      projectType: "web",
      hp_field: "",
    },
  });

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const labels = useMemo(() => dictionary.form, [dictionary.form]);
  const validation = locale === "fr"
    ? {
        required: "Ce champ est requis.",
        invalidEmail: "Email invalide.",
        shortMessage: "Votre message est trop court.",
      }
    : {
        required: "This field is required.",
        invalidEmail: "Invalid email.",
        shortMessage: "Your message is too short.",
      };

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");

    const elapsedMs = Date.now() - startedAt;

    if (elapsedMs < 2800 || (values.hp_field && values.hp_field.length > 0)) {
      setStatus("error");
      return;
    }

    const parsed = schema.safeParse(values);

    if (!parsed.success || !endpoint) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          locale,
          ts_client: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      reset({
        projectType: "web",
        hp_field: "",
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-5 rounded-3xl border border-white/15 bg-bg-soft/70 p-6 md:p-8", className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <p className="text-sm text-text-muted">{dictionary.contactPage.responseInfo}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>{labels.name}</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
            {...register("name", { required: true })}
            autoComplete="name"
          />
          {errors.name ? <span className="text-xs text-red-300">{validation.required}</span> : null}
        </label>

        <label className="space-y-2 text-sm">
          <span>{labels.email}</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand lg:py-1.5"
            {...register("email", { required: true })}
            autoComplete="email"
            type="email"
          />
          {errors.email ? <span className="text-xs text-red-300">{validation.invalidEmail}</span> : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>{labels.company}</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
            {...register("company")}
            autoComplete="organization"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>{labels.projectType}</span>
          <select
            className="w-full rounded-xl border border-white/15 bg-bg px-3 py-2 text-sm outline-none focus:border-brand"
            {...register("projectType", { required: true })}
          >
            {Object.entries(labels.projectTypes).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span>{labels.message}</span>
        <textarea
          className="min-h-[160px] w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
          {...register("message", { required: true })}
        />
        {errors.message ? <span className="text-xs text-red-300">{validation.shortMessage}</span> : null}
      </label>

      <label className="hidden" aria-hidden>
        Leave empty
        <input type="text" tabIndex={-1} autoComplete="off" {...register("hp_field")} />
      </label>

      <div className="flex flex-wrap items-center gap-3" aria-live="polite">
        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "..." : labels.submit}
        </button>
        {status === "success" ? <span className="text-sm text-emerald-300">{labels.success}</span> : null}
        {status === "error" ? <span className="text-sm text-red-300">{labels.error}</span> : null}
      </div>

      <p className="text-sm text-text-muted">
        {locale === "fr" ? "Si l'envoi echoue, ecrivez a " : "If submission fails, email "}
        <a href={`mailto:${siteConfig.contact.email}`} className="text-white underline decoration-white/30 underline-offset-4">
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </form>
  );
}

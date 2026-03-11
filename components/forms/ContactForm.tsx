"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Dictionary } from "@/types/content";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.enum(["web", "app", "automation", "other"]),
  budget: z.string().optional(),
  message: z.string().min(12),
  hp_field: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

type ContactFormProps = {
  locale: "fr" | "en";
  dictionary: Dictionary;
};

export function ContactForm({ locale, dictionary }: ContactFormProps) {
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
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="space-y-4 rounded-3xl border border-white/15 bg-bg-soft/70 p-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>{labels.name}</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
            {...register("name", { required: true })}
            autoComplete="name"
          />
          {errors.name ? <span className="text-xs text-red-300">{labels.name} requis.</span> : null}
        </label>

        <label className="space-y-2 text-sm">
          <span>{labels.email}</span>
          <input
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
            {...register("email", { required: true })}
            autoComplete="email"
            type="email"
          />
          {errors.email ? <span className="text-xs text-red-300">Email invalide.</span> : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>{labels.company}</span>
          <input className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand" {...register("company")} />
        </label>

        <label className="space-y-2 text-sm">
          <span>{labels.projectType}</span>
          <select className="w-full rounded-xl border border-white/15 bg-bg px-3 py-2 text-sm outline-none focus:border-brand" {...register("projectType", { required: true })}>
            {Object.entries(labels.projectTypes).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span>{labels.budget}</span>
        <input className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand" {...register("budget")} placeholder="5k-10k / 10k-25k / 25k+" />
      </label>

      <label className="space-y-2 text-sm">
        <span>{labels.message}</span>
        <textarea
          className="min-h-[140px] w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
          {...register("message", { required: true })}
        />
        {errors.message ? <span className="text-xs text-red-300">{labels.message} trop court.</span> : null}
      </label>

      <label className="hidden" aria-hidden>
        Leave empty
        <input type="text" tabIndex={-1} autoComplete="off" {...register("hp_field")} />
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "..." : labels.submit}
        </button>
        {status === "success" ? <span className="text-sm text-emerald-300">{labels.success}</span> : null}
        {status === "error" ? <span className="text-sm text-red-300">{labels.error}</span> : null}
      </div>
    </form>
  );
}


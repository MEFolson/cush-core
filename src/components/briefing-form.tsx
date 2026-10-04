import { useState } from "react";
import { roles, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Fields = {
  name: string;
  institution: string;
  role: string;
  email: string;
  corridor: string;
  brief: string;
};

const empty: Fields = {
  name: "",
  institution: "",
  role: roles[0],
  email: "",
  corridor: "",
  brief: "",
};

function referenceId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `CC-${new Date().getFullYear()}-${n}`;
}

export function BriefingForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ id: string; at: string } | null>(null);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!fields.name.trim() || !fields.institution.trim() || !fields.email.trim()) {
      setError("Name, institution and work email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      setError("Enter a valid work email.");
      return;
    }
    const id = referenceId();
    const at = new Date().toISOString();
    const payload = { id, at, ...fields };
    try {
      const prev = JSON.parse(localStorage.getItem("cush-core-briefings") ?? "[]") as unknown[];
      localStorage.setItem("cush-core-briefings", JSON.stringify([payload, ...prev].slice(0, 20)));
    } catch {
      /* ignore quota */
    }
    const subject = encodeURIComponent(`Cush Core briefing · ${fields.institution} · ${id}`);
    const body = encodeURIComponent(
      [
        `Reference: ${id}`,
        `Name: ${fields.name}`,
        `Institution: ${fields.institution}`,
        `Role: ${fields.role}`,
        `Email: ${fields.email}`,
        `Markets: ${fields.corridor || "(not stated)"}`,
        "",
        fields.brief || "A private walk-through of the control plane.",
      ].join("\n"),
    );
    const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;
    const opener = document.createElement("a");
    opener.href = mailto;
    opener.style.display = "none";
    document.body.appendChild(opener);
    opener.click();
    opener.remove();
    setReceipt({ id, at });
  }

  if (receipt) {
    return (
      <div className="border-y border-line bg-paper px-0 py-10 sm:px-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Email draft</p>
        <div className="mt-4 h-px w-10 bg-signal" aria-hidden="true" />
        <h3 className="mt-4 font-display text-3xl font-normal">
          Send the email to complete your request.
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Nothing is stored on our servers yet. Your details stay in this browser and
          in the mail draft that should have opened. Send that message to {site.email}
          so a principal can reply. Keep the reference for your file.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border-t border-line pt-3">
            <dt className="font-mono text-xs tracking-[0.14em] text-muted">Reference</dt>
            <dd className="mt-1 font-mono text-sm">{receipt.id}</dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="font-mono text-xs tracking-[0.14em] text-muted">Institution</dt>
            <dd className="mt-1 text-sm">{fields.institution}</dd>
          </div>
        </dl>
        <Button
          type="button"
          variant="outline"
          className="mt-8"
          onClick={() => {
            setReceipt(null);
            setFields(empty);
          }}
        >
          Prepare another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border-y border-line bg-paper px-0 py-8 sm:px-2">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <Input
            id="name"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </Field>
        <Field label="Institution" htmlFor="institution">
          <Input
            id="institution"
            value={fields.institution}
            onChange={(e) => update("institution", e.target.value)}
            required
          />
        </Field>
        <Field label="Role" htmlFor="role">
          <select
            id="role"
            value={fields.role}
            onChange={(e) => update("role", e.target.value)}
            className="flex h-11 w-full border border-line bg-paper px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Work email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Markets of interest" htmlFor="corridor">
            <Input
              id="corridor"
              placeholder="UK, SEPA, USD correspondent, Singapore FAST"
              value={fields.corridor}
              onChange={(e) => update("corridor", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="What you wish to examine" htmlFor="brief">
            <Textarea
              id="brief"
              placeholder="Core replacement, multi-entity books, correspondent product, sandbox"
              value={fields.brief}
              onChange={(e) => update("brief", e.target.value)}
            />
          </Field>
        </div>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-ink" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Opens your mail client with a draft to {site.email}. Private. Not a public waitlist.
        </p>
        <Button type="submit">Open email draft</Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

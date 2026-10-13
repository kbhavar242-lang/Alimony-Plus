"use client";

import { useState } from "react";

export function Form136View() {
const [form, setForm] = useState({
fullName: "",
caseNumber: "",
monthlyIncome: "",
monthlyExpenses: "",
assets: "",
liabilities: "",
employment: "",
});

function update(
field: keyof typeof form,
value: string
) {
setForm((previous) => ({
...previous,
[field]: value,
}));
}

function downloadDraft() {
const content = [
"FINANCIAL DISCLOSURE - DRAFT",
"",
"Full name: ${form.fullName}",
"Case number: ${form.caseNumber}",
"Employment: ${form.employment}",
"Monthly income: ${form.monthlyIncome}",
"Monthly expenses: ${form.monthlyExpenses}",
"Assets: ${form.assets}",
"Liabilities: ${form.liabilities}",
"",
"Draft only. Verify the applicable official court form before filing.",
].join("\n");

const blob = new Blob([content], {
  type: "text/plain;charset=utf-8",
});
const url = URL.createObjectURL(blob);
const link = document.createElement("a");

link.href = url;
link.download = "financial-disclosure-draft.txt";
link.click();

URL.revokeObjectURL(url);

}

const fields = [
{ key: "fullName", label: "Full name", placeholder: "Enter your full name" },
{ key: "caseNumber", label: "Case number", placeholder: "Enter case number" },
{ key: "employment", label: "Employment / occupation", placeholder: "Enter occupation" },
{ key: "monthlyIncome", label: "Monthly income (₹)", placeholder: "Enter monthly income" },
{ key: "monthlyExpenses", label: "Monthly expenses (₹)", placeholder: "Enter monthly expenses" },
{ key: "assets", label: "Assets and property", placeholder: "Describe assets and property" },
{ key: "liabilities", label: "Loans and liabilities", placeholder: "Describe loans and liabilities" },
] as const;

return (
<main className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-8">
<header>
<p className="text-sm font-medium text-emerald-700">
ALIMONY PLUS / DOCUMENTS
</p>
<h1 className="mt-2 text-3xl font-semibold">
Financial Disclosure
</h1>
<p className="mt-2 text-sm text-gray-500">
Complete the details available to you. This is a draft,
not an official court form.
</p>
</header>

  <section className="space-y-5 rounded-2xl border p-5 md:p-7">
    <h2 className="text-lg font-semibold">
      Personal and financial details
    </h2>

    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((field) => (
        <label
          key={field.key}
          className="block space-y-2"
        >
          <span className="text-sm font-medium">
            {field.label}
          </span>

          <input
            type="text"
            value={form[field.key]}
            onChange={(event) =>
              update(field.key, event.target.value)
            }
            placeholder={field.placeholder}
            className="w-full rounded-lg border px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </label>
      ))}
    </div>

    <div className="flex flex-wrap gap-3 pt-3">
      <button
        type="button"
        onClick={downloadDraft}
        className="rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white"
      >
        Download draft
      </button>

      <button
        type="button"
        onClick={() =>
          setForm({
            fullName: "",
            caseNumber: "",
            monthlyIncome: "",
            monthlyExpenses: "",
            assets: "",
            liabilities: "",
            employment: "",
          })
        }
        className="rounded-lg border px-5 py-3"
      >
        Clear form
      </button>
    </div>
  </section>

  <p className="text-sm text-gray-500">
    Privacy reminder: use demo data while testing. This first
    version does not save entries to a database or generate a
    PDF. Verify all legal details before using a disclosure
    in a real case.
  </p>
</main>

);
}
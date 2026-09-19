"use client"

type ApplicationFormProps = {
  company: string
  position: string
  status: string
  dateApplied: string
  interviewDate: string
  notes: string
  editingId: number | null
  loading: boolean
  error: string
  setCompany: (value: string) => void
  setPosition: (value: string) => void
  setStatus: (value: string) => void
  setDateApplied: (value: string) => void
  setInterviewDate: (value: string) => void
  setNotes: (value: string) => void
  onSave: () => void
  onCancel: () => void
}

export default function ApplicationForm({
  company,
  position,
  status,
  dateApplied,
  interviewDate,
  notes,
  editingId,
  loading,
  error,
  setCompany,
  setPosition,
  setStatus,
  setDateApplied,
  setInterviewDate,
  setNotes,
  onSave,
  onCancel,
}: ApplicationFormProps) {
  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">
        {editingId === null
          ? "Add Application"
          : "Edit Application"}
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Company
          </label>

          <input
            type="text"
            placeholder="e.g. Google"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Position
          </label>

          <input
            type="text"
            placeholder="e.g. Software Engineer"
            value={position}
            onChange={(event) =>
              setPosition(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Date Applied
          </label>

          <input
            type="date"
            value={dateApplied}
            onChange={(event) =>
              setDateApplied(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Interview Date
          </label>

          <input
            type="datetime-local"
            value={interviewDate}
            onChange={(event) =>
              setInterviewDate(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Notes
          </label>

          <textarea
            placeholder="Add any notes about this application..."
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={4}
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <button
          onClick={onSave}
          disabled={loading}
          className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : editingId === null
              ? "Add Application"
              : "Update Application"}
        </button>

        {editingId !== null && (
          <button
            onClick={onCancel}
            className="ml-2 rounded border px-5 py-3 text-gray-900"
          >
            Cancel
          </button>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

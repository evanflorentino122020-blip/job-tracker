"use client"

import { useState } from "react"

type Application = {
  id: number
  company: string
  position: string
  status: string
  date_applied: string
  interview_date: string | null
  notes: string | null
}

type ApplicationListProps = {
  applications: Application[]
  onEdit: (application: Application) => void
  onDelete: (applicationId: number) => void
  loading: boolean
}

export default function ApplicationList({
  applications,
  onEdit,
  onDelete,
  loading,
}: ApplicationListProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortOrder, setSortOrder] = useState("Newest")

  function getStatusClass(status: string) {
    if (status === "Applied") {
      return "bg-blue-100 text-blue-800"
    }

    if (status === "Interview") {
      return "bg-yellow-100 text-yellow-800"
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-800"
    }

    if (status === "Offer") {
      return "bg-green-100 text-green-800"
    }

    if (status === "Accepted") {
      return "bg-purple-100 text-purple-800"
    }

    return "bg-gray-100 text-gray-800"
  }

  const filteredApplications = applications
    .filter((application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.position
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = new Date(a.date_applied).getTime()
      const dateB = new Date(b.date_applied).getTime()

      if (sortOrder === "Newest") {
        return dateB - dateA
      }

      return dateA - dateB
    })

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">
        Applications
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Search
          </label>

          <input
            type="text"
            placeholder="Search company or position..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Filter by Status
          </label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Sort by Date
          </label>

          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          >
            <option value="Newest">
              Newest First
            </option>

            <option value="Oldest">
              Oldest First
            </option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="rounded border bg-white p-4"
          >
            <h3 className="font-semibold text-gray-900">
              {application.company}
            </h3>

            <p className="text-gray-700">
              {application.position}
            </p>

            <div className="mt-2">
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(application.status)}`}
              >
                {application.status}
              </span>
            </div>

            <p className="mt-2 text-gray-700">
              Date Applied: {application.date_applied}
            </p>

            <p className="text-gray-700">
              Interview Date:{" "}
              {application.interview_date ?? "None"}
            </p>

            <p className="text-gray-700">
              Notes: {application.notes ?? "None"}
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onEdit(application)}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(application.id)
                }
                disabled={loading}
                className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <p className="text-gray-600">
            No applications found.
          </p>
        )}
      </div>
    </div>
  )
}

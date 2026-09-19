"use client"

import { useEffect, useState } from "react"


import LoginForm from "../components/LoginForm"
import Stats from "../components/Stats"
import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Application = {
  id: number
  company: string
  position: string
  status: string
  date_applied: string
  interview_date: string | null
  notes: string | null
}

export default function Home() {
  const [token, setToken] = useState("")
  const [applications, setApplications] = useState<Application[]>([])

  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [status, setStatus] = useState("Applied")
  const [dateApplied, setDateApplied] = useState("")
  const [interviewDate, setInterviewDate] = useState("")
  const [notes, setNotes] = useState("")

  const [editingId, setEditingId] = useState<number | null>(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")

    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useEffect(() => {
    if (token === "") {
      return
    }

    getApplications()
  }, [token])

  async function getApplications() {
    try {
      const response = await fetch(
        `${API_URL}/applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.detail || "Failed to load applications"
        )
        return
      }

      setApplications(data)
    } catch {
      setError("Could not connect to the backend")
    }
  }

  async function login(
    email: string,
    password: string
  ) {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || "Login failed")
        return
      }

      setToken(data.access_token)
      localStorage.setItem(
        "token",
        data.access_token
      )
    } catch {
      setError("Could not connect to the backend")
    } finally {
      setLoading(false)
    }
  }

  async function register(
  email: string,
  password: string
) {
  setLoading(true)
  setError("")

  try {
    const response = await fetch(
      `${API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.detail || "Registration failed")
      return
    }

    // Automatically log the user in after registration
    await login(email, password)
  } catch {
    setError("Could not connect to the backend")
  } finally {
    setLoading(false)
  }
}

  function logout() {
    localStorage.removeItem("token")
    setToken("")
    setApplications([])
    setError("")
  }

  function resetForm() {
    setCompany("")
    setPosition("")
    setStatus("Applied")
    setDateApplied("")
    setInterviewDate("")
    setNotes("")
    setEditingId(null)
    setError("")
  }

  async function saveApplication() {
    if (editingId === null) {
      await addApplication()
    } else {
      await updateApplication(editingId)
    }
  }

  async function addApplication() {
    setLoading(true)
    setError("")

    if (dateApplied === "") {
      setError("Please enter the date you applied")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company: company,
            position: position,
            status: status,
            date_applied: `${dateApplied}T00:00:00`,
            interview_date:
              interviewDate === ""
                ? null
                : interviewDate,
            notes: notes === "" ? null : notes,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.detail || "Failed to add application"
        )
        return
      }

      resetForm()
      await getApplications()
    } catch {
      setError("Could not connect to the backend")
    } finally {
      setLoading(false)
    }
  }

  async function updateApplication(
    applicationId: number
  ) {
    setLoading(true)
    setError("")

    if (dateApplied === "") {
      setError("Please enter the date you applied")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/applications/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company: company,
            position: position,
            status: status,
            date_applied: `${dateApplied}T00:00:00`,
            interview_date:
              interviewDate === ""
                ? null
                : interviewDate,
            notes: notes === "" ? null : notes,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.detail || "Failed to update application"
        )
        return
      }

      resetForm()
      await getApplications()
    } catch {
      setError("Could not connect to the backend")
    } finally {
      setLoading(false)
    }
  }

  async function deleteApplication(
    applicationId: number
  ) {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `${API_URL}/applications/${applicationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(
          data.detail || "Failed to delete application"
        )
        return
      }

      await getApplications()
    } catch {
      setError("Could not connect to the backend")
    } finally {
      setLoading(false)
    }
  }

  function editApplication(
    application: Application
  ) {
    setCompany(application.company)
    setPosition(application.position)
    setStatus(application.status)

    setDateApplied(
      application.date_applied
        ? application.date_applied.slice(0, 10)
        : ""
    )

    setInterviewDate(
      application.interview_date
        ? application.interview_date.slice(0, 16)
        : ""
    )

    setNotes(application.notes ?? "")
    setEditingId(application.id)
    setError("")
  }

  const totalApplications = applications.length

  const appliedCount = applications.filter(
    (application) =>
      application.status === "Applied"
  ).length

  const interviewCount = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length

  const offerCount = applications.filter(
    (application) =>
      application.status === "Offer"
  ).length

  const acceptedCount = applications.filter(
    (application) =>
      application.status === "Accepted"
  ).length

  const rejectedCount = applications.filter(
    (application) =>
      application.status === "Rejected"
  ).length

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Job Tracker
        </h1>

        <p className="mt-2 text-gray-700">
          Track your job applications in one place.
        </p>

        {!token && (
          <LoginForm
            onLogin={login}
            onRegister={register}
            loading={loading}
            error={error}
          />
        )}

        {token && (
          <>
            <div className="mt-8 rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Welcome back
                </h2>

                <button
                  onClick={logout}
                  className="rounded border px-5 py-3 text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>

            <Stats
              totalApplications={
                totalApplications
              }
              appliedCount={appliedCount}
              interviewCount={interviewCount}
              offerCount={offerCount}
              acceptedCount={acceptedCount}
              rejectedCount={rejectedCount}
            />

            <ApplicationForm
              company={company}
              position={position}
              status={status}
              dateApplied={dateApplied}
              interviewDate={interviewDate}
              notes={notes}
              editingId={editingId}
              loading={loading}
              error={error}
              setCompany={setCompany}
              setPosition={setPosition}
              setStatus={setStatus}
              setDateApplied={setDateApplied}
              setInterviewDate={
                setInterviewDate
              }
              setNotes={setNotes}
              onSave={saveApplication}
              onCancel={resetForm}
            />

            <ApplicationList
              applications={applications}
              onEdit={editApplication}
              onDelete={deleteApplication}
              loading={loading}
            />
          </>
        )}
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"

type LoginFormProps = {
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (email: string, password: string) => Promise<void>
  loading: boolean
  error: string
}

export default function LoginForm({
  onLogin,
  onRegister,
  loading,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [registering, setRegistering] = useState(false)

  async function handleSubmit() {
    if (registering) {
      if (password !== confirmPassword) {
        return
      }

      await onRegister(email, password)
    } else {
      await onLogin(email, password)
    }

    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">
        {registering ? "Create Account" : "Login"}
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">
            Password
          </label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="w-full rounded border p-3 text-gray-900"
          />
        </div>

        {registering && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              className="w-full rounded border p-3 text-gray-900"
            />

            {confirmPassword !== "" &&
              password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  Passwords do not match
                </p>
              )}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading
            ? registering
              ? "Creating account..."
              : "Logging in..."
            : registering
              ? "Register"
              : "Login"}
        </button>

        <button
          type="button"
          onClick={() => {
            setRegistering(!registering)
            setEmail("")
            setPassword("")
            setConfirmPassword("")
          }}
          className="block text-sm text-blue-600 hover:underline"
        >
          {registering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}


"use client"

type StatsProps = {
  totalApplications: number
  appliedCount: number
  interviewCount: number
  offerCount: number
  acceptedCount: number
  rejectedCount: number
}

export default function Stats({
  totalApplications,
  appliedCount,
  interviewCount,
  offerCount,
  acceptedCount,
  rejectedCount,
}: StatsProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-sm text-gray-600">
          Total Applications
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {totalApplications}
        </p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-sm text-gray-600">
          Applied
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {appliedCount}
        </p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-sm text-gray-600">
          Interviews
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {interviewCount}
        </p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-sm text-gray-600">
          Offers
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {offerCount}
        </p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-sm text-gray-600">
          Accepted
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {acceptedCount}
        </p>
      </div>

      <div className="rounded-lg bg-white p-5 shadow">
        <p className="text-sm text-gray-600">
          Rejected
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {rejectedCount}
        </p>
      </div>
    </div>
  )
}

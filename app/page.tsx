export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-28">
      {/* Hero */}
      <section className="text-center bg-purple-50 p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6">
          Know What Your Code Impacts — Before You Merge
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          ImpactLens gives developers clear, instant insights into the ripple effects of their pull requests. Avoid surprises in production.
        </p>
        <a
          href="/pricing"
          className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Start for Free
        </a>
      </section>

      {/* Problem–Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-purple-50 p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Merging blind? You’re not alone.
          </h2>
          <p className="text-gray-700 mb-6">
            Most teams lack visibility into what a PR actually changes across the system. Manual reviews miss hidden dependencies and risk.
          </p>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>No impact visualization</li>
            <li>Hard-to-track regressions</li>
            <li>Slow, error-prone reviews</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">ImpactLens Solution</h3>
          <p className="text-gray-700">
            Analyze, visualize and communicate code impact effortlessly.
            Empower your team to ship confidently.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-purple-50 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Change Graph</h3>
            <p className="text-gray-600">
              Visualize dependencies touched by each pull request in seconds.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2">Risk Alerts</h3>
            <p className="text-gray-600">
              Identify unstable modules, legacy code, or under-tested areas automatically.
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">📣</div>
            <h3 className="text-xl font-semibold mb-2">PR Summaries</h3>
            <p className="text-gray-600">
              Get auto-generated summaries your team actually reads and understands.
            </p>
          </div>
        </div>
      </section>

      {/* Use Case / Demo */}
      <section className="text-center bg-purple-50 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Know your code’s impact in one glance.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          "A backend PR changed 6 files. ImpactLens detected its effect on 2 services, 4 modules, and flagged 1 deprecated API."
        </p>
        <div className="bg-white p-6 rounded-lg shadow">
          <code className="text-purple-800 font-mono">
            🔍   services/user → modules/auth → analytics/logging
          </code>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-purple-50 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          Why Teams Choose ImpactLens
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h4 className="font-semibold text-lg text-purple-700 mb-2">Faster Reviews</h4>
            <p className="text-gray-600">
              Focus on meaningful changes and skip guesswork.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-purple-700 mb-2">Fewer Bugs</h4>
            <p className="text-gray-600">
              Spot downstream risks before they reach production.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-purple-700 mb-2">Smarter Planning</h4>
            <p className="text-gray-600">
              Make roadmap decisions backed by real dependency data.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center bg-blue-50 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Start shipping safer code today.
        </h2>
        <p className="text-gray-600 mb-6">
          Trusted by dev teams who want clarity, not chaos.
        </p>
        <a
          href="/pricing"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-10 py-4 rounded-lg transition"
        >
          Explore Plans
        </a>
      </section>
    </div>
  );
}

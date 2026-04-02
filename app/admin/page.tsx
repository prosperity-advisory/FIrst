import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();

  const { data: pages } = await supabase
    .from("pages")
    .select("id, slug, title, is_published, sort_order")
    .order("sort_order");

  const { count: sectionCount } = await supabase
    .from("sections")
    .select("id", { count: "exact", head: true });

  const totalPages = pages?.length ?? 0;
  const publishedPages = pages?.filter((p) => p.is_published).length ?? 0;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/pages"
          className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all group"
        >
          <div className="text-2xl font-bold text-gray-900">{totalPages}</div>
          <div className="text-sm text-gray-500 mt-0.5 group-hover:text-blue-600 transition-colors">
            Total Pages
          </div>
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-2xl font-bold text-gray-900">
            {publishedPages}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">Published</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-2xl font-bold text-gray-900">
            {sectionCount ?? 0}
          </div>
          <div className="text-sm text-gray-500 mt-0.5">Total Sections</div>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <Link
          href="/admin/pages"
          className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-current fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              Manage Pages
            </div>
            <div className="text-xs text-gray-500">
              Edit content and sections
            </div>
          </div>
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-current fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
              Site Settings
            </div>
            <div className="text-xs text-gray-500">
              Header, footer, CTA defaults
            </div>
          </div>
        </Link>
      </div>

      {/* Recent pages */}
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
        Recent Pages
      </h2>
      <div className="space-y-2">
        {pages?.slice(0, 5).map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/${page.slug || "_home"}`}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-3.5 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div className="min-w-0">
              <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {page.title}
              </span>
              <span className="text-xs text-gray-400 font-mono ml-2">
                /{page.slug || "(home)"}
              </span>
            </div>
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-gray-300 group-hover:text-gray-500 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-colors shrink-0"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
        {(pages?.length ?? 0) > 5 && (
          <Link
            href="/admin/pages"
            className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2 transition-colors"
          >
            View all {pages?.length} pages
          </Link>
        )}
      </div>
    </div>
  );
}

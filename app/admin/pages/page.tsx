import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function PagesListPage() {
  const supabase = await createSupabaseServerClient();

  const { data: pages } = await supabase
    .from("pages")
    .select("id, slug, title, is_published, sort_order")
    .order("sort_order");

  const { count: sectionCount } = await supabase
    .from("sections")
    .select("id", { count: "exact", head: true });

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Pages</h1>
        <span className="text-sm text-gray-500">
          {pages?.length ?? 0} pages &middot; {sectionCount ?? 0} sections
        </span>
      </div>

      <div className="space-y-2">
        {pages?.map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/${page.slug || "_home"}`}
            className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 stroke-current fill-none stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {page.title}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  /{page.slug || "(home)"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                  page.is_published
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    page.is_published ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                {page.is_published ? "Published" : "Draft"}
              </span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gray-300 group-hover:text-gray-500 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round] transition-colors"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

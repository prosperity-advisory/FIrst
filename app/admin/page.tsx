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
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-2xl font-bold text-gray-900">{totalPages}</div>
          <div className="text-sm text-gray-500 mt-0.5">Total Pages</div>
        </div>
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

      {/* Pages table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Pages</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-5 py-3 font-medium text-gray-500">Title</th>
                <th className="px-5 py-3 font-medium text-gray-500">Slug</th>
                <th className="px-5 py-3 font-medium text-gray-500">Status</th>
                <th className="px-5 py-3 font-medium text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pages?.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {page.title}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">
                    /{page.slug || "(home)"}
                  </td>
                  <td className="px-5 py-3.5">
                    <PublishBadge published={page.is_published} pageId={page.id} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PublishBadge({
  published,
}: {
  published: boolean;
  pageId: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
        published
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          published ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      {published ? "Published" : "Draft"}
    </span>
  );
}

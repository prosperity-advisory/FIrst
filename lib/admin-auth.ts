import { createSupabaseServerClient } from "@/lib/supabase-server";
import { assertAdminAuthorization } from "@/lib/admin-authorization";

/** Server action guard. The same database function is used by middleware and
 * RLS policies so the UI, server mutations, and database share one rule. */
export async function requireProsperityPressAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Unauthorized");

  const { data, error } = await supabase.rpc(
    "is_prosperity_press_admin"
  );
  assertAdminAuthorization(user, data, error);
  return supabase;
}

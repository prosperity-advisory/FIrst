export function adminAuthorizationGranted(
  user: unknown,
  result: unknown,
  error: unknown
): boolean {
  return user !== null && user !== undefined && !error && result === true;
}

export function assertAdminAuthorization(
  user: unknown,
  result: unknown,
  error: unknown
): void {
  if (!adminAuthorizationGranted(user, result, error)) {
    throw new Error("Unauthorized");
  }
}

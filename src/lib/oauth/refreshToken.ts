/**
 * Resolve effective project ID from refresh token or credentials
 * Priority: managedProjectId > projectId > defaultProjectId
 *
 * @param refreshToken - Refresh token in format "actualToken|projectId|managedProjectId"
 * @param defaultProjectId - Default project ID to use as fallback
 * @returns The effective project ID
 */
export function resolveEffectiveProjectId(
  refreshToken: string | undefined,
  defaultProjectId: string
): string {
  if (!refreshToken) {
    return defaultProjectId;
  }

  // Parse refresh token format: "actualToken|projectId|managedProjectId"
  const parts = refreshToken.split("|");
  
  // Priority: managedProjectId (3rd part) > projectId (2nd part) > default
  if (parts.length >= 3 && parts[2]) {
    return parts[2].trim();
  }
  
  if (parts.length >= 2 && parts[1]) {
    return parts[1].trim();
  }

  return defaultProjectId;
}

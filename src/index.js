import assert from "node:assert";
import SemVer from "semver/classes/semver.js";

/**
 * @param {string} name
 * @return {Promise<string|null>}
 */
async function getLatestVersion(name) {
  const res = await fetch(`https://registry.npmjs.org/${name}/latest`);
  if (res.status !== 200) {
    return null;
  }
  const data = await res.json();
  return data?.version ?? null;
}

/**
 * @param {string} packageName
 * @param {string} version
 * @return {Promise<string>}
 */
export async function guessDistTag(packageName, version) {
  const latest = await getLatestVersion(packageName);
  return guessDistTagWithLatest(version, latest);
}

/**
 * @param {string} versionStr
 * @param {string|null} latestVersionStr
 * @return {string} distTag like `latest`, `next` or `latest-1`
 */
export function guessDistTagWithLatest(versionStr, latestVersionStr) {
  assert(typeof versionStr === "string");
  if (latestVersionStr == null) {
    return "latest";
  }
  assert(typeof latestVersionStr === "string");
  const pkgVer = new SemVer(versionStr);
  const latestVer = new SemVer(latestVersionStr);
  if (pkgVer.compare(latestVer) > 0) {
    if (pkgVer.prerelease.length > 0) {
      return "next";
    } else {
      return "latest";
    }
  } else if (versionStr === latestVersionStr) {
    throw new TypeError(`The version "${versionStr}" is already published.`);
  } else if (pkgVer.major === latestVer.major) {
    throw new TypeError(
      `The version "${versionStr}" is lower than the latest version "${latestVersionStr}".`,
    );
  } else {
    if (pkgVer.prerelease.length > 0) {
      return `next-${pkgVer.major}`;
    } else {
      return `latest-${pkgVer.major}`;
    }
  }
}

# npm Trusted Publishing Setup - Complete Guide

**Package:** `@crashbytes/contentful-richtext-editor`  
**Version:** v3.0.0  
**Published:** January 14, 2026  
**Status:** ✅ Successfully Published with OIDC

---

## 🎯 What Was Accomplished

### 1. **Code Upgrades (v2.0.6 → v3.0.0)**
- ✅ Tiptap upgraded from v2.27.2 → v3.15.3
- ✅ All breaking changes fixed
- ✅ 175 tests passing
- ✅ Zero vulnerabilities (npm audit clean)
- ✅ React 18 & 19 compatible

### 2. **Security Infrastructure**
- ✅ npm Trusted Publishing configured (OIDC authentication)
- ✅ Cryptographic provenance enabled (Sigstore)
- ✅ Automated security audits (weekly)
- ✅ Dependabot dependency updates
- ✅ CodeQL code scanning
- ✅ React compatibility matrix testing

### 3. **CI/CD Automation**
- ✅ Automated release workflow
- ✅ GitHub Releases auto-created
- ✅ Provenance attestations included
- ✅ Zero manual token management

---

## 🔐 npm Trusted Publisher Configuration

**URL:** https://www.npmjs.com/package/@crashbytes/contentful-richtext-editor/settings

**Settings:**
```
Publisher: GitHub Actions
Organization: CrashBytes
Repository: contentful-richtext-editor
Workflow filename: release.yml
Environment name: (blank)
Publishing access: Require 2FA and disallow tokens ✅
```

**Critical Notes:**
- ⚠️ Organization name is case-sensitive: `CrashBytes` (not `crashbytes`)
- ⚠️ Environment name must be blank unless using GitHub Environments
- ⚠️ Workflow filename must match exactly: `release.yml`

---

## 📋 Workflow Configuration

**File:** `.github/workflows/release.yml`

**Minimal OIDC Setup:**
```yaml
permissions:
  contents: write  # For GitHub Releases
  id-token: write  # For npm OIDC (REQUIRED)

- uses: actions/setup-node@v4
  with:
    node-version: '20'
    # NO registry-url needed!

- run: npm install -g npm@latest  # >= 11.5.1 required

- run: npm publish --provenance --access public
  # OIDC authentication automatic - no tokens!
```

**Key Requirements:**
1. `id-token: write` permission (enables OIDC)
2. npm >= 11.5.1 (supports Trusted Publishing)
3. No `registry-url` in setup-node (prevents .npmrc conflicts)
4. No `NODE_AUTH_TOKEN` environment variable
5. Trigger via tag push (not workflow_dispatch for best compatibility)

---

## 🚀 Release Process

### Publishing New Versions

```bash
# 1. Update version
npm version [patch|minor|major]

# 2. Update CHANGELOG.md with release notes

# 3. Commit and tag
git commit -am "chore: release vX.Y.Z"
git tag vX.Y.Z
git push origin main && git push origin vX.Y.Z

# 4. GitHub Actions automatically:
#    - Builds and tests
#    - Publishes to npm with provenance
#    - Creates GitHub Release
#    - Publishes attestation to Sigstore
```

**No manual steps! No tokens! Complete automation!** 🎉

---

## 🔍 Verification

### Check Package Version
```bash
npm view @crashbytes/contentful-richtext-editor version
# Output: 3.0.0
```

### Verify Provenance
```bash
npm view @crashbytes/contentful-richtext-editor dist.integrity
# Or visit: https://search.sigstore.dev/?logIndex=820816971
```

### Check GitHub Release
https://github.com/CrashBytes/contentful-richtext-editor/releases/tag/v3.0.0

### Verify Badges
All security badges in README should show passing status:
- npm Audit
- Dependency Review
- CodeQL
- React 18 Compatibility
- React 19 Compatibility
- npm Provenance

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** `ENEEDAUTH` error during publish
**Causes:**
1. npm CLI version < 11.5.1
2. Environment name mismatch in Trusted Publisher config
3. Organization name case mismatch (CrashBytes vs crashbytes)
4. Workflow filename doesn't match exactly

**Solution:** Verify all settings match exactly as documented above

---

**Issue:** `404 Not Found` error during publish
**Causes:**
1. Trusted Publisher not configured on npmjs.com
2. OIDC token validation failed (wrong org/repo/workflow)

**Solution:** Double-check npm Trusted Publisher settings

---

**Issue:** Provenance signing works but publish fails
**Causes:**
1. Environment name field not blank (most common!)
2. Workflow triggered via workflow_dispatch instead of tag push

**Solution:** Clear environment name field, trigger via tag push

---

## 📚 Resources

- [npm Trusted Publishing Docs](https://docs.npmjs.com/trusted-publishers/)
- [GitHub OIDC Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Sigstore Transparency Log](https://search.sigstore.dev/)
- [Package on npm](https://www.npmjs.com/package/@crashbytes/contentful-richtext-editor)
- [GitHub Repository](https://github.com/CrashBytes/contentful-richtext-editor)

---

## 🎓 Key Learnings

1. **Case Sensitivity Matters:** GitHub org names are case-sensitive in OIDC tokens
2. **Environment Name Field:** Must be blank unless using GitHub Environments
3. **npm CLI Version:** Must be >= 11.5.1 for Trusted Publishing
4. **No registry-url:** Prevents .npmrc conflicts with OIDC
5. **Tag Push Preferred:** More reliable than workflow_dispatch for OIDC

---

**Setup Date:** January 14, 2026  
**Engineer:** Michael Eakins (CrashBytes)  
**Status:** Production Ready ✅

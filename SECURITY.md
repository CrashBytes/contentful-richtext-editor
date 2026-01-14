# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| 2.x.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of `@crashbytes/contentful-richtext-editor` seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1. **Email**: Send details to security@crashbytes.com
2. **GitHub Security Advisories**: Use the [GitHub Security Advisory](https://github.com/CrashBytes/contentful-richtext-editor/security/advisories/new) feature

### What to Include

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours of receiving your report
- **Confirmation**: Within 5 business days, we'll confirm the vulnerability and determine its severity
- **Fix Timeline**: Critical vulnerabilities will be patched within 7 days; others within 30 days
- **Public Disclosure**: After the fix is released, we'll coordinate disclosure with you

### Security Update Process

1. We investigate and validate the reported vulnerability
2. We develop and test a fix on a private branch
3. We prepare a security advisory
4. We release a patch version
5. We publish the security advisory
6. We credit the reporter (unless they prefer to remain anonymous)

### Bug Bounty Program

We currently do not offer a paid bug bounty program, but we:
- Publicly acknowledge security researchers (with permission)
- Add contributors to our Hall of Fame in the repository
- Provide early access to new features when requested

## Security Best Practices for Users

When using this package:

1. **Keep Updated**: Always use the latest version to get security patches
2. **Review Dependencies**: Regularly audit your dependency tree
3. **Content Security**: Sanitize user-generated content before passing to the editor
4. **Access Control**: Implement proper authentication/authorization in your app
5. **CSP Headers**: Configure Content Security Policy headers appropriately

## Known Security Considerations

### XSS Prevention

This package renders rich text content. Always:
- Sanitize content from untrusted sources before passing to the editor
- Validate and sanitize content before persisting to your backend
- Use Contentful's built-in sanitization features

### Dependency Security

We use:
- Automated dependency scanning via Dependabot
- Regular security audits in CI/CD pipeline
- npm audit in our release process
- Trusted Publishing for secure package distribution

## Security Audit History

| Date       | Finding | Severity | Status   |
|------------|---------|----------|----------|
| 2026-01-14 | Initial security audit | N/A | ✅ Clean |

## Contact

For security concerns or questions:
- Email: security@crashbytes.com
- Security Advisory: [GitHub Security Advisories](https://github.com/CrashBytes/contentful-richtext-editor/security/advisories)

---

Last Updated: January 14, 2026

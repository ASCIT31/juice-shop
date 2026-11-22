# Darkmoon Remediation Pull Requests — OWASP Juice Shop

> **Category:** `INTERNAL_REMEDIATION_DEMO_PRS`. These pull requests are **internal** to `ASCIT31/juice-shop` (a standalone MIT copy of OWASP Juice Shop v19.2.1), used as a demonstration target for Darkmoon. They are **not** external contributions and were never proposed to the upstream project.

> **Correction (2026-11-22).** An earlier version of this page claimed that « 42 of 57 findings are demonstrated end-to-end » (fix, compile, live exploit retest, PR) and gave a per-PR retest matrix. That figure is **withdrawn**: no published record supports it. Read the [correction section](#correction-2026-11-22) at the end of this page.

**Related:** the finding and proof engine is open source at [Darkmoon autonomous AI penetration testing](https://github.com/ASCIT31/Dark-Moon); remediation to pull request is a Darkmoon Pro (paid) feature. The run these PRs come from, with its corrections and updates, is documented on [ASCIT31/Darkmoon-Benchmarks, `runs/juice-shop-2026-04-26.md`](https://github.com/ASCIT31/Darkmoon-Benchmarks/blob/main/runs/juice-shop-2026-04-26.md) and summarised on [dark-moon.org/remediation-benchmark](https://dark-moon.org/remediation-benchmark/).

## What is documented

Checked on 2026-11-22 with `gh pr list -R ASCIT31/juice-shop --state all`:

- **#1 to #57:** 57 remediation pull requests, **one per finding** of the Darkmoon run of 26 Apr 2026 (campaign `camp_20260426_3d2f919b`, 57 findings). All were opened on 2026-09-16. Each body carries an AI-assistance disclosure naming the Darkmoon remediation agent and the Darkmoon finding id. 44 are ready for review and 13 are drafts.
- **#58:** a README change, merged 2026-11-20. Not a remediation.
- **#59 to #80:** 22 more remediation pull requests, opened on 2026-11-21, for findings of other Darkmoon runs on Juice Shop. How they were produced is not recorded on the PRs.
- **All 79 remediation PRs are open; none is merged.** Each states that it is opened for human review and never auto-merged.
- **No retest record is published.** No public record shows that the exploits were re-run against these branches, nor the results. The correctness of the fixes has not been independently verified.

The documented figure is therefore: **57 of 57 findings of the 26 Apr run have an open remediation pull request**, awaiting human review.

## Pull requests #1 to #57 (26 Apr 2026 run)

Several findings of the run describe the same underlying issue (for example the same exposed key or the same CORS policy reported more than once), so some of these PRs carry the same fix.

| PR | Finding (PR title) | State |
|---:|---|---|
| [#1](https://github.com/ASCIT31/juice-shop/pull/1) | Sensitive Application Configuration Exposed via REST API | open |
| [#2](https://github.com/ASCIT31/juice-shop/pull/2) | Wildcard CORS Policy (Access-Control-Allow-Origin: *) | open |
| [#3](https://github.com/ASCIT31/juice-shop/pull/3) | Verbose Error Pages with Stack Traces Exposed | open |
| [#4](https://github.com/ASCIT31/juice-shop/pull/4) | Admin Account Weak Password - admin123 | open |
| [#5](https://github.com/ASCIT31/juice-shop/pull/5) | FTP Directory Listing Exposed with Sensitive Files | open |
| [#6](https://github.com/ASCIT31/juice-shop/pull/6) | Prometheus Metrics Endpoint Exposed | open |
| [#7](https://github.com/ASCIT31/juice-shop/pull/7) | JWT RSA Public Key Exposed at /encryptionkeys/jwt.pub | open (draft) |
| [#8](https://github.com/ASCIT31/juice-shop/pull/8) | User Enumeration - Full User List via Admin API | open |
| [#9](https://github.com/ASCIT31/juice-shop/pull/9) | Ethereum Wallet Mnemonic Exposed in Feedback | open (draft) |
| [#10](https://github.com/ASCIT31/juice-shop/pull/10) | Password Reset - Jim's Account via Security Question | open |
| [#11](https://github.com/ASCIT31/juice-shop/pull/11) | Password Reset - Uvogin's Account via Security Question | open |
| [#12](https://github.com/ASCIT31/juice-shop/pull/12) | Open Redirect via Allowlist Bypass with @ Character | open |
| [#13](https://github.com/ASCIT31/juice-shop/pull/13) | CAPTCHA Answer Leaked in Server Response | open |
| [#14](https://github.com/ASCIT31/juice-shop/pull/14) | Zero Stars Feedback - Client-Side Validation Bypass | open |
| [#15](https://github.com/ASCIT31/juice-shop/pull/15) | IDOR - Forged Feedback as Another User | open |
| [#16](https://github.com/ASCIT31/juice-shop/pull/16) | IDOR - Cross-User Basket Access | open |
| [#17](https://github.com/ASCIT31/juice-shop/pull/17) | Password Hash Leakage via Memories API | open |
| [#18](https://github.com/ASCIT31/juice-shop/pull/18) | 3D Blueprint File Exposed - JuiceShop.stl | open (draft) |
| [#19](https://github.com/ASCIT31/juice-shop/pull/19) | Access Logs Exposed at /support/logs/ | open |
| [#20](https://github.com/ASCIT31/juice-shop/pull/20) | Application Configuration Exposed - Full Config | open |
| [#21](https://github.com/ASCIT31/juice-shop/pull/21) | Password Reset - Bjoern's Account via Favorite Pet (OSINT) | open |
| [#22](https://github.com/ASCIT31/juice-shop/pull/22) | Password Reset - John via Geo-Stalking Meta (Config Leak) | open |
| [#23](https://github.com/ASCIT31/juice-shop/pull/23) | Wildcard CORS Policy - Cross-Origin Data Theft | open |
| [#24](https://github.com/ASCIT31/juice-shop/pull/24) | CSAF Security Advisories Exposed - Vulnerability Intelligence | open (draft) |
| [#25](https://github.com/ASCIT31/juice-shop/pull/25) | Missing Security Headers - No CSP, HSTS, or Referrer Policy | open |
| [#26](https://github.com/ASCIT31/juice-shop/pull/26) | Admin Account Compromise via Weak Password (admin123) | open |
| [#27](https://github.com/ASCIT31/juice-shop/pull/27) | Password Hashes Leaked via /rest/memories API | open |
| [#28](https://github.com/ASCIT31/juice-shop/pull/28) | Multiple Account Takeovers via Guessable Security Questions | open |
| [#29](https://github.com/ASCIT31/juice-shop/pull/29) | JWT RSA Public Key Exposed | open (draft) |
| [#30](https://github.com/ASCIT31/juice-shop/pull/30) | Full User Database Exposed via /api/Users | open |
| [#31](https://github.com/ASCIT31/juice-shop/pull/31) | IDOR — Forged Feedback Impersonating Other Users | open |
| [#32](https://github.com/ASCIT31/juice-shop/pull/32) | IDOR — Cross-User Basket Access | open |
| [#33](https://github.com/ASCIT31/juice-shop/pull/33) | FTP Directory with Sensitive Backup Files Exposed | open |
| [#34](https://github.com/ASCIT31/juice-shop/pull/34) | Ethereum Wallet Mnemonic Leaked in Public Feedback | open (draft) |
| [#35](https://github.com/ASCIT31/juice-shop/pull/35) | Open Redirect Bypass via @ Character | open |
| [#36](https://github.com/ASCIT31/juice-shop/pull/36) | CAPTCHA Answer Leaked in API Response | open |
| [#37](https://github.com/ASCIT31/juice-shop/pull/37) | Prometheus Metrics Exposed Without Authentication | open |
| [#38](https://github.com/ASCIT31/juice-shop/pull/38) | Access Logs Publicly Accessible | open |
| [#39](https://github.com/ASCIT31/juice-shop/pull/39) | Blueprint/CAD File Exposed (JuiceShop.stl) | open (draft) |
| [#40](https://github.com/ASCIT31/juice-shop/pull/40) | Missing Security Headers (CSP, HSTS, etc.) | open |
| [#41](https://github.com/ASCIT31/juice-shop/pull/41) | CSAF Security Advisories Exposed | open (draft) |
| [#42](https://github.com/ASCIT31/juice-shop/pull/42) | Zero Stars Feedback Validation Bypass | open |
| [#43](https://github.com/ASCIT31/juice-shop/pull/43) | Wildcard CORS (Access-Control-Allow-Origin: *) | open |
| [#44](https://github.com/ASCIT31/juice-shop/pull/44) | Hardcoded Test Password in Frontend JavaScript Bundle | open (draft) |
| [#45](https://github.com/ASCIT31/juice-shop/pull/45) | Sensitive Mnemonic Phrase Exposed in Customer Feedback | open (draft) |
| [#46](https://github.com/ASCIT31/juice-shop/pull/46) | DOM XSS via Search Parameter - Multiple Payload Vectors | open (draft) |
| [#47](https://github.com/ASCIT31/juice-shop/pull/47) | Score Board Hidden Route Accessible (Information Disclosure) | open (draft) |
| [#48](https://github.com/ASCIT31/juice-shop/pull/48) | Admin Role Registration via API Parameter Injection | open |
| [#49](https://github.com/ASCIT31/juice-shop/pull/49) | IDOR - Unauthorized Access to All User Baskets | open |
| [#50](https://github.com/ASCIT31/juice-shop/pull/50) | Password Hash and Deluxe Token Leak via /rest/memories API | open |
| [#51](https://github.com/ASCIT31/juice-shop/pull/51) | JWT RSA Public Key Exposed at /encryptionkeys/jwt.pub | open (draft) |
| [#52](https://github.com/ASCIT31/juice-shop/pull/52) | JWT Token Contains Full User Object Including Password Hash | open |
| [#53](https://github.com/ASCIT31/juice-shop/pull/53) | Confidential FTP Documents and KeePass Database Publicly Accessible | open |
| [#54](https://github.com/ASCIT31/juice-shop/pull/54) | All User Authentication Details Exposed via REST API | open |
| [#55](https://github.com/ASCIT31/juice-shop/pull/55) | No Content Security Policy - Unrestricted Inline Script Execution | open |
| [#56](https://github.com/ASCIT31/juice-shop/pull/56) | Open Redirect via Allowlisted Domains | open |
| [#57](https://github.com/ASCIT31/juice-shop/pull/57) | Quarantine Directory Exposes Malware Samples | open |

## Pull requests #59 to #80 (other runs)

| PR | Fix (PR title) | State |
|---:|---|---|
| [#59](https://github.com/ASCIT31/juice-shop/pull/59) | parameterize the login query to stop SQL injection authentication bypass | open |
| [#60](https://github.com/ASCIT31/juice-shop/pull/60) | parameterize the product search query to stop UNION-based SQL injection | open |
| [#61](https://github.com/ASCIT31/juice-shop/pull/61) | reject null bytes in /ftp file names instead of truncating after the extension check | open |
| [#62](https://github.com/ASCIT31/juice-shop/pull/62) | restrict product updates to administrators and reject negative prices | open |
| [#63](https://github.com/ASCIT31/juice-shop/pull/63) | enforce review ownership and block NoSQL operators on review edits | open |
| [#64](https://github.com/ASCIT31/juice-shop/pull/64) | disable XML entity expansion in the B2B file upload and stop reflecting parsed content | open |
| [#65](https://github.com/ASCIT31/juice-shop/pull/65) | pin JWT verification to RS256 to block alg:none and HS256 confusion tokens | open |
| [#66](https://github.com/ASCIT31/juice-shop/pull/66) | issue the session cookie server-side with HttpOnly, Secure and SameSite=Strict | open |
| [#67](https://github.com/ASCIT31/juice-shop/pull/67) | reject zero and negative basket item quantities | open |
| [#68](https://github.com/ASCIT31/juice-shop/pull/68) | require POST and the current password for password changes and stop returning the hash | open |
| [#69](https://github.com/ASCIT31/juice-shop/pull/69) | stop serving the /encryptionkeys directory and key files over HTTP | open |
| [#70](https://github.com/ASCIT31/juice-shop/pull/70) | always sanitize feedback comments recursively to stop stored XSS | open |
| [#71](https://github.com/ASCIT31/juice-shop/pull/71) | sanitize user-influenced HTML instead of bypassing Angular's sanitizer | open |
| [#72](https://github.com/ASCIT31/juice-shop/pull/72) | restrict GET /api/Users/:id to the account owner or an administrator | open |
| [#73](https://github.com/ASCIT31/juice-shop/pull/73) | return a stable decoy security question for unknown emails to stop user enumeration | open |
| [#74](https://github.com/ASCIT31/juice-shop/pull/74) | store passwords with salted scrypt instead of unsalted MD5 | open |
| [#75](https://github.com/ASCIT31/juice-shop/pull/75) | stop sending the X-Recruiting header on every response | open |
| [#76](https://github.com/ASCIT31/juice-shop/pull/76) | require authentication to list challenge tracking data behind the score board | open |
| [#77](https://github.com/ASCIT31/juice-shop/pull/77) | remove the confidential acquisitions document from the public /ftp share | open |
| [#78](https://github.com/ASCIT31/juice-shop/pull/78) | require a valid session token for Socket.IO connections | open |
| [#79](https://github.com/ASCIT31/juice-shop/pull/79) | remove Angular testability debug hooks from window in production builds | open |
| [#80](https://github.com/ASCIT31/juice-shop/pull/80) | rate-limit feedback submissions since the arithmetic CAPTCHA is machine-solvable | open |

## How to check

```bash
gh pr list -R ASCIT31/juice-shop --state all --limit 100
```

These fixes are AI-generated and require human code review before any merge.

## Correction (2026-11-22)

This section was added on 2026-11-22. The previous version of this page (last changed on 2026-11-20, available in this repository's git history) is replaced by the text above, for these reasons:

1. **« 42 of 57 demonstrated end-to-end » is withdrawn.** The previous headline said 42 of the 57 findings went through « real finding, real fix, compiles (tsc), exploit retested on a live instance and confirmed closed, open pull request ». No published record supports 42, and no remediation PR is merged. See item 4 of the 2026-11-20 correction and the 2026-11-22 update on [Darkmoon-Benchmarks](https://github.com/ASCIT31/Darkmoon-Benchmarks/blob/main/runs/juice-shop-2026-04-26.md).
2. **Retest and compile results removed.** The previous verification matrix (« pass (closed) », « FAIL (still open) », « not executed ») and the 27 « remediation units » with their retest outcomes are not backed by a published record (no harness, probe list or raw output is published). They are removed rather than restated.
3. **Model and generation details removed.** The previous page named a specific model and described the batch timing. The PR bodies name only the Darkmoon remediation agent; nothing else is published, so these details are removed.
4. **PRs #59 to #80 added.** They did not exist when the previous version was written.

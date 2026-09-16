# Darkmoon Remediation Benchmark — OWASP Juice Shop

> **Category:** `INTERNAL_REMEDIATION_DEMO_PRS` — this is a demonstration of the Darkmoon *remediation* engine on a controlled target. These pull requests are **internal** to `ASCIT31/juice-shop` (a standalone MIT copy of OWASP Juice Shop v19.2.1). They are **not** external/acquisition contributions and were never proposed to the upstream project.

## Honest benchmark headline

**From autonomous pentest to tested remediation: 42 of 57 findings are demonstrated end-to-end** — real finding -> real fix -> compiles (tsc) -> exploit retested on a live instance and confirmed closed -> open pull request awaiting human review.

All 57 findings are mapped to 57 real, individually-addressable pull requests (44 open, 13 draft). Of these, **42 fully satisfy the complete loop with a clean runtime exploit-retest**. The remaining 15 are disclosed transparently below and are **not** counted in the headline:

- **9 draft PRs** close a *narrower* exploit at runtime but are partial/architectural relative to the full finding (see per-unit limits).
- **1 open PR (#52, JWT payload)** did **not** close the exploit on retest — the fix is ineffective (documented honestly).
- **1 open PR (#3, verbose errors)** changes behavior only under `NODE_ENV=production` and was therefore not runtime-retested.
- **4 draft PRs** (#44 hardcoded client password, #46 DOM XSS, #18/#39 exposed .stl asset) are frontend/asset changes not exercised by the API-level retest harness.

No PR is merged; every PR is opened for human review and is never auto-merged. These fixes are AI-generated and require human code review.

## How to read this / methodology

Each PR was checked against 7 criteria:

1. **Maps to a real finding** — the PR corresponds to a specific finding in the Darkmoon pentest dataset.
2. **Contains a relevant fix** — the diff targets the real Juice Shop file(s) governing the finding.
3. **Compiles / passes type-check** — `tsc` (the project's `build:server`) run on the branch (backend). The base repo compiles cleanly (tsc exit 0); each of the 24 distinct backend fix branches also compiles cleanly.
4. **Retested against the exploit** — the exploit was reproduced on the base (`main`) instance and then re-run against the fix branch on a live OWASP Juice Shop v19.2.1 instance (`ts-node app.ts`, `NODE_ENV=test`).
5. **Not an artificial duplicate** — each PR maps to a distinct finding in the dataset. Where several findings describe the same underlying issue, their fixes share a diff; this is disclosed (there are **27 distinct fixes across the 57 PRs**).
6. **Contains no secret** — added lines were scanned for private keys, tokens and credentials.
7. **Contains no false claim** — PR bodies frame validation as *intent* and disclose AI-assistance; this dossier supplies the actual evidence. One PR (#52) is flagged because its retest contradicts the implied validation.

### Reproduction environment / disclosure

- **Target:** `ASCIT31/juice-shop` @ `main` = OWASP Juice Shop **v19.2.1** (MIT), standalone copy.
- **Runtime retest:** `ts-node app.ts`, `NODE_ENV=test`; each fix branch booted on an isolated port; 23 HTTP-level exploit probes; baseline (`main`) vs patched branch.
- **Compile check:** `npx tsc` per distinct backend branch (24 branches, all exit 0 / 0 errors).
- **Model:** Claude Opus 4.8 (`claude-opus-4-8`), Darkmoon remediation agent (AI-assisted).
- **Generation:** all 57 branches+PRs created in one automated batch on 2026-09-16, ~6s pacing between PRs (~6 min total).
- **Cost:** not separately instrumented for this run.
- **Verification date:** 2026-09-16.

## Verification matrix (all 57 PRs)

| PR | Finding | Sev | Status | (2) Relevant | (3) Compiles | (4) Retest vs exploit | Fully demonstrated |
|---:|---------|-----|--------|:---:|:---:|-----------------------|:---:|
| [#1](https://github.com/ASCIT31/juice-shop/pull/1) | Sensitive Application Configuration Exposed via REST … | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#2](https://github.com/ASCIT31/juice-shop/pull/2) | Wildcard CORS Policy (Access-Control-Allow-Origin: *) | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#3](https://github.com/ASCIT31/juice-shop/pull/3) | Verbose Error Pages with Stack Traces Exposed | MEDIUM | open | ✓ | pass | not executed | — |
| [#4](https://github.com/ASCIT31/juice-shop/pull/4) | Admin Account Weak Password - admin123 | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#5](https://github.com/ASCIT31/juice-shop/pull/5) | FTP Directory Listing Exposed with Sensitive Files | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#6](https://github.com/ASCIT31/juice-shop/pull/6) | Prometheus Metrics Endpoint Exposed | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#7](https://github.com/ASCIT31/juice-shop/pull/7) | JWT RSA Public Key Exposed at /encryptionkeys/jwt.pub | HIGH | draft | ✓ | pass | pass (closed) | — |
| [#8](https://github.com/ASCIT31/juice-shop/pull/8) | User Enumeration - Full User List via Admin API | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#9](https://github.com/ASCIT31/juice-shop/pull/9) | Ethereum Wallet Mnemonic Exposed in Feedback | HIGH | draft | ✓ | pass | pass (closed) | — |
| [#10](https://github.com/ASCIT31/juice-shop/pull/10) | Password Reset - Jim's Account via Security Question | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#11](https://github.com/ASCIT31/juice-shop/pull/11) | Password Reset - Uvogin's Account via Security Questi… | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#12](https://github.com/ASCIT31/juice-shop/pull/12) | Open Redirect via Allowlist Bypass with @ Character | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#13](https://github.com/ASCIT31/juice-shop/pull/13) | CAPTCHA Answer Leaked in Server Response | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#14](https://github.com/ASCIT31/juice-shop/pull/14) | Zero Stars Feedback - Client-Side Validation Bypass | LOW | open | ✓ | pass | pass (closed) | ✅ |
| [#15](https://github.com/ASCIT31/juice-shop/pull/15) | IDOR - Forged Feedback as Another User | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#16](https://github.com/ASCIT31/juice-shop/pull/16) | IDOR - Cross-User Basket Access | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#17](https://github.com/ASCIT31/juice-shop/pull/17) | Password Hash Leakage via Memories API | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#18](https://github.com/ASCIT31/juice-shop/pull/18) | 3D Blueprint File Exposed - JuiceShop.stl | MEDIUM | draft | ✓ | n/a | not executed | — |
| [#19](https://github.com/ASCIT31/juice-shop/pull/19) | Access Logs Exposed at /support/logs/ | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#20](https://github.com/ASCIT31/juice-shop/pull/20) | Application Configuration Exposed - Full Config | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#21](https://github.com/ASCIT31/juice-shop/pull/21) | Password Reset - Bjoern's Account via Favorite Pet (O… | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#22](https://github.com/ASCIT31/juice-shop/pull/22) | Password Reset - John via Geo-Stalking Meta (Config L… | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#23](https://github.com/ASCIT31/juice-shop/pull/23) | Wildcard CORS Policy - Cross-Origin Data Theft | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#24](https://github.com/ASCIT31/juice-shop/pull/24) | CSAF Security Advisories Exposed - Vulnerability Inte… | MEDIUM | draft | ✓ | pass | pass (closed) | — |
| [#25](https://github.com/ASCIT31/juice-shop/pull/25) | Missing Security Headers - No CSP, HSTS, or Referrer … | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#26](https://github.com/ASCIT31/juice-shop/pull/26) | Admin Account Compromise via Weak Password (admin123) | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#27](https://github.com/ASCIT31/juice-shop/pull/27) | Password Hashes Leaked via /rest/memories API | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#28](https://github.com/ASCIT31/juice-shop/pull/28) | Multiple Account Takeovers via Guessable Security Que… | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#29](https://github.com/ASCIT31/juice-shop/pull/29) | JWT RSA Public Key Exposed | HIGH | draft | ✓ | pass | pass (closed) | — |
| [#30](https://github.com/ASCIT31/juice-shop/pull/30) | Full User Database Exposed via /api/Users | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#31](https://github.com/ASCIT31/juice-shop/pull/31) | IDOR — Forged Feedback Impersonating Other Users | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#32](https://github.com/ASCIT31/juice-shop/pull/32) | IDOR — Cross-User Basket Access | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#33](https://github.com/ASCIT31/juice-shop/pull/33) | FTP Directory with Sensitive Backup Files Exposed | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#34](https://github.com/ASCIT31/juice-shop/pull/34) | Ethereum Wallet Mnemonic Leaked in Public Feedback | HIGH | draft | ✓ | pass | pass (closed) | — |
| [#35](https://github.com/ASCIT31/juice-shop/pull/35) | Open Redirect Bypass via @ Character | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#36](https://github.com/ASCIT31/juice-shop/pull/36) | CAPTCHA Answer Leaked in API Response | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#37](https://github.com/ASCIT31/juice-shop/pull/37) | Prometheus Metrics Exposed Without Authentication | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#38](https://github.com/ASCIT31/juice-shop/pull/38) | Access Logs Publicly Accessible | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#39](https://github.com/ASCIT31/juice-shop/pull/39) | Blueprint/CAD File Exposed (JuiceShop.stl) | MEDIUM | draft | ✓ | n/a | not executed | — |
| [#40](https://github.com/ASCIT31/juice-shop/pull/40) | Missing Security Headers (CSP, HSTS, etc.) | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#41](https://github.com/ASCIT31/juice-shop/pull/41) | CSAF Security Advisories Exposed | MEDIUM | draft | ✓ | pass | pass (closed) | — |
| [#42](https://github.com/ASCIT31/juice-shop/pull/42) | Zero Stars Feedback Validation Bypass | LOW | open | ✓ | pass | pass (closed) | ✅ |
| [#43](https://github.com/ASCIT31/juice-shop/pull/43) | Wildcard CORS (Access-Control-Allow-Origin: *) | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#44](https://github.com/ASCIT31/juice-shop/pull/44) | Hardcoded Test Password in Frontend JavaScript Bundle | MEDIUM | draft | ✓ | not run | not executed | — |
| [#45](https://github.com/ASCIT31/juice-shop/pull/45) | Sensitive Mnemonic Phrase Exposed in Customer Feedback | HIGH | draft | ✓ | pass | pass (closed) | — |
| [#46](https://github.com/ASCIT31/juice-shop/pull/46) | DOM XSS via Search Parameter - Multiple Payload Vecto… | HIGH | draft | ✓ | not run | not executed | — |
| [#47](https://github.com/ASCIT31/juice-shop/pull/47) | Score Board Hidden Route Accessible (Information Disc… | LOW | draft | ✓ | pass | pass (closed) | — |
| [#48](https://github.com/ASCIT31/juice-shop/pull/48) | Admin Role Registration via API Parameter Injection | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#49](https://github.com/ASCIT31/juice-shop/pull/49) | IDOR - Unauthorized Access to All User Baskets | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#50](https://github.com/ASCIT31/juice-shop/pull/50) | Password Hash and Deluxe Token Leak via /rest/memorie… | CRITICAL | open | ✓ | pass | pass (closed) | ✅ |
| [#51](https://github.com/ASCIT31/juice-shop/pull/51) | JWT RSA Public Key Exposed at /encryptionkeys/jwt.pub | MEDIUM | draft | ✓ | pass | pass (closed) | — |
| [#52](https://github.com/ASCIT31/juice-shop/pull/52) | JWT Token Contains Full User Object Including Passwor… | CRITICAL | open | ✓ | pass | **FAIL (still open)** | — |
| [#53](https://github.com/ASCIT31/juice-shop/pull/53) | Confidential FTP Documents and KeePass Database Publi… | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#54](https://github.com/ASCIT31/juice-shop/pull/54) | All User Authentication Details Exposed via REST API | HIGH | open | ✓ | pass | pass (closed) | ✅ |
| [#55](https://github.com/ASCIT31/juice-shop/pull/55) | No Content Security Policy - Unrestricted Inline Scri… | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |
| [#56](https://github.com/ASCIT31/juice-shop/pull/56) | Open Redirect via Allowlisted Domains | LOW | open | ✓ | pass | pass (closed) | ✅ |
| [#57](https://github.com/ASCIT31/juice-shop/pull/57) | Quarantine Directory Exposes Malware Samples | MEDIUM | open | ✓ | pass | pass (closed) | ✅ |

*(Criterion 1 = maps to a real finding: **pass for all 57**. Criterion 6 = no secret: **pass for all 57** — PR #4/#26 introduce a new demo seed password, which is not a live secret. Criterion 5 and 7 detailed per unit below.)*

## Remediation units (27 distinct fixes)

Findings that describe the same underlying weakness share a single fix diff. Each unit lists the finding(s), the fix, the compile result, the live retest, the PR(s), and any limits.

### Application configuration exposed  
- **Findings / PRs (2):** [#1](https://github.com/ASCIT31/juice-shop/pull/1) (open) , [#20](https://github.com/ASCIT31/juice-shop/pull/20) (open)
- **Finding id(s):** `vuln_4e04bf`, `vuln_671aae`  |  **Severity:** HIGH  |  **Category:** information_disclosure
- **Files changed:** `routes/appConfiguration.ts`, `server.ts`
- **Initial proof (baseline on main):** Unauthenticated GET /rest/admin/application-configuration -> 200 with googleOauth secret present
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: 401 Unauthorized and googleOauth secret no longer present
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Wildcard CORS  
- **Findings / PRs (3):** [#2](https://github.com/ASCIT31/juice-shop/pull/2) (open) , [#23](https://github.com/ASCIT31/juice-shop/pull/23) (open) , [#43](https://github.com/ASCIT31/juice-shop/pull/43) (open)
- **Finding id(s):** `vuln_1ddd2d`, `vuln_27a9f0`, `vuln_81d91f`  |  **Severity:** MEDIUM  |  **Category:** security_misconfiguration
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** Response header Access-Control-Allow-Origin: * for any Origin
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: no Access-Control-Allow-Origin header for a non-allowlisted Origin
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).

### Verbose error/stack traces  
- **Findings / PRs (1):** [#3](https://github.com/ASCIT31/juice-shop/pull/3) (open)
- **Finding id(s):** `vuln_fa7b1b`  |  **Severity:** MEDIUM  |  **Category:** information_disclosure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** Default Express errorhandler returns full stack traces to clients
- **Compile (tsc):** pass
- **Retest vs exploit:** NOT RUNTIME-TESTED: the generic handler activates only under NODE_ENV=production; the harness runs NODE_ENV=test where the verbose handler is intentionally retained
- **Limits:** Conditional: the fix only changes behavior under NODE_ENV=production.

### Weak admin password (admin123)  
- **Findings / PRs (2):** [#4](https://github.com/ASCIT31/juice-shop/pull/4) (open) , [#26](https://github.com/ASCIT31/juice-shop/pull/26) (open)
- **Finding id(s):** `vuln_b89c20`, `vuln_51b4d4`  |  **Severity:** CRITICAL  |  **Category:** authentication_bypass
- **Files changed:** `data/static/users.yml`
- **Initial proof (baseline on main):** POST /rest/user/login admin@juice-sh.op / admin123 -> 200 token
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: admin123 login -> 401 (login fails)
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Public FTP folder & KeePass DB  
- **Findings / PRs (3):** [#5](https://github.com/ASCIT31/juice-shop/pull/5) (open) , [#33](https://github.com/ASCIT31/juice-shop/pull/33) (open) , [#53](https://github.com/ASCIT31/juice-shop/pull/53) (open)
- **Finding id(s):** `vuln_7f7859`, `vuln_4fc2a5`, `vuln_670439`  |  **Severity:** HIGH  |  **Category:** sensitive_data_exposure
- **Files changed:** `routes/fileServer.ts`, `server.ts`
- **Initial proof (baseline on main):** GET /ftp/ directory listing incl. backups; GET /ftp/incident-support.kdbx -> 200
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: /ftp/ listing gone; /ftp/incident-support.kdbx -> 403
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).

### Unauthenticated Prometheus metrics  
- **Findings / PRs (2):** [#6](https://github.com/ASCIT31/juice-shop/pull/6) (open) , [#37](https://github.com/ASCIT31/juice-shop/pull/37) (open)
- **Finding id(s):** `vuln_6b735e`, `vuln_ab3a46`  |  **Severity:** MEDIUM  |  **Category:** information_disclosure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** Unauthenticated GET /metrics -> 200 (Prometheus telemetry)
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: GET /metrics -> 401
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Encryption-keys directory browsing  
- **Findings / PRs (3):** [#7](https://github.com/ASCIT31/juice-shop/pull/7) (draft) , [#29](https://github.com/ASCIT31/juice-shop/pull/29) (draft) , [#51](https://github.com/ASCIT31/juice-shop/pull/51) (draft)
- **Finding id(s):** `vuln_c2d460`, `vuln_545d18`, `vuln_b507e4`  |  **Severity:** HIGH  |  **Category:** sensitive_data_exposure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** GET /encryptionkeys/ enumerates key files incl. jwt.pub
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: /encryptionkeys/ no longer lists key files (jwt.pub not enumerable)
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).
- **Limits:** Partial: only disables directory enumeration. The JWT verification key is public by design; full remediation is key rotation / moving key material out of web root / algorithm pinning.

### /api/Users enumeration  
- **Findings / PRs (2):** [#8](https://github.com/ASCIT31/juice-shop/pull/8) (open) , [#30](https://github.com/ASCIT31/juice-shop/pull/30) (open)
- **Finding id(s):** `vuln_260c8f`, `vuln_a02f3a`  |  **Severity:** HIGH  |  **Category:** information_disclosure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** Customer-token GET /api/Users -> 200 with full user list (22 users)
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: customer-token GET /api/Users -> 403
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Wallet mnemonic in feedback  
- **Findings / PRs (3):** [#9](https://github.com/ASCIT31/juice-shop/pull/9) (draft) , [#34](https://github.com/ASCIT31/juice-shop/pull/34) (draft) , [#45](https://github.com/ASCIT31/juice-shop/pull/45) (draft)
- **Finding id(s):** `vuln_d19353`, `vuln_5f89af`, `vuln_7bc54f`  |  **Severity:** HIGH  |  **Category:** sensitive_data_exposure
- **Files changed:** `models/feedback.ts`
- **Initial proof (baseline on main):** BIP-39 mnemonic submitted in feedback stored verbatim and readable via GET /api/Feedbacks
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: mnemonic no longer stored verbatim; replaced by [redacted potential secret]
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).
- **Limits:** Partial: best-effort regex redaction for NEW feedback only; does not scrub already-seeded data and can miss other secret formats.

### Security-question password reset brute-force  
- **Findings / PRs (5):** [#10](https://github.com/ASCIT31/juice-shop/pull/10) (open) , [#11](https://github.com/ASCIT31/juice-shop/pull/11) (open) , [#21](https://github.com/ASCIT31/juice-shop/pull/21) (open) , [#22](https://github.com/ASCIT31/juice-shop/pull/22) (open) , [#28](https://github.com/ASCIT31/juice-shop/pull/28) (open)
- **Finding id(s):** `vuln_e93a1d`, `vuln_1dffac`, `vuln_6be78f`, `vuln_2eefc8`, `vuln_9e65c8`  |  **Severity:** HIGH  |  **Category:** authentication_bypass
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** 7 rapid POST /rest/user/reset-password attempts -> none rate-limited (limiter max=100, spoofable key)
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: rate limiter now returns 429 from the 6th attempt (max=5, socket-IP key)
- **Duplicate disclosure:** these 5 PRs share one fix diff (the dataset reported the same underlying issue 5 times).

### Open redirect (@-bypass)  
- **Findings / PRs (3):** [#12](https://github.com/ASCIT31/juice-shop/pull/12) (open) , [#35](https://github.com/ASCIT31/juice-shop/pull/35) (open) , [#56](https://github.com/ASCIT31/juice-shop/pull/56) (open)
- **Finding id(s):** `vuln_74122d`, `vuln_5a31c2`, `vuln_6a2d7d`  |  **Severity:** MEDIUM  |  **Category:** redirect_abuse
- **Files changed:** `lib/insecurity.ts`
- **Initial proof (baseline on main):** GET /redirect?to=...github.com/juice-shop/juice-shop@evil.com -> 302 to evil.com
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: @-bypass redirect -> 406 (rejected)
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).

### CAPTCHA answer disclosed  
- **Findings / PRs (2):** [#13](https://github.com/ASCIT31/juice-shop/pull/13) (open) , [#36](https://github.com/ASCIT31/juice-shop/pull/36) (open)
- **Finding id(s):** `vuln_ffcda6`, `vuln_288235`  |  **Severity:** MEDIUM  |  **Category:** information_disclosure
- **Files changed:** `routes/captcha.ts`
- **Initial proof (baseline on main):** GET /rest/captcha -> 200 with the "answer" field disclosed
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: GET /rest/captcha no longer returns the answer field
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Zero-star feedback validation bypass  
- **Findings / PRs (2):** [#14](https://github.com/ASCIT31/juice-shop/pull/14) (open) , [#42](https://github.com/ASCIT31/juice-shop/pull/42) (open)
- **Finding id(s):** `vuln_4c37af`, `vuln_5e3ec5`  |  **Severity:** LOW  |  **Category:** business_logic
- **Files changed:** `models/feedback.ts`
- **Initial proof (baseline on main):** POST /api/Feedbacks rating=0 -> 201 accepted (client-side-only validation)
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: rating=0 -> 500 (rejected by server-side validation; closes zero-star bypass, though a 400 would be cleaner)
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Forged feedback (IDOR)  
- **Findings / PRs (2):** [#15](https://github.com/ASCIT31/juice-shop/pull/15) (open) , [#31](https://github.com/ASCIT31/juice-shop/pull/31) (open)
- **Finding id(s):** `vuln_a9a0e4`, `vuln_d7e689`  |  **Severity:** HIGH  |  **Category:** idor
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** POST /api/Feedbacks with UserId=1 while authenticated as another user -> stored UserId=1
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: forged UserId=1 overwritten with authenticated user id (23)
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### Cross-user basket access (IDOR)  
- **Findings / PRs (3):** [#16](https://github.com/ASCIT31/juice-shop/pull/16) (open) , [#32](https://github.com/ASCIT31/juice-shop/pull/32) (open) , [#49](https://github.com/ASCIT31/juice-shop/pull/49) (open)
- **Finding id(s):** `vuln_b778dd`, `vuln_a96a52`, `vuln_8fee85`  |  **Severity:** HIGH  |  **Category:** idor
- **Files changed:** `routes/basket.ts`
- **Initial proof (baseline on main):** Customer token (own basket id != 1) GET /rest/basket/1 -> 200 (another user's basket)
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: cross-user GET /rest/basket/1 -> 403
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).

### Password hash leak via /rest/memories  
- **Findings / PRs (3):** [#17](https://github.com/ASCIT31/juice-shop/pull/17) (open) , [#27](https://github.com/ASCIT31/juice-shop/pull/27) (open) , [#50](https://github.com/ASCIT31/juice-shop/pull/50) (open)
- **Finding id(s):** `vuln_bafe26`, `vuln_449cd3`, `vuln_8fd1c0`  |  **Severity:** CRITICAL  |  **Category:** sensitive_data_exposure
- **Files changed:** `routes/memory.ts`
- **Initial proof (baseline on main):** GET /rest/memories -> 200, response includes user password hash
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: GET /rest/memories no longer returns password field
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).

### Proprietary CAD (.stl) exposed  
- **Findings / PRs (2):** [#18](https://github.com/ASCIT31/juice-shop/pull/18) (draft) , [#39](https://github.com/ASCIT31/juice-shop/pull/39) (draft)
- **Finding id(s):** `vuln_cd2e66`, `vuln_06ea5c`  |  **Severity:** MEDIUM  |  **Category:** sensitive_data_exposure
- **Files changed:** `frontend/src/assets/public/images/products/JuiceShop.stl`
- **Initial proof (baseline on main):** GET /assets/public/images/products/JuiceShop.stl -> 200 (proprietary CAD asset)
- **Compile (tsc):** n/a (asset removal, nothing to compile)
- **Retest vs exploit:** NOT RUNTIME-TESTED: requires built frontend static serving (not built in this pass)
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).
- **Limits:** Partial/asset: removes the exposed .stl file; whether it should be published at all is a product decision.

### Access logs exposed  
- **Findings / PRs (2):** [#19](https://github.com/ASCIT31/juice-shop/pull/19) (open) , [#38](https://github.com/ASCIT31/juice-shop/pull/38) (open)
- **Finding id(s):** `vuln_03fbfa`, `vuln_fbe979`  |  **Severity:** MEDIUM  |  **Category:** sensitive_data_exposure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** GET /support/logs/ -> 200 access-log directory listing
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: GET /support/logs/ -> 401
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).

### CSAF advisories enumerable  
- **Findings / PRs (2):** [#24](https://github.com/ASCIT31/juice-shop/pull/24) (draft) , [#41](https://github.com/ASCIT31/juice-shop/pull/41) (draft)
- **Finding id(s):** `vuln_ced9d9`, `vuln_858102`  |  **Severity:** MEDIUM  |  **Category:** sensitive_data_exposure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** GET /.well-known/ enumerates the csaf advisory directory
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: /.well-known/ no longer enumerates the csaf directory
- **Duplicate disclosure:** these 2 PRs share one fix diff (the dataset reported the same underlying issue 2 times).
- **Limits:** Partial: only disables enumeration. Publishing CSAF advisories is an intentional best practice.

### Missing security headers / CSP  
- **Findings / PRs (3):** [#25](https://github.com/ASCIT31/juice-shop/pull/25) (open) , [#40](https://github.com/ASCIT31/juice-shop/pull/40) (open) , [#55](https://github.com/ASCIT31/juice-shop/pull/55) (open)
- **Finding id(s):** `vuln_fd4290`, `vuln_be9f94`, `vuln_c733b9`  |  **Severity:** MEDIUM  |  **Category:** security_misconfiguration
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** No Content-Security-Policy and no Strict-Transport-Security header on responses
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: Content-Security-Policy and Strict-Transport-Security now present
- **Duplicate disclosure:** these 3 PRs share one fix diff (the dataset reported the same underlying issue 3 times).

### Hardcoded test password in bundle  
- **Findings / PRs (1):** [#44](https://github.com/ASCIT31/juice-shop/pull/44) (draft)
- **Finding id(s):** `vuln_d581bd`  |  **Severity:** MEDIUM  |  **Category:** sensitive_data_exposure
- **Files changed:** `frontend/src/app/login/login.component.ts`
- **Initial proof (baseline on main):** testingPassword = "IamUsedForTesting" shipped in the Angular client bundle
- **Compile (tsc):** not run (frontend toolchain not built in this pass)
- **Retest vs exploit:** NOT RUNTIME-TESTED: client bundle value, not exercised by the API-level harness
- **Limits:** Partial: removes the credential from the client component, but the same test account still exists in backend seed data (users.yml, login.ts).

### DOM XSS via search  
- **Findings / PRs (1):** [#46](https://github.com/ASCIT31/juice-shop/pull/46) (draft)
- **Finding id(s):** `vuln_959dd9`  |  **Severity:** HIGH  |  **Category:** xss_stored
- **Files changed:** `frontend/src/app/search-result/search-result.component.ts`
- **Initial proof (baseline on main):** search-result component wraps query/description with DomSanitizer.bypassSecurityTrustHtml
- **Compile (tsc):** not run (frontend toolchain not built in this pass)
- **Retest vs exploit:** NOT RUNTIME-TESTED: Angular client behavior, not exercised by the API-level harness
- **Limits:** Partial: removes bypassSecurityTrustHtml; template bindings may need [innerHTML]->interpolation changes and a frontend build to fully validate.

### Score-board route discoverable  
- **Findings / PRs (1):** [#47](https://github.com/ASCIT31/juice-shop/pull/47) (draft)
- **Finding id(s):** `vuln_deeaaa`  |  **Severity:** LOW  |  **Category:** information_disclosure
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** robots.txt does not disallow /score-board (route trivially discoverable)
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: robots.txt now disallows /score-board
- **Limits:** Partial: only reduces discoverability via robots.txt. The score board is an intentional feature; hiding it fully needs a production build flag.

### Admin-role registration via API param  
- **Findings / PRs (1):** [#48](https://github.com/ASCIT31/juice-shop/pull/48) (open)
- **Finding id(s):** `vuln_096d1f`  |  **Severity:** CRITICAL  |  **Category:** broken_access_control
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** POST /api/Users with role=admin -> account created with role=admin
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: POST /api/Users role=admin -> account created with role=customer

### Password hash inside JWT  
- **Findings / PRs (1):** [#52](https://github.com/ASCIT31/juice-shop/pull/52) (open)
- **Finding id(s):** `vuln_c5ce1d`  |  **Severity:** CRITICAL  |  **Category:** sensitive_data_exposure
- **Files changed:** `routes/login.ts`
- **Initial proof (baseline on main):** Login JWT payload data{} contains the password hash
- **Compile (tsc):** pass
- **Retest vs exploit:** FAIL: JWT payload STILL contains the password hash (delete on a Sequelize instance is a no-op; fix ineffective)
- **Limits:** INEFFECTIVE at runtime: deleting a property on a Sequelize model instance does not remove it from the serialized payload. Needs a sanitized DTO before signing.

### All user auth details exposed  
- **Findings / PRs (1):** [#54](https://github.com/ASCIT31/juice-shop/pull/54) (open)
- **Finding id(s):** `vuln_7565c6`  |  **Severity:** HIGH  |  **Category:** broken_access_control
- **Files changed:** `server.ts`
- **Initial proof (baseline on main):** Customer-token GET /rest/user/authentication-details/ -> 200 for all users
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: customer-token GET /rest/user/authentication-details/ -> 403

### Quarantine malware directory served  
- **Findings / PRs (1):** [#57](https://github.com/ASCIT31/juice-shop/pull/57) (open)
- **Finding id(s):** `vuln_7c215d`  |  **Severity:** MEDIUM  |  **Category:** sensitive_data_exposure
- **Files changed:** `routes/quarantineServer.ts`
- **Initial proof (baseline on main):** GET /ftp/quarantine/<malware sample> -> 200
- **Compile (tsc):** pass
- **Retest vs exploit:** PATCHED: GET /ftp/quarantine/<sample> -> 403

## Findings not fully demonstrated (transparency)

| PR | Finding | Status | Reason not counted in headline |
|---:|---------|--------|--------------------------------|
| [#3](https://github.com/ASCIT31/juice-shop/pull/3) | Verbose Error Pages with Stack Traces Exposed | open | NOT RUNTIME-TESTED: the generic handler activates only under NODE_ENV=production; the harness runs NODE_ENV=test where the verbose handler is intentionally retained |
| [#7](https://github.com/ASCIT31/juice-shop/pull/7) | JWT RSA Public Key Exposed at /encryptionkeys/jw | draft | Draft: Partial: only disables directory enumeration. The JWT verification key is public by design; full remediation is key rotation / moving key material out of web root / algorithm pinning. |
| [#9](https://github.com/ASCIT31/juice-shop/pull/9) | Ethereum Wallet Mnemonic Exposed in Feedback | draft | Draft: Partial: best-effort regex redaction for NEW feedback only; does not scrub already-seeded data and can miss other secret formats. |
| [#18](https://github.com/ASCIT31/juice-shop/pull/18) | 3D Blueprint File Exposed - JuiceShop.stl | draft | NOT RUNTIME-TESTED: requires built frontend static serving (not built in this pass) Draft: Partial/asset: removes the exposed .stl file; whether it should be published at all is a product decision. |
| [#24](https://github.com/ASCIT31/juice-shop/pull/24) | CSAF Security Advisories Exposed - Vulnerability | draft | Draft: Partial: only disables enumeration. Publishing CSAF advisories is an intentional best practice. |
| [#29](https://github.com/ASCIT31/juice-shop/pull/29) | JWT RSA Public Key Exposed | draft | Draft: Partial: only disables directory enumeration. The JWT verification key is public by design; full remediation is key rotation / moving key material out of web root / algorithm pinning. |
| [#34](https://github.com/ASCIT31/juice-shop/pull/34) | Ethereum Wallet Mnemonic Leaked in Public Feedba | draft | Draft: Partial: best-effort regex redaction for NEW feedback only; does not scrub already-seeded data and can miss other secret formats. |
| [#39](https://github.com/ASCIT31/juice-shop/pull/39) | Blueprint/CAD File Exposed (JuiceShop.stl) | draft | NOT RUNTIME-TESTED: requires built frontend static serving (not built in this pass) Draft: Partial/asset: removes the exposed .stl file; whether it should be published at all is a product decision. |
| [#41](https://github.com/ASCIT31/juice-shop/pull/41) | CSAF Security Advisories Exposed | draft | Draft: Partial: only disables enumeration. Publishing CSAF advisories is an intentional best practice. |
| [#44](https://github.com/ASCIT31/juice-shop/pull/44) | Hardcoded Test Password in Frontend JavaScript B | draft | NOT RUNTIME-TESTED: client bundle value, not exercised by the API-level harness Draft: Partial: removes the credential from the client component, but the same test account still exists in backend seed data (users.yml, login.ts). |
| [#45](https://github.com/ASCIT31/juice-shop/pull/45) | Sensitive Mnemonic Phrase Exposed in Customer Fe | draft | Draft: Partial: best-effort regex redaction for NEW feedback only; does not scrub already-seeded data and can miss other secret formats. |
| [#46](https://github.com/ASCIT31/juice-shop/pull/46) | DOM XSS via Search Parameter - Multiple Payload  | draft | NOT RUNTIME-TESTED: Angular client behavior, not exercised by the API-level harness Draft: Partial: removes bypassSecurityTrustHtml; template bindings may need [innerHTML]->interpolation changes and a frontend build to fully validate. |
| [#47](https://github.com/ASCIT31/juice-shop/pull/47) | Score Board Hidden Route Accessible (Information | draft | Draft: Partial: only reduces discoverability via robots.txt. The score board is an intentional feature; hiding it fully needs a production build flag. |
| [#51](https://github.com/ASCIT31/juice-shop/pull/51) | JWT RSA Public Key Exposed at /encryptionkeys/jw | draft | Draft: Partial: only disables directory enumeration. The JWT verification key is public by design; full remediation is key rotation / moving key material out of web root / algorithm pinning. |
| [#52](https://github.com/ASCIT31/juice-shop/pull/52) | JWT Token Contains Full User Object Including Pa | open | Fix ineffective at runtime (see #52 root cause: delete on a Sequelize instance is a no-op). |

## Integrity statement

This dossier reports verification actually performed. Runtime retests were executed against a live instance; compile checks were executed with `tsc`. Where a fix does not fully close its finding (drafts) or does not work at runtime (#52), it is stated plainly rather than rounded up. The AI-generated fixes are intended for human review and are never auto-merged. Upstream OWASP Juice Shop is untouched.

*Generated by the Darkmoon remediation-verification pass on 2026-09-16.*

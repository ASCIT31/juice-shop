/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveQuarantineFiles () {
  return (_req: Request, res: Response, next: NextFunction) => {
    // The quarantine directory holds malware samples and must never be served publicly.
    res.status(403)
    next(new Error('Access to the quarantine directory is forbidden.'))
  }
}

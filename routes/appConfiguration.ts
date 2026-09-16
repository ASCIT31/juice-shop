/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import config from 'config'
import { type Request, type Response } from 'express'

export function retrieveAppConfiguration () {
  return (_req: Request, res: Response) => {
    // Redact secrets that must never reach the client, even for authenticated callers.
    const safeConfig: any = JSON.parse(JSON.stringify(config))
    if (safeConfig?.application?.googleOauth) delete safeConfig.application.googleOauth
    if (safeConfig?.ctf) delete safeConfig.ctf
    if (safeConfig?.challenges) delete safeConfig.challenges
    res.json({ config: safeConfig })
  }
}

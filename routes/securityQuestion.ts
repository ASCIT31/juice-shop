/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import crypto from 'node:crypto'
import { type Request, type Response, type NextFunction } from 'express'
import { SecurityAnswerModel } from '../models/securityAnswer'
import { UserModel } from '../models/user'
import { SecurityQuestionModel } from '../models/securityQuestion'

// Secret per process so the decoy for an unknown email cannot be predicted offline.
const decoyKey = crypto.randomBytes(32)

export function securityQuestion () {
  return async ({ query }: Request, res: Response, next: NextFunction) => {
    const email = query.email
    try {
      const answer = await SecurityAnswerModel.findOne({
        include: [{
          model: UserModel,
          where: { email: email?.toString() }
        }]
      })
      if (answer != null) {
        const question = await SecurityQuestionModel.findByPk(answer.SecurityQuestionId)
        res.json({ question })
      } else {
        // Answer unknown emails with the same response shape (a stable decoy question)
        // so the endpoint cannot be used to enumerate registered accounts.
        const questions = await SecurityQuestionModel.findAll({ order: [['id', 'ASC']] })
        if (questions.length === 0) {
          res.json({})
          return
        }
        const digest = crypto.createHmac('sha256', decoyKey).update(String(email ?? '').toLowerCase()).digest()
        res.json({ question: questions[digest.readUInt32BE(0) % questions.length] })
      }
    } catch (error) {
      next(error)
    }
  }
}

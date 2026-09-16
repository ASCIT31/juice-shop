/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

/* jslint node: true */
import * as utils from '../lib/utils'
import * as challengeUtils from '../lib/challengeUtils'
import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes,
  type CreationOptional,
  type Sequelize
} from 'sequelize'
import { challenges } from '../data/datacache'
import * as security from '../lib/insecurity'

class Feedback extends Model<
InferAttributes<Feedback>,
InferCreationAttributes<Feedback>
> {
  declare UserId: number | null
  declare id: CreationOptional<number>
  declare comment: string
  declare rating: number
}
const FeedbackModelInit = (sequelize: Sequelize) => {
  Feedback.init(
    {
      UserId: {
        type: DataTypes.INTEGER
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.STRING,
        set (comment: string) {
          let sanitizedComment: string
          if (utils.isChallengeEnabled(challenges.persistedXssFeedbackChallenge)) {
            sanitizedComment = security.sanitizeHtml(comment)
            challengeUtils.solveIf(challenges.persistedXssFeedbackChallenge, () => {
              return utils.contains(
                sanitizedComment,
                '<iframe src="javascript:alert(`xss`)">'
              )
            })
          } else {
            sanitizedComment = security.sanitizeSecure(comment)
          }
          this.setDataValue('comment', sanitizedComment)
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set (rating: number) {
          // Server-side validation: rating must be an integer between 1 and 5.
          const normalized = Number(rating)
          if (!Number.isInteger(normalized) || normalized < 1 || normalized > 5) {
            throw new Error('Rating must be an integer between 1 and 5')
          }
          this.setDataValue('rating', normalized)
        }
      }
    },
    {
      tableName: 'Feedbacks',
      sequelize
    }
  )
}

export { Feedback as FeedbackModel, FeedbackModelInit }

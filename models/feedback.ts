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
          // Always sanitize recursively until the output is stable. A single sanitizeHtml() pass can be
          // bypassed with nested markup such as `<<script>Foo</script>iframe src="javascript:...">`,
          // whose output is itself a working payload.
          const sanitizedComment: string = security.sanitizeSecure(comment)
          challengeUtils.solveIf(challenges.persistedXssFeedbackChallenge, () => {
            return utils.contains(
              sanitizedComment,
              '<iframe src="javascript:alert(`xss`)">'
            )
          })
          this.setDataValue('comment', sanitizedComment)
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        set (rating: number) {
          this.setDataValue('rating', rating)
          challengeUtils.solveIf(challenges.zeroStarsChallenge, () => {
            return Number(rating) === 0
          })
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

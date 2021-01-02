import { extend, isUndefined } from 'lodash'
import Morphism from 'morphism'
import BaseModel from '.'

export default class BaseMj extends BaseModel {

    getMjmlSchema() {
        // DEPRECATED : Remove this and replace by .mjmlSchema

        if (!this.getSchema()) {
            return {}
        }

        return this.getSchema().mjmlObject
    }

    get mjmlSchema() {
        return !this.schemaObj ? {} : this.schemaObj.mjmlObject
    }
}

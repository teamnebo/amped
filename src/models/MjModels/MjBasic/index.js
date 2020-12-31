import { cloneDeep } from 'lodash'
import DEFAULT_ATTRIBUTES from './DefaultAttributes'
import BaseMj from '../Base'
import Schema from './Schema'
import Settings from './Settings'
import { TYPE_MJ_BASIC } from '../constant'

export default class MjBasic extends BaseMj {
    static type = TYPE_MJ_BASIC

    tagName = 'mj-basic'

    defaultAttributes = cloneDeep(DEFAULT_ATTRIBUTES)

    schema = Schema

    settings = Settings
}

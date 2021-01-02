import mjml2html from 'mjml-browser'
import { each } from 'lodash'

import transformMjStructure from './transformMjStructure'
import MjSection from '../../models/MjModels/MjSection'
import transformMjComponent from './transformMjComponent'

export default function transformStructureToMjml(config, params) {
    const _mjml = {
        tagName: 'mjml',
        attributes: {},
        children: []
    }

    const _transformContainer = transformMjComponent(params.container)

    const _childrenBody = {
        tagName: 'mj-body',
        attributes: _transformContainer.attributes,
        children: []
    }
    
    const _items = transformMjStructure(config, MjSection.type)
    each(_items, mjSection => {
        _childrenBody.children.push(mjSection)
    })


    _mjml.children.push(_childrenBody)

    console.log(JSON.stringify(_mjml));
    return mjml2html(_mjml)
}

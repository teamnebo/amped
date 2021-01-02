import React, { Component } from 'react'
import jQuery from 'jquery'
import mjml2html from 'mjml-browser'
import transformMjComponentAlone from '../../helpers/transformStructureToMjml/transformMjComponentAlone'
import BaseMj from '../../models/MjModels/Base'

export const previewComponent = ComposedComponent => {
    return ComposedComponent =>
        class extends Component {
            getIndex = () => {
                const { component } = this.props
                return component.getIndex()
            }

            getHtml = () => {
                const { component } = this.props

                let options = {
                    useMjmlConfigOptions: false,
                    mjmlConfigPath: null,
                    filePath: null
                };
                
                let result = '<div>Wooh!</div>';
                if (component instanceof BaseMj) {
                    const element = transformMjComponentAlone(component)
                    result = mjml2html(element, options)
                }

                return result
            }

            extractComponentHtml = html => {
                // TODO : Try to remove jQuery
                let tempDom = jQuery('<output>').append(jQuery.parseHTML(html))
                let content = jQuery('table', tempDom)
                    .wrap('<div></div>')
                    .parent()

                let _html = ''
                if (content.length > 0) {
                    _html = content.html()
                }

                return _html
            }

            getProps() {
                return {
                    ...this.props,
                    getIndex: this.getIndex,
                    getHtml: this.getHtml,
                    extractComponentHtml: this.extractComponentHtml
                }
            }

            render() {
                return <ComposedComponent {...this.getProps()} />
            }
        }
}

import React from 'react'

class Button extends React.Component {
    node: React.ReactElement
    constructor(options: {
        type: keyof HTMLElementTagNameMap,
        Name: string,
        OnClick?: () => void,
        Style?: React.CSSProperties,
    }) {
        super({})
        this.node = React.createElement(options.type)
        
    }
    render(): React.ReactNode {
        return this.node
    }
    appendTo(element: React.ReactElement): void {
        
    }
}

export default Button
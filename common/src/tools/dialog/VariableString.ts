import {DialogVariable} from "common/tools/dialog/DialogVariable";

export class VariableString {
    text: string;
    variables: DialogVariable[]

    constructor(text: string, variables: DialogVariable[]) {
        this.text = text;
        this.variables = variables;
    }

    render() {
        let renderedText = this.text;
        this.variables.forEach(variable => {
            renderedText = renderedText.replace(variable.name, variable.value())
        })
        return renderedText;
    }
}

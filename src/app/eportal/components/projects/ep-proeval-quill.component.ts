declare const Quill: any;
const Parchment = Quill.imports.parchment;

export const COLORERR = '#000000';
// const MARKEDCOLOR = '#66FF00';
export const MARKEDCOLOR = '#ff00ff';

/**
 * Trieda Variable pre kompozíciu a dekompozíciu html textu Quill rich text editora
 */
export class Variable extends Parchment.Embed {

    public static create(value: any): any {
        const node = super.create(typeof value === 'object' ? value.text : value);
        node.setAttribute('class', 'userblock');
        node.setAttribute('contenteditable', 'true');
        if (typeof value === 'object') {
            if (value.id) {
                node.setAttribute('data-id', value.id);
            }
            if (value.color) {
                node.setAttribute('style', `background-color: ${value.color}`);
            }
            node.textContent = value.text;
        }
        else {
            node.textContent = value;
        }
        return node;
    }

    public static value(node): any {
        const rgbToHex = (color: string): string => {
            const nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
                r = parseInt(nums[2], 10).toString(16),
                g = parseInt(nums[3], 10).toString(16),
                b = parseInt(nums[4], 10).toString(16);

            return '#' + (
                (r.length === 1 ? '0' + r : r) +
                (g.length === 1 ? '0' + g : g) +
                (b.length === 1 ? '0' + b : b)
            );
        };
        let color: string = COLORERR;
        if (node.style.backgroundColor !== '' && node.style.backgroundColor !== 'inherit') {
            color = rgbToHex(node.style.backgroundColor);
        }
        if (color !== COLORERR) {
            return {
                id: node.getAttribute('data-id'),
                text: node.textContent,
                color: color
            };
        }
        else {
            return {
                id: node.getAttribute('data-id'),
                text: node.textContent,
                color: 'rgb(255,255,255)'
            };
        }
    }

}

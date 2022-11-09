
const AttributeConfig = [
    {
        name: 'textarea',
        configs: [
            {
                text: 'Rows',
                name: 'rows',
                type: 'number'
            },
            {
                text: 'Cols',
                name: 'cols',
                type: 'number'
            }
        ]
    },
    {
        name: 'button',
        configs: [
            {
                text: 'Label',
                name: 'label',
                type: 'string'
            },
            {
                text: 'Class Name',
                name: 'className',
                type: 'string'
            },
            {
                text: 'Visible',
                name: 'visible',
                type: 'boolean'
            },
            
        ]
    }
];
export default AttributeConfig;
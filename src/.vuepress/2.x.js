module.exports = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            'overview',
        ],
    }, {
        title: "Endpoints",
        collapsable: false,
        children: prefix('endpoints', [
            'list',
            'status',
            'hours',
            'holidays',
            'timezones'
        ]),
    }
]

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}

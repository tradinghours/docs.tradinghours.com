module.exports = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            '/3.x/introduction',
            '/3.x/authentication',
            '/3.x/api-details',
        ],
    }, {
        title: "Market Status API",
        collapsable: false,
        children: [
            '/3.x/endpoints/find-markets',
            '/3.x/endpoints/market-details',
            '/3.x/endpoints/market-status',
            '/3.x/endpoints/local-time',
            '/3.x/endpoints/timezones',
        ],
    }, {
        title: "Enterprise API",
        collapsable: false,
        children: [
            '/3.x/enterprise/market-status',
            '/3.x/enterprise/trading-hours',
            '/3.x/enterprise/market-holidays',
            '/3.x/enterprise/currency-holidays',
            '/3.x/enterprise/regional-and-religious-holidays',
            '/3.x/enterprise/download',
        ],
    }
]
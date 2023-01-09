
// This is the language dictionary type. It is used to define the structure of the language files.
// The language file are located in the assets/xml/lang folder.
type langDict = {
    pageTitle: [
        {
            [key:string]:  [
                string
            ];
        }
    ]
    navigation: [
        {
            barter: [
                string
            ];
            carrack:  [
                string
            ];
        }
    ]
    items: [
        {
            [key:string]:  [
                {
                    name: [
                        string
                    ]
                    description: [
                        string
                    ]
                }
            ]

        }
    ]
    barter: [
        {
            left:[
                {
                    storageTitle: [
                        string
                    ],
                    lastSpecialBarterAt: [
                        string
                    ],
                    estimatedNext: [
                        string
                    ],
                    searchPlaceholder: [
                        string
                    ]
                }
            ]
            table:[
                {
                    name: [
                        string
                    ]
                    tier: [
                        string
                    ]
                    qty: [
                        string
                    ]
                }
            ],
            bottom:[
                {
                    left: [
                        {
                            title: [
                                string
                            ]
                        }
                    ]
                    right: [
                        {
                            totalStoragesValue: [
                                string
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    carrack:[
        {
            selectScreen: [
                {
                    title: [
                        string
                    ]
                }
            ],
            menu: [
                {
                    inventory: [
                        string
                    ],
                    tracker: [
                        string
                    ],
                }
            ]
            totalNeeded:[
                {
                    title: [
                        string
                    ],
                    daily: [
                        string
                    ],
                    coin: [
                        string
                    ],
                    barter: [
                        string
                    ]
                }
            ]
            type: [
                {
                    advance: [
                        string
                    ],
                    balance: [
                        string
                    ],
                    volante: [
                        string
                    ],
                    valor: [
                        string
                    ]
                }
            ],
            items: [
                {
                    [key:string]:  [
                        {
                            name: [
                                string
                            ]
                            description: [
                                string
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default langDict;
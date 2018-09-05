document.getElementById("mobile-container").appendChild(
    Workwell.ui.createList()
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 1")
                )
        )
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 2")
                )
        )
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 3")
                )
        )
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 4")
                )
        )
        .toHTMLElement()
);
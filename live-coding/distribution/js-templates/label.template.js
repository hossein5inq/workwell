document.getElementById("mobile-container").appendChild(
    Workwell.ui.createList()
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 1")
                )
                .addToRight(
                    Workwell.ui.createListItemLabel("Label 1")
                )
        )
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 2")
                )
                .addToRight(
                    Workwell.ui.createListItemLabel("Label 2")
                )
        )
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 3")
                )
                .addToRight(
                    Workwell.ui.createListItemLabel("Label 3")
                )
        )
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createListItemTitle("item 4")
                )
                .addToRight(
                    Workwell.ui.createListItemLabel("Label 4")
                )
        )
        .toHTMLElement()
);
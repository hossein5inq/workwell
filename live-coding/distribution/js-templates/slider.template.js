document.getElementById("mobile-container").appendChild(
    Workwell.ui.createSlider().toHTMLElement()
);

document.getElementById("mobile-container").appendChild(
    Workwell.ui.createList()
        .setHeader("List with a slider in an item")
        .add(
            Workwell.ui.createListItem()
                .addToCenter(
                    Workwell.ui.createSlider()
                )
        )
        .toHTMLElement()
);
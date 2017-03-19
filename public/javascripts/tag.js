$(document).ready(function() {
$('#myTags').tagit({

    // Options
    fieldName: "tag",
    availableTags: [],
    autocomplete: {delay: 0, minLength: 2},
    showAutocompleteOnFocus: false,
    removeConfirmation: false,
    caseSensitive: true,
    allowDuplicates: true,
    allowSpaces: false,
    readOnly: false,
    tagLimit: 10,
    singleField: false,
    singleFieldDelimiter: ',',
    singleFieldNode: null,
    tabIndex: null,
    placeholderText: null,

    // Events
    beforeTagAdded: function(event, ui) {
        console.log(ui.tag);
    },
    afterTagAdded: function(event, ui) {
        console.log(ui.tag);
    },
    beforeTagRemoved: function(event, ui) {
        console.log(ui.tag);
    },
    onTagExists: function(event, ui) {
        console.log(ui.tag);
    },
    onTagClicked: function(event, ui) {
        console.log(ui.tag);
    },
    onTagLimitExceeded: function(event, ui) {
        console.log(ui.tag);
    }

});
});
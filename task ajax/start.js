let Page = require('./page');

let start = (function() {
    window.page = new Page();
    page.showSearchBar();
})();

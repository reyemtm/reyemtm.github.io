//initiate search function
SimpleJekyllSearch({
  searchInput: document.getElementById('searchInput'),
  resultsContainer: document.getElementById('searchResults'),
  json: '/search.json',
  {% raw %}searchResultTemplate: '<h2><a href="{url}" style="color:ghostwhite;">{title}</a><h2><h3>{subtitle}</h3>',{% endraw %}
  noResultsText: 'No results found',
  limit: 4,
  fuzzy: false,
  exclude: ['Welcome']
});

//attempt to autofocus search input field when opened
/*var searchModal = document.getElementById('searchModal');
searchModal.addEventListener('')*/
/*document.getElementById("searchModal").focus();
$('#searchModal').show(function () {
    $('#search-input').focus();
});*/

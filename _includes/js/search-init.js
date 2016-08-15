//initiate search function
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/search.json',
  {% raw %}searchResultTemplate: '<p><dt><a href="{url}">{title}</a></dt><dd class="text-muted">{subtitle}</dd></p>',{% endraw %}
  noResultsText: 'No results found',
  limit: 5,
  fuzzy: false,
  exclude: ['Welcome']
});

//attempt to autofocus search input field when opened
$('#search').click(function() {
  setTimeout(function() { document.getElementById('search-input').focus();
  //console.log('timer');
  }, 500);
})

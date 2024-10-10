function initHoodsSelect(el, hoods) {
  const listEl = el.querySelector('ul');
  const searchEl = el.querySelector('.search');

  const hoodListItems = {};

  function initListItems() {
    for (const hood of hoods) {
      const hoodName = hood.properties['NAME'];
      const item = document.createElement('li');
      item.innerHTML = `
        <label>
          <input name = "neighborhood" type = "checkbox" value = "${ hood.properties['LISTNAME']}" >
          ${ hood.properties['LISTNAME']}
        </label>  
      `;
      hoodListItems[hoodName] = item;
    }
  }

  initListItems();
  console.log(hoodListItems);

  // Populate the list of data
  function populateList(hoods) {
    listEl.innerHTML = '';

    hoods = hoods.sort((a, b) => {
      return a.properties['LISTNAME'].localeCompare(
        b.properties['LISTNAME']
      );
    });

    for (const hood of hoods) {
      const hoodName = hood.properties['NAME'];
      const item = hoodListItems[hoodName];
      listEl.append(item);
    }
  }

  populateList(hoods);

  // Capture the search input
  searchEl.addEventListener('input', (evt) => {
    const filteredHoods = hoods.filter((hood) => {
      const searchValue = searchEl.value.toLowerCase();
      const hoodName = hood.properties['LISTNAME'].toLowerCase();
      return hoodName.includes(searchValue);
    });
    console.log(searchEl.value);

    populateList(filteredHoods);
  });
}

export { initHoodsSelect };

import "./styles/index.scss";
import loadDataSet from './scripts/loadDataSet';

window.addEventListener("DOMContentLoaded", () => {
    require('./scripts/modal');
    
    const dataSets = {
        "NYC's Best Breweries": "./data/NYC Beers.csv",
        "Some Data I Made Up": "./data/income.csv"
    };

    // Load the first dataset
    const setNames = Object.keys(dataSets);
    const file = dataSets[setNames[0]];
    loadDataSet(file);

    const picker = document.getElementById('dataset-dropdown');
    setNames.forEach(set => {
        let option = document.createElement('option');
        option.setAttribute('value', dataSets[set]);
        option.innerHTML = set;
        picker.appendChild(option);
    });
    picker.addEventListener('change', e => {
        e.stopPropagation();
        loadDataSet(e.target.value);
    });
    
    // Close the modal or dropdown menu if the user clicks outside of it
    window.onclick = e => {
        if (!e.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("fn-dropdown");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }

        var modal = document.getElementById("aboutModal");
        if (e.target == modal) {
            modal.style.display = "none";
        }
    };
});
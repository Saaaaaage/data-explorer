import "./styles/index.scss";
import updateChart from './scripts/update_chart';
import buildLists from './scripts/build_field_lists';
import getOptions from './scripts/get_options';
import * as d3 from "d3";



window.addEventListener("DOMContentLoaded", () => {
    const file = "../data/income.csv";

    d3.csv(file, d => d3.autoType(d)).then(rawData => {
        window.DataExplorer = {};
        DataExplorer.rawData = rawData;

        const fields = buildLists(rawData);

        let options = getOptions();

        updateChart(options);
    });

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("fn-dropdown");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
});
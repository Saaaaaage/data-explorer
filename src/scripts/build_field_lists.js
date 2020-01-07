import getOptions from './get_options';
import updateChart from './update_chart';

export default (rawData) => {
    let dimensions = [];
    let metrics = [];
    rawData.columns.forEach(col => {
        if (!!parseInt(rawData[0][col])) {
            metrics.push(col);
        } else {
            dimensions.push(col);
        }
    });

    const dimUl = document.getElementById("dim-ul");
    const metUl = document.getElementById("met-ul");

    dimensions.forEach(dim => {
        const dimItem = document.createElement("li");
        dimItem.innerHTML = dim;
        dimItem.addEventListener("click", e => {
            Array.from(dimUl.getElementsByClassName('active')).forEach(li => {
                li.classList.remove('active');
            });
            e.target.classList.add('active');
            updateChart(getOptions());
        });
        dimItem.dataset.fn = 'sum';
        dimItem.dataset.field = dim;
        dimUl.appendChild(dimItem);
    });
    dimUl.firstElementChild.classList.add('active');

    metrics.forEach(met => {
        // Create list element
        const metLi = document.createElement("li");

        // add the metric name to the LI
        const metName = document.createElement("span");
        metName.innerHTML = met;
        metLi.appendChild(metName);

        // add the function dropdown to the LI
        const metFn = document.createElement('i');
        metFn.classList = 'fas fa-angle-down';
        metFn.innerHTML = `<div class="fn-dropdown">
                                <div class="fn-item" data-fn="sum">Sum</div>
                                <div class="fn-item" data-fn="average">Average</div>
                                <div class="fn-item" data-fn="max">Max</div>
                                <div class="fn-item" data-fn="min">Min</div>
                            </div>`;
        metLi.appendChild(metFn);

        metFn.querySelectorAll(".fn-item").forEach(fn => {
            fn.addEventListener("click", e => {

                e.currentTarget.closest('li').dataset.fn = e.currentTarget.dataset.fn;

                // fire D3 chart update
                updateChart(getOptions());
            });
        });


        // add event listener to the metric name element
        metName.addEventListener("click", e => {
            // remove active class from parent UL LIs
            Array.from(metUl.getElementsByClassName('active')).forEach(li => {
                li.classList.remove('active');
            });

            // add active class to the parent LI
            e.currentTarget.closest('li').classList.add('active');

            // fire D3 chart update
            updateChart(getOptions());
        });

        // add dropdown event listener to the f(n) dropdown
        metFn.addEventListener("click", e => {
            e.stopPropagation();
            e.currentTarget.firstElementChild.classList.toggle("show");
        });
        metFn.setAttribute('tabindex', "0");
        metFn.addEventListener("blur", e => {
            e.stopPropagation();
            e.currentTarget.querySelector(".fn-dropdown").classList.remove('show');
        });

        // add met data to the LI
        metLi.dataset.fn = 'sum';
        metLi.dataset.field = met;

        // add the LI to the UL
        metUl.appendChild(metLi);
    });
    metUl.firstElementChild.classList.add('active');

    return {
        metrics: metrics,
        dimensions: dimensions
    };
};
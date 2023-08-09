import "./sass/main.scss";
import dataJson from "./data/data.json";
import renderJobs from "./components/utils/renderJobs";
import renderFilterBar from "./components/utils/renderFilterBar";

const jobsContainer = document.querySelector(".job-list");

function filtering(filters) {
  return dataJson.filter((job) =>
    filters.every((filter) => {
      const [property, value] = Object.entries(filter)[0];
      return job[property] && job[property].includes(value);
    }),
  );
}

let currentStates = [];

jobsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".skill");
  if (!btn) return;
  const { catagory } = btn.dataset;
  const { field } = btn.dataset;

  currentStates.push({ [catagory]: field });
  // console.log(currentStates);
  const newList = filtering(currentStates);
  // console.log(newList);

  renderJobs(newList);
  renderFilterBar(currentStates);
});

renderJobs(dataJson);

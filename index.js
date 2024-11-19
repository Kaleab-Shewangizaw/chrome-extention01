const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let myLeads = [];

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`;
  }
  ulEl.innerHTML = listItems;
}

//it is ot showing up on the browser because the render function is not called


saveBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);

  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  // I called the function here but it is not working because the render function is not defined
});

deleteBtn.addEventListener("click", function () {
  myLeads = []
  localStorage.clear()
  render(myLeads)
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({active:true, currentWIndow:true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
  console.log(tabs)
});

// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    let sampleObject = metadata.filter((item) => parseInt(sample) === item.id);
    console.log(sampleObject)
    // Use d3 to select the panel with id of `#sample-metadata`
    let sampleMetadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let i = 0; i < sampleObject.length; i++){
      let object = sampleObject[i];
      let id = object.id;
      let ethnicity = object.ethnicity;
      let gender = object.gender;
      let age = object.age;
      let location = object.location;
      let bbtype = object.bbtype;
      let wfreq = object.wfreq;
      let sampleString = 
        `ID: ${id} <br>
        Ethnicity: ${ethnicity} <br>
        Gender: ${gender} <br>
        Age: ${age} <br>
        Location: ${location} <br>
        BBTYPE: ${bbtype} <br>
        WFREQ: ${wfreq}`;
      sampleMetadata.append("value").html(sampleString)
    };
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++){
      let options = dropdown.append("option");
      options.text(names[i])
      options.attr("value", names[i])
    };

    // Get the first sample from the list
    let firstSample = names[0];
    
    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();

// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    let sampleObject = metadata.filter((item) => parseInt(sample) === item.id);
    
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
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleObject = samples.filter((item) => item.id === sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleObject.otu_ids;
    let otu_labels = sampleObject.otu_labels;
    let sample_values = sampleObject.sample_values;
    
    // Build a Bubble Chart
    let traceBubble = {
      x: otu_ids,
      y: sample_values,
      label: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };

    let dataBubble = [traceBubble]

    let layoutBubble = {
      title: "Bacteria Cultures Per Sample"
    }

    // Render the Bubble Chart
    Plotly.newPlot("bubble", dataBubble, layoutBubble)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yTicks = otu_ids.map(id => id)
    
    // Build a Bar 
    let indices = sampleObject.sample_values.map((value, index) => index);
    let sortedIds = indices.map(index => sampleObject.otu_ids[index]);
    let sortedLabels = indices.map(index => sampleObject.otu_labels[index]);
    let sortedValues = indices.map(index => sampleObject.sample_values[index]);

    let slicedIds = sortedIds.slice(0, 10);
    let slicedLabels = sortedLabels.slice(0, 10);
    let slicedValues = sortedValues.slice(0, 10);

    let traceBar = {
      type: "bar",
      x: slicedValues,
      y: slicedIds,
      orientation: "h"
    };

    let dataBar = [traceBar]

    let layoutBar = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot("bar", dataBar, layoutBar)
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

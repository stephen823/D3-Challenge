


    

d3.csv("./assets/data/data.csv").then(function(data){
    console.log(data);

    data.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        console.log("Healthcare:", data.healthcare);
        console.log("Poverty:", data.poverty);
    
    });

    //Create list 
    var lack_healthcare=data.map(socialdata => socialdata.healthcare);
    console.log(lack_healthcare);
    var poverty_rate=data.map(socialdata => socialdata.poverty);
    console.log(poverty_rate);
    var state_name=data.map(socialdata => socialdata.abbr);
    console.log(state_name);

    //Define height and width of svg
    var svgheight=600;
    var svgwidth=900;

    //Define margin
    var margin={
        top:50,
        bottem:90,
        left:90,
        right:20
    }

    //Define chart width
    var chartheight=svgheight-margin.top-margin.bottem;
    var chartwidth=svgwidth-margin.left-margin.right;

    //Create svg box
    var svg=d3.select("#scatter")
    .append("svg")
    .attr("width",svgwidth)
    .attr("height",svgheight);

    //Shift svg content by the margins
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("id","plot");

    //change functions
    //function to create xscale
    function xScale(SocialData, xfactor) {
        var xdata=SocialData.map(d=>d[xfactor]);
        console.log(xdata);
        console.log(xfactor);
        console.log([d3.min(xdata),d3.max(xdata)]);
        // create scales
        var xlinearscale = d3.scaleLinear()
          .domain([d3.min(xdata)-0.1*(d3.max(xdata)-d3.min(xdata)),d3.max(xdata)])
          .range([0,chartwidth]);
        
        console.log(SocialData.map(d=>xlinearscale(d[xfactor])));
        return xlinearscale;
      }

    //function to create yscale
    function yScale(SocialData, yfactor) {
        var ydata=SocialData.map(d=>d[yfactor]);
        // create scales
        var ylinearscale = d3.scaleLinear()
          .domain([d3.min(ydata)-5,d3.max(ydata)])
          .range([chartheight,0]);
      
        return ylinearscale;
      
      }


    // function for updating xAxis upon click on axis label
    function renderxaxes(newxscale, Xaxis) {
        var BottomAxis = d3.axisBottom(newxscale);
      
        Xaxis.transition()
          .duration(1000)
          .call(BottomAxis);
      
        return Xaxis;
        }

    // function for updating yAxis upon click on axis label
    function renderyaxes(newyscale, Yaxis) {
        var LeftAxis = d3.axisLeft(newyscale);
      
        Yaxis.transition()
          .duration(1000)
          .call(LeftAxis);
      
        return Yaxis;
    }

    
    
    //function for circles
    function renderCircles(circlesgroup,xfactor,yfactor) {
    circlesgroup.transition()
      .duration(1000)
      .attr("cx",d => xscale(d[xfactor]))
      .attr("cy", d => yscale(d[yfactor]));
    
    return circlesgroup; 
    }    

    //function for circle labels
    function renderlabels(circlesgroup_label,xfactor,yfactor) {
      circlesgroup_label.transition()
        .duration(1000)
        .attr("dx",d => xscale(d[xfactor])-6)
        .attr("dy", d => yscale(d[yfactor])+6);
      
      return circlesgroup_label; 
      }    


    // Initial Params
    var xfactor = "poverty";
    var yfactor = "healthcare";

   
    //Initial set up
    //Initial X and Y scales
    var xscale=xScale(data,"poverty");
    console.log(xscale);
    var yscale=yScale(data,"healthcare");
    console.log(yscale);

    console.log(yscale);
    console.log(xscale);   
    
    //Set up initial X and Y axis
    var yaxis = d3.axisLeft(yscale);
    var xaxis = d3.axisBottom(xscale);

    //Add x axis 
    var Xaxis=chartGroup.append("g")
    .attr("transform", `translate(0, ${chartheight})`)
    .call(xaxis);

    //Add y axis
    var Yaxis=chartGroup.append("g")
    .call(yaxis);

    // Create group for x and yaxis labels
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartwidth / 2}, ${chartheight + 20})`);

    
    //Add x axis labels
    var Poverty_Label = labelsGroup.append("text")
    .attr("id","xtext")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

    var Age_Label = labelsGroup.append("text")
    .attr("id","xtext")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

    var Income_Label = labelsGroup.append("text")
    .attr("id","xtext")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

    //Add y axis labels
    var Healthcare_Label=chartGroup.append("text")
    .attr("id","ytext")
    .attr("transform", "rotate(-90)")
    .attr("y", 40 - margin.left)
    .attr("x", 0 - (chartheight / 2))
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .attr("dy", "1em")
    .classed("yaxis-text", true)
    .text("Lack Healthcare (%)");

    var Smokes_Label=chartGroup.append("text")
    .attr("id","ytext")
    .attr("transform", "rotate(-90)")
    .attr("y", 20 - margin.left)
    .attr("x", 0 - (chartheight / 2))
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .attr("dy", "1em")
    .classed("yaxis-text", true)
    .text("Smokes (%)");

    var Obesity_Label=chartGroup.append("text")
    .attr("id","ytext")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartheight / 2))
    .attr("value", "obesity") // value to grab for event listener
    .classed("inactive", true)
    .attr("dy", "1em")
    .classed("yaxis-text", true)
    .text("Obese (%)");

    var data1=[];

    for(i=0;i<data.length;i++){
        data1.push({
            "x":data[i].poverty,
            "y":data[i].healthcare,
            "label":data[i].abbr
        }
        );
    }
    console.log(data);
    var newdatax=data.map(socialdata => socialdata[xfactor]);
    console.log(newdatax);
    var newdatay=data.map(socialdata => socialdata[yfactor]);
    console.log(newdatay);
    var abbr=data.map(socialdata => socialdata.abbr);
    console.log(abbr);
  

    function data_plot(xfactor,yfactor){
      console.log(data);
      var newdatax=data.map(socialdata => socialdata[xfactor]);
      console.log(newdatax);
      var newdatay=data.map(socialdata => socialdata[yfactor]);
      console.log(newdatay);
      var abbr=data.map(socialdata => socialdata.abbr);
      console.log(abbr);

      data2=[]
      for(i=0;i<data.length;i++){
        data2.push({
          "x":newdatax[i],
          "y":newdatay[i],
          "label":data[i].abbr
          })
        }
        return data2;
      }


  
      data2=data_plot(xfactor,yfactor);
      console.log(xfactor);
      console.log(yfactor);
      console.log(data.map(d => xscale(d[xfactor])));
      console.log(data.map(d => yscale(d[yfactor])));
      console.log(yfactor);
      //Plot initial circle
      var circlesgroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xscale(d[xfactor]))
      .attr("cy", d => yscale(d[yfactor]))
      .attr("r", 9)
      .attr("fill","lightblue");

      var circlesgroup_label = chartGroup.selectAll("#circle_label")
      .attr("id","circle_label")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr("dx", d => xscale(d[xfactor])-6)
      .attr("dy", d => yscale(d[yfactor])+6)
      .attr('font-size',8)
      .attr("fill", "#ffffff");
      


    //X axis event listener
    labelsGroup.selectAll("#xtext")
    .on("click", function() {

    
        //Obtain value by selection
        var value = d3.select(this).attr("value");
        console.log(value);
        if (value !== xfactor) {
          
          //change parameter value
          console.log(xfactor);
          console.log(value);
          function change(){return value}
          xfactor=change();
          console.log(xfactor);

          //change x scale
          xscale = xScale(data, xfactor);

          //Update xaxis
          Xaxis = renderxaxes(xscale, Xaxis);

          //update circles
          circlesgroup=renderCircles(circlesgroup, xfactor,yfactor);

          //Update circles
          circlesgroup_label=renderlabels(circlesgroup_label,xfactor,yfactor);

          


            // changes classes to change bold text
            if (value === "age") {
              Age_Label
                .classed("active", true)
                .classed("inactive", false);
              Poverty_Label
                .classed("active", false)
                .classed("inactive", true);
              Income_Label
                .classed("active", false)
                .classed("inactive", true);
            }
            else if(value="income") {
              Age_Label
              .classed("active", false)
              .classed("inactive", true);            
              Poverty_Label
              .classed("active", false)
              .classed("inactive", true);
              Income_Label
              .classed("active", true)
              .classed("inactive", false);                
              }
              else {
                Age_Label
                .classed("active", false)
                .classed("inactive", true);
                Poverty_Label
                .classed("active", true)
                .classed("inactive", false);
                Income_Label
                .classed("active", false)
                .classed("inactive", true);   
              }
            }  
        

            else if (value === xfactor)  {
                console.log(value);
                //xfactor=value;
                Age_Label
                .classed("active", false)
                .classed("inactive", true);
                Poverty_Label
                .classed("active", true)
                .classed("inactive", false);
                Income_Label
                .classed("active", false)
                .classed("inactive", true);
                
              
    
                xscale = xScale(data, xfactor);
                console.log(xfactor);
                console.log(value);
                //Update xaxis
                Xaxis = renderxaxes(xscale, xfactor);}
              });     
        
    


    //Y axis event listener
    chartGroup.selectAll("#ytext")
    .on("click", function() {
        //Obtain value by selection
        var value = d3.select(this).attr("value");
        console.log(value);
        if (value !== yfactor) {
          
          //change parameter value
          console.log(yfactor);
          console.log(value);
          function change(){return value}
          yfactor=change();
          console.log(yfactor);

          //change x scale
          yscale = yScale(data, yfactor);

          //Update xaxis
          Yaxis = renderyaxes(yscale, Yaxis);

          //Update circles
          circlesgroup=renderCircles(circlesgroup, xfactor,yfactor);

          //Update circles
          circlesgroup_label=renderlabels(circlesgroup_label,xfactor,yfactor);

            // changes classes to change bold text
            if (value === "smokes") {
              Smokes_Label
              .classed("active", true)
              .classed("inactive", false);
              Healthcare_Label
              .classed("active", false)
              .classed("inactive", true);
              Obesity_Label
              .classed("active", false)
              .classed("inactive", true);
            }
            else if(value="obesity") {
              Smokes_Label
              .classed("active", false)
              .classed("inactive", true);            
              Healthcare_Label
              .classed("active", false)
              .classed("inactive", true);
              Obesity_Label
              .classed("active", true)
              .classed("inactive", false);                
              }
              else {
                Smokes_Label
                .classed("active", false)
                .classed("inactive", true);
                Healthcare_Label
                .classed("active", true)
                .classed("inactive", false);
                Obesity_Label
                .classed("active", false)
                .classed("inactive", true);   
              }
            }  
        

            else if (value === yfactor)  {
                console.log(value);
                //xfactor=value;
                Smokes_Label
                .classed("active", false)
                .classed("inactive", true);
                Healthcare_Label
                .classed("active", true)
                .classed("inactive", false);
                Obesity_Label
                .classed("active", false)
                .classed("inactive", true);
                
              
    
                yscale = yScale(data, yfactor);
                console.log(yfactor);
                console.log(value);
                //Update xaxis
                Yaxis = renderyaxes(yscale,yfactor);
              
                circlesgroup=renderCircles(circlesgroup, xfactor,yfactor);
              }
              });     
        
    });




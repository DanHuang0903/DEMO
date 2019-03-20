function relationship(id,id2){
	var container = $(id).parent().attr("id");
	var width = $(id).width();
	var height = 500;
	var nodes=[{name:"dataset1", size:100},{name:"dataset2",size:300},
			   {name:"dataset3",size:50},{name:"dataset4",size:35},
			   {name:"dataset5",size:90},{name:"dataset6",size:180},
			   {name:"dataset7",size:200},{name:"dataset8",size:230},
			   {name:"dataset9",size:190},{name:"dataset10",size:69},
			   {name:"dataset11",size:220},{name:"dataset12",size:310},
			   {name:"dataset13",size:180},{name:"dataset14",size:90},
			   {name:"dataset15",size:290},{name:"dataset16",size:49},
			   {name:"dataset17",size:70},{name:"dataset18",size:100},
			   {name:"dataset19",size:69},{name:"dataset20",size:160},
			   {name:"dataset21",size:188},{name:"dataset22",size:210},
			   {name:"dataset23",size:199},{name:"dataset24",size:300},
			   {name:"dataset25",size:90},{name:"dataset26",size:100},
			   {name:"dataset27",size:200},{name:"dataset28",size:280},
			   {name:"dataset29",size:110},{name:"dataset30",size:180},
			   {name:"dataset31",size:99}];

	var datasize = [100, 300,50,35,90,180,200,230,190,69,220,310,180,90,290,49,70,100,69,160,188,210,199,300,90,100,200,280,110,180,99];

	var edges = [{source:0, target:1},{source:0,target:3},
				 {source:1, target:0},{source:1,target:13},
				 {source:1, target:15},{source:1,target:19},
				 {source:1, target:30},{source:1,target:23},
				 {source:2, target:3},{source:2,target:9},
				 {source:3, target:7},{source:3,target:19},
				 {source:4, target:8},{source:4,target:9},
				 {source:4, target:12},{source:4,target:29},
				 {source:4, target:23},{source:4,target:30},
				 {source:5, target:6},{source:5,target:9},
				 {source:7, target:3},{source:8,target:4},
				 {source:8, target:10},{source:8,target:19},
				 {source:9, target:2},{source:9,target:4},
				 {source:9, target:5},{source:10,target:8},
				 {source:12, target:4},{source:13,target:1},
				 {source:14, target:20},{source:14,target:29},
				 {source:14, target:21},{source:14,target:28},
				 {source:15, target:1},{source:15,target:19},
				 {source:18, target:19},{source:19,target:1},
				 {source:19, target:3},{source:19,target:8},
				 {source:19, target:15},{source:19,target:18},
				 {source:20, target:14},{source:21,target:22},
				 {source:22, target:21},{source:23,target:27},
				 {source:23, target:26},{source:23,target:29},
				 {source:24, target:25},{source:25,target:24},
				 {source:26, target:30},{source:27,target:23},
				 {source:28, target:30},{source:29,target:4},
				 {source:29, target:14},{source:30,target:1},
				 {source:30, target:1}];
		
		var svg = d3.select(id)
					.append("svg")
					.attr("width",width)
					.attr("height",height);
		

		function draw(width, height){
		
		var force = d3.layout.force()
					.nodes(nodes)
					.links(edges)
					.size([width,height])
					.linkDistance(width/10)
					.charge([-400]);
			force.start();

		

		var svg_edges = svg.selectAll("line")
							.data(edges)
							.enter()
							.append("line")
							.style("stroke","#ccc")
							.style("stroke-width",1);

		var rScale = d3.scale.linear()
					.domain([30,350])
					.range([width/80,width/40]);
		var color = d3.interpolate("#CC0066","#330019");
		var colorScale = d3.scale.linear()
								.domain([0,30])
								.range([0,1]);

		var colorC = d3.scale.category20();

		var svg_nodes = svg.selectAll("circle")
						.data(nodes)
						.enter()
						.append("circle")
						.attr("r",function(d,i){
							return rScale(d.size);
						})
						.style("fill",function(d,i){
							return colorC(i);
						})
						.on("mouseover",function(d,i){
							svg_edges.style("stroke",function(edge){
								if(edge.source == d || edge.target == d){
									return "red";
								}
								else{
									return "#ccc";
								}

							});

							svg_edges.style("stroke-width",function(edge){
								if(edge.source == d || edge.target == d){
									return 2;
								}
								else{
									return 1;
								}
							})
						})
						.on("mouseout",function(d,i){
							svg_edges.style("stroke","#ccc");
							svg_edges.style("stroke-width",1);
						});

		var svg_texts = svg.selectAll("text")
						.data(nodes)
						.enter()
						.append("text")
						.style("fill","gray")
						.attr("dx",20)
						.attr("dy",8)
						.text(function(d,i){
							return d.name;
						});


			force.on("tick",function(){
				svg_edges.attr("x1",function(d){
					return d.source.x;
				})
				.attr("y1",function(d){
					return d.source.y
				})
				.attr("x2",function(d){
					return d.target.x;
				})
				.attr("y2",function(d){
					return d.target.y;
				});

			
				svg_nodes.attr("cx",function(d){
					return d.x;
				})
				.attr("cy",function(d){
				
					return d.y;
				});


		

			
				svg_texts.attr("x",function(d){
					return d.x;
				})
				.attr("y",function(d){
					return d.y;
				});
			});

		}

		draw(width,height);

		function histogram(id2, dataset){
				var inner = 10
				var width = $(id2).width();



				var colorScale = d3.scale.linear()
									.domain([0,d3.max(dataset)])
									.range(['red','green']);

				var color = d3.scale.category10();

				var svg = d3.select(id2).append("svg")
							.attr("width", width)
							.attr("height", height);

				var pie = d3.layout.pie();
				var piedata = pie(dataset);
				

				var outerRadius = 150;
				var innerRadius = inner;

				var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius)
							.cornerRadius(3);


				
				

				var arcs = svg.selectAll("g")
							.data(piedata)
							.enter()
							.append("g")
							.attr("transform", "translate("+width/5+","+(height/2 - 100)+")")
							.attr("stroke-width", "1px")
							.attr("stroke","white");

					var current;
					arcs.append("path")
						.attr("fill",function(d,i){
							  return color(i);
						})
						.on("mouseover",function(d,i){
								current = color(i);
								d3.select(this)
								.attr("fill", function(d,i){
									return d3.rgb(current).darker().darker();
								})
							})
						.on("mouseout", function(d,i){
							d3.select(this)
							.attr("fill", function(d,i){
								return d3.rgb(current);
							})
						})
						.transition()
						.delay(function(d,i){
							return i*50;
						})
						.duration(300)
						.ease("cubic")
						.attr("d", function(d) {
						 return arc(d);
						});

						arcs.append("text")
						.attr("fill","gray")
						.style("fill","black")
						.style("font-size",".7em")
						.style("font-weight","100")
						.transition()
						.delay(700)
						.ease("elastic")
						.duration(500)
						.attr("transform",function(d){
							//return "translate("+arc.centroid(d)+")";
							var c = arc.centroid(d),
					        x = c[0],
					        y = c[1],
					        // pythagorean theorem for hypotenuse
					        h = Math.sqrt(x*x + y*y);
					    	return "translate(" + (x/h * 130) +  ',' +
					      	 (y/h * 130) +  ")"; 
						})
						.attr("text-anchor","middle")
						.text(function(d,i){
							return i;
						});



	
		}
	//	histogram(id2,datasize);

			d3.select("body").selectAll("a")
			.on("click",function(){
				d3.selectAll("a").classed("active", false);

				var bt = d3.select(this).classed("active",true);
				var btid = bt.attr("id");
				if(btid == "size"){
					showSize(width/2,height);
					
				
				
				}
			})
			function showSize(w,h){
				svg.transition()
				.duration(800)
				.ease("linear")
				.attr("width",w);
				d3.selectAll("circle").remove();
				d3.selectAll("line").remove();
				d3.selectAll("text").remove();
				
				d3.select(id).classed("col-sm-9", false);
				d3.select(id2).classed("col-sm-1", false);

				d3.select(id)
				.transition()
				.delay(1000)
				.duration(1000)
				.ease("linear")
				.attr("class","col-sm-5");

				draw(w,h);

				
				d3.select(id2).transition()
					.delay(1000)
					.duration(1000)
					.ease("linear")
					.attr("class","col-sm-5")
					.style("display","block");

					histogram(id2,datasize);

			}

}
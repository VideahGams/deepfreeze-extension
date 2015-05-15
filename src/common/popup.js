var DeepFreezePopup = {

	init: function() {

		kango.invokeAsync('kango.storage.getItem', 'foundJournos', function(data) {

			kango.invokeAsync('kango.storage.getItem', 'foundLevels', function(levels) {

				foundJournos = data

				if (foundJournos.length > 0) {

					$('#noFoundLabel').hide();

					var tableDiv = document.getElementById("journalistTable")
					var table = document.createElement("table")
					var tableBody = document.createElement("tbody")

					table.style.borderCollapse = "seperate"
					table.style.borderSpacing = "11px 1px"

					table.appendChild(tableBody);

					foundJournos.sort();

					for (i = 0; i < foundJournos.length; i++) {

						var tr = document.createElement("tr");
						var td = document.createElement("td");
						var div = document.createElement("div");
						var lvl = document.createElement("div");
						var link = document.createElement("div");

						div.style.width = "250px"
						div.style.height = "50px"
						div.className = "listing"

						lvl.style.width = "50px"
						lvl.style.height = "50px"
						lvl.style.backgroundColor = "#847575"
						lvl.style.color = "white"
						lvl.style.float = "left"
						lvl.style.textAlign = "center"
						lvl.style.lineHeight = "50px"
						lvl.style.verticalAlign = "middle"
						lvl.style.fontSize = "12px"
						lvl.innerHTML = levels[i]
						
						// This generates a color intensity from the journalists level.
						// It's not the exact same as what DeepFreeze actually uses, but it's close enough :V

						var r = 132
						var g = 117
						var b = 117
						var amount = parseInt(levels[i]);

						for (j = 0; j < amount; j++) {

							r = r + 4
							g = g - 9
							b = b - 9

						}

						lvl.style.backgroundColor = "rgb("+r+","+g+","+b+")"

						link.style.width = "200px"
						link.style.height = "50px"
						link.style.float = "left"
						link.style.lineHeight = "50px"
						link.style.textAlign = "center"
						link.style.verticalAlign = "middle"
						link.innerHTML = foundJournos[i]

						div.appendChild(lvl);
						div.appendChild(link);
						td.appendChild(div);
						tr.appendChild(td);
						tableBody.appendChild(tr);

					}

					tableDiv.appendChild(table)

				} else {

					$('#refresh').text('Scan')

				}

			});

		});

		$('#refresh').click(function(event) {

			kango.invokeAsync("kango.storage.getItem", "journoList", function(journoList) {

				kango.browser.tabs.getCurrent(function(tab) {

					var data = {
					journos: journoList
					}

					tab.dispatchMessage("generateJournos", data)
					KangoAPI.closeWindow();

				});

			});

		});

	}

};

KangoAPI.onReady(function() {

	DeepFreezePopup.init();

});
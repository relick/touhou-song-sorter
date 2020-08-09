var nLastID = -1;

function next()
{
	showDataForTitle(nLastID + 1);
}

function showDataForTitle(nID)
{
	nLastID = nID;

	const output = getID("debugOutput");
	output.innerHTML = "";

	if(nID >= 0 && nID < ary_TitleData.length)
	{
		const title = output.appendChild(createElement('div'));
		title.appendChild(createText(nID + " - '" + ary_TitleData[nID] + "'"));
		
		const table = output.appendChild(createElement('table'));
		setClass(table, 'debugTable');
		const tableBody = table.appendChild(createElement('tbody'));

		for(var i = 0; i < ary_CharacterData.length; ++i)
		{
			if(ary_CharacterData[i][2][nID] == 1)
			{
				const row = tableBody.insertRow(-1);

				// Name
				const name = row.insertCell(-1);
				name.appendChild(createText(ary_CharacterData[i][1]));

				// Other titles
				const otherTitles = row.insertCell(-1);
				for(var j = 0; j < ary_TitleData.length; ++j)
				{
					if(j != nID && ary_CharacterData[i][2][j] == 1)
					{
						const otherTitle = otherTitles.appendChild(createElement('span'));
						otherTitle.appendChild(createText(ary_TitleData[j]));
					}
				}

				// Image
				const imageCell = row.insertCell(-1);
				const image = imageCell.appendChild(createElement('img'));
				image.src = "../images/" + ary_CharacterData[i][3];

				// Youtube
				const youtubeCell = row.insertCell(-1);
				const youtube = youtubeCell.appendChild(createElement("iframe"));
				youtube.width = "500";
				youtube.height = "180";
				youtube.frameBorder = "0";
				youtube.src = str_YouPath + ary_CharacterData[i][4];
				
				// Title name
				const titleName = row.insertCell(-1);
				titleName.appendChild(createText(ary_CharacterData[i][5]));

				// Abbreviation
				const abbrev = row.insertCell(-1);
				abbrev.appendChild(createText(ary_CharacterData[i][6]));

				// Stage
				const stage = row.insertCell(-1);
				stage.appendChild(createText(ary_CharacterData[i][7]));

				// Is arrange
				const isArrange = row.insertCell(-1);
				if(ary_CharacterData[i][8] == 1)
				{
					isArrange.appendChild(createText("Arrange"));
					isArrange.style = "background-color: rgb(250, 100,100)";
				}
				else
				{
					isArrange.appendChild(createText("Not arrange"));
				}

				// any/boss/stage
				const bossStage = row.insertCell(-1);
				if(ary_CharacterData[i][9] == 0)
				{
					bossStage.appendChild(createText("Any/All"));
					bossStage.style = "background-color: rgb(250, 100,100)";
				}
				else if(ary_CharacterData[i][9] == 1)
				{
					bossStage.appendChild(createText("Boss"));
					bossStage.style = "background-color: rgb(100, 250,100)";
				}
				else if(ary_CharacterData[i][9] == 2)
				{
					bossStage.appendChild(createText("Stage"));
					bossStage.style = "background-color: rgb(100, 100,250)";
				}
				else if(ary_CharacterData[i][9] == 3)
				{
					bossStage.appendChild(createText("Boss+Stage"));
					bossStage.style = "background-color: rgb(100, 250,250)";
				}

			}
		}
	}
	else
	{
		output.appendChild(createText(nID + " is not a correct title ID"));
	}
}
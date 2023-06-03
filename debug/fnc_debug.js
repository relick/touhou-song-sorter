var nLastID = -1;
const ary_TitleData = Object.values(TITLE);

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
		title.appendChild(createText(nID + " - '" + ary_TitleData[nID].name + "'"));
		
		const table = output.appendChild(createElement('table'));
		setClass(table, 'debugTable');
		const tableBody = table.appendChild(createElement('tbody'));

		for(var i = 0; i < ary_SongData.length; ++i)
		{
			if(ary_SongData[i][TRACK_TITLES].has(ary_TitleData[nID]))
			{
				const titleData = getTitleData(ary_SongData[i][TRACK_TITLE_DATA]);

				const row = tableBody.insertRow(-1);

				// Name
				const name = row.insertCell(-1);
				name.appendChild(createText(ary_SongData[i][TRACK_NAME]));

				// Other titles
				const otherTitles = row.insertCell(-1);
				for (const elem of ary_SongData[i][TRACK_TITLES]) {
					if (elem !== ary_TitleData[nID]) {
						const otherTitle = otherTitles.appendChild(createElement('span'));
						otherTitle.appendChild(createText(elem.name));
					}
				}

				// Image
				const imageCell = row.insertCell(-1);
				const image = imageCell.appendChild(createElement('img'));
				image.src = "../images/" + titleData.image;

				// Youtube
				const youtubeCell = row.insertCell(-1);
				const youtube = youtubeCell.appendChild(createElement("iframe"));
				youtube.width = "500";
				youtube.height = "180";
				youtube.frameBorder = "0";
				youtube.src = str_YouPath + ary_SongData[i][TRACK_YOUTUBE_ID];
				
				// Title name
				const titleName = row.insertCell(-1);
				titleName.appendChild(createText(titleData.shortName));

				// Abbreviation
				const abbrev = row.insertCell(-1);
				abbrev.appendChild(createText(titleData.abbrev));

				// Stage
				const stage = row.insertCell(-1);
				stage.appendChild(createText(ary_SongData[i][TRACK_DESCRIPTION]));

				// Is arrange
				const isArrange = row.insertCell(-1);
				if (ary_SongData[i][TRACK_IS_ARRANGEMENT] == ARRANGED_TRACK)
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
				if (ary_SongData[i][TRACK_TYPE] == OTHER_THEME)
				{
					bossStage.appendChild(createText("Any/All"));
					bossStage.style = "background-color: rgb(250, 100,100)";
				}
				else if (ary_SongData[i][TRACK_TYPE] == BOSS_THEME)
				{
					bossStage.appendChild(createText("Boss"));
					bossStage.style = "background-color: rgb(100, 250,100)";
				}
				else if (ary_SongData[i][TRACK_TYPE] == STAGE_THEME)
				{
					bossStage.appendChild(createText("Stage"));
					bossStage.style = "background-color: rgb(100, 100,250)";
				}
				else if (ary_SongData[i][TRACK_TYPE] == STAGE_AND_BOSS_THEME)
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
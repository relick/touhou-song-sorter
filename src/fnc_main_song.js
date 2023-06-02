// 2008/7/3 Scripted by K-Factory@migiwa
// 2008/7/19 Modified by  K-Factory@migiwa
// ・イラストのランダム化
// ・BugFix
// 2008/7/25 Modified by  K-Factory@migiwa
// ・ランキングにイラスト表示
// ・メンテナンス用PG追加
// ・BugFix
// 2009/1/27 Modified by  K-Factory@migiwa
// ・絵の表示ON/OFF追加
// ・高速化処理追加
// 2009/9/8 Modified by  K-Factory@migiwa
// ・タイトル分類の変更
// 2013/1/22 Modified by Anonymous
// added undo function (requires minor changes in index.html and fnc_data.js)
// 2015/7/3 Modified by Relick
// added save/load function
// 2018/11/26 Added to relick's github, changes tracked there
// github.com/relick/touhou-song-sorter

// Execution code
"use strict";
var ary_TempData	= new Array();
var ary_SortData	= new Array();
var ary_ParentData = new Array();
var ary_EqualData  = new Array();
var int_LeftList,  int_LeftID;
var int_RightList, int_RightID;
var ary_RecordData = new Array();
var int_RecordID = 0;

var popup_TrackRank = new Array(); // Ranking #
var popup_TrackName = new Array(); // Displayed name

var int_Count = 0;
var int_Total = 0;
var int_Completed = 0;
var int_Status = 0;
var sGaugeID = "gauge";
var iGM = 100;

var back_ary_SortData = new Array();
var back_ary_EqualData = new Array();
var back_ary_RecordData = new Array();
var back_int_RecordID = 0;
var back_ary_ParentData = new Array();

var back_int_Completed = 0;
var back_int_Total = 0;
var back_int_RightList = int_RightList;
var back_int_RightID = int_RightID;
var back_int_LeftList = int_LeftList;
var back_int_LeftID = int_LeftID;
var maxRows = 42;

var displayType = false;

// Serialisation version
const SAVE_VERSION = Object.freeze({
	Old: 0, // Old simple saving (no version tracked but we check if int_Total exists)
	InitialTidying: 1, // Added versioning and slightly tidied ary_SongData
});

function fnc_GetSavedDataVersion() {
	const version = $.jStorage.get("TohoSongSorter_saveVersion");
	if (version) {
		return version;
	}

	const hasOldData = $.jStorage.get("TohoSongSorter_int_Total") !== null;
	if (hasOldData) {
		return SAVE_VERSION.Old;
	}

	return null;
}

// *****************************************************************************
// * Executed on page load
function startup()
{
	// Initialise load button if data available
	if (fnc_GetSavedDataVersion() !== null) {
		setClass(getID('fldMiddleL'), null); // Remove 'inactive' class
	}

	const div_Select = getID('optSelectList');

	// Add Select All
	{
		const div_Foot = createElement('div');
		div_Select.appendChild(div_Foot);
		setClass(div_Foot, "opt_foot");

		const new_CheckBox = createElement('input');
		const new_CheckBoxID = 'optSelect_all';
		new_CheckBox.setAttribute('type', 'checkbox', 0);
		new_CheckBox.setAttribute('checked', 'true', 0);
		new_CheckBox.value = "All";
		new_CheckBox.title = "All boxes are checked/unchecked at the same time.";
		new_CheckBox.id = new_CheckBoxID;
		new_CheckBox.onclick = function () { chgAll(); }
		div_Foot.appendChild(new_CheckBox);

		const new_label = createElement('label');
		new_label.setAttribute('for', new_CheckBoxID);
		new_label.appendChild(createText("Select All"));
		div_Foot.appendChild(new_label);
	}

	// Make the checkbox list for titles
	let titlesShown = 0;
	for (const category of Object.values(CATEGORY)) {
		const h1_Category = createElement('h1');
		h1_Category.innerHTML = category.name;
		div_Select.appendChild(h1_Category);

		const div_Titles = createElement('div');
		setClass(div_Titles, 'categoryList');
		div_Select.appendChild(div_Titles);

		for (let i = 0; i < category.titles.length; i++) {
			const titleID = category.titles[i];
			const title = TITLE[titleID];

			const div_Item = createElement('div');
			div_Titles.appendChild(div_Item);

			const new_CheckBox = createElement('input');
			const new_CheckBoxID = 'optSelect' + titleID;
			new_CheckBox.setAttribute('type', 'checkbox', 0);
			new_CheckBox.setAttribute('checked', 'true', 0);
			new_CheckBox.value = title.name;
			new_CheckBox.title = title.name;
			new_CheckBox.id = new_CheckBoxID;
			div_Item.appendChild(new_CheckBox);

			const new_label = createElement('label');
			new_label.appendChild(createText(title.name));
			new_label.title = title.name;
			new_label.setAttribute('for', new_CheckBoxID);
			setClass(new_label, 'cbox');
			div_Item.appendChild(new_label);
			titlesShown++;
		}
	}

	if (titlesShown !== Object.keys(TITLE).length) {
		alert("Missing title IDs from categories");
	}

	getID('optImage').disabled = false;
	getID('optArrange').disabled = false;

	createGauge("GaGprog", sGaugeID);
}

function chgAll()
{
	for (const titleId in TITLE)
	{
		getID('optSelect' + titleId).checked = getID('optSelect_all').checked;
	}
}

// *****************************************************************************
// * Initialise arrays and counters that will be used for sorting
// * Only happens once
function init()
{
	int_Total = 0;
	int_RecordID = 0;
	var arranges = getID('optArrange').checked;
	var sortTypes = getID('optSortType').options[getID('optSortType').selectedIndex].value;

	// Add to the arrays only the tracks that we expect.
	let selectionSet = new Set();
	for (const [titleId, title] of Object.entries(TITLE)) {
		if (getID('optSelect' + titleId).checked) {
			selectionSet.add(title);
		}
	}

	for (let i = 0; i < ary_SongData.length; i++) {
		// Include only if a track is:
		// - In a title we selected (already fulfilled)
		// - Not excluded by being the incorrect track type for what was selected
		// - Not excluded by being an arrange if disabled

		if (anyIntersection(ary_SongData[i][TRACK_TITLES], selectionSet)) {
			const correctTrackType = (
				sortTypes == 0 // Allow everything
				|| (sortTypes == 1 && ary_SongData[i][TRACK_TYPE] !== OTHER_THEME) // Boss and stage only
				|| (sortTypes == 2 && ary_SongData[i][TRACK_TYPE] === BOSS_THEME) // Boss only
				|| (sortTypes == 3 && ary_SongData[i][TRACK_TYPE] === STAGE_THEME) // Stage only
				|| ary_SongData[i][TRACK_TYPE] === STAGE_AND_BOSS_THEME // Included in all options
			);
			const correctArrangementType = arranges || (ary_SongData[i][TRACK_IS_ARRANGEMENT] === ORIGINAL_TRACK);

			if (correctTrackType && correctArrangementType) {
				ary_TempData[int_Total] = ary_SongData[i];
				int_Total++;
			}
		}
	}

	if (int_Total < 2)
	{
		alert("Please make a larger selection.");
		return;
	}
	
	// We're ready, disable all options
	for (const titleId in TITLE)
	{
		getID('optSelect' + titleId).disabled = true;
	}
	getID('optSelect_all').disabled = true;
	$('.opt_foot').hide();
	getID('optImage').disabled = true;
	getID('optArrange').disabled = true;
	setClass(getID('optSelectList'), 'optSelectList-disabled');

	// And enable save visual
	setClass(getID('fldMiddleS'), null);

	int_Total = 0;

	// TempData contains the songs we want to sort, store it into our sorting arrays.
	ary_SortData[0] = new Array();
	for (let i=0; i < ary_TempData.length; i++)
	{
		ary_SortData[0][i] = i;

		// Array for battle results
		ary_RecordData[i] = 0;
	}

	var int_Pointer = 1;
	for (let i=0; i < ary_SortData.length; i++)
	{
		// The sort is a binary sort
		// So to start, if the number of elements is more than 2,
		// Keep dividing until all separated.
		if (ary_SortData[i].length >= 2)
		{
			var int_Marker = Math.ceil(ary_SortData[i].length / 2);
			ary_SortData[int_Pointer] = ary_SortData[i].slice(0, int_Marker);
			int_Total += ary_SortData[int_Pointer].length;
			ary_ParentData[int_Pointer] = i;
			int_Pointer++;

			ary_SortData[int_Pointer] = ary_SortData[i].slice(int_Marker, ary_SortData[i].length);
			int_Total += ary_SortData[int_Pointer].length;
			ary_ParentData[int_Pointer] = i;
			int_Pointer++;
		}
	}

	// A list to save ties
	// Key: link start point
	// Value: link end point
	for (let i=0; i<=ary_TempData.length; i++)
	{
		ary_EqualData[i] = -1;
	}

	int_LeftList  = ary_SortData.length - 2;
	int_RightList = ary_SortData.length - 1;
	int_LeftID	= 0;
	int_RightID	= 0;
	int_Count	 = 1;
	int_Completed = 0;

	// Initialisation complete, set status to 1
	int_Status	= 1;

	getID('fldMiddleT').innerHTML = str_CenterT;
	getID('fldMiddleB').innerHTML = str_CenterB;

	fnc_ShowData();
}

// Save and load is super dumb, literally just throw all the working data into local storage.
// At least an advantage of this is, changing the data doesn't affect old in-progress sorts.
// At the same time, it means someone with old data doesn't get bug fixes.
function fnc_Save()
{
	if (int_Status == 0)
	{
		return;
	}

	// jStorage.set(key, data, {TTL});

	$.jStorage.set("TohoSongSorter_saveVersion", SAVE_VERSION.InitialTidying, null);

	$.jStorage.set("TohoSongSorter_ary_EqualData", ary_EqualData, null)
	$.jStorage.set("TohoSongSorter_ary_ParentData", ary_ParentData, null)
	$.jStorage.set("TohoSongSorter_ary_RecordData", ary_RecordData, null)
	$.jStorage.set("TohoSongSorter_ary_SortData", ary_SortData, null)
	$.jStorage.set("TohoSongSorter_ary_TempData", ary_TempData, null)
	
	$.jStorage.set("TohoSongSorter_back_ary_EqualData", back_ary_EqualData, null)
	$.jStorage.set("TohoSongSorter_back_ary_ParentData", back_ary_ParentData, null)
	$.jStorage.set("TohoSongSorter_back_ary_RecordData", back_ary_RecordData, null)
	$.jStorage.set("TohoSongSorter_back_ary_SortData", back_ary_SortData, null)
	$.jStorage.set("TohoSongSorter_back_int_Completed", back_int_Completed, null)
	
	$.jStorage.set("TohoSongSorter_back_int_LeftID", back_int_LeftID, null)
	$.jStorage.set("TohoSongSorter_back_int_LeftList", back_int_LeftList, null)
	$.jStorage.set("TohoSongSorter_back_int_RecordID", back_int_RecordID, null)
	$.jStorage.set("TohoSongSorter_back_int_RightID", back_int_RightID, null)
	$.jStorage.set("TohoSongSorter_back_int_RightList", back_int_RightList, null)
	
	$.jStorage.set("TohoSongSorter_back_int_Total", back_int_Total, null)
	$.jStorage.set("TohoSongSorter_int_Completed", int_Completed, null)
	$.jStorage.set("TohoSongSorter_int_Count", int_Count, null)
	$.jStorage.set("TohoSongSorter_int_LeftID", int_LeftID, null)
	$.jStorage.set("TohoSongSorter_int_LeftList", int_LeftList, null)
	
	$.jStorage.set("TohoSongSorter_int_RecordID", int_RecordID, null)
	$.jStorage.set("TohoSongSorter_int_RightID", int_RightID, null)
	$.jStorage.set("TohoSongSorter_int_RightList", int_RightList, null)
	$.jStorage.set("TohoSongSorter_int_Status", int_Status, null)
	$.jStorage.set("TohoSongSorter_int_Total", int_Total, null)

	// Successfully saved, enable load button (if not already)
	setClass(getID('fldMiddleL'), null);
}

function fnc_Load()
{
	const saveVersion = fnc_GetSavedDataVersion();

	if (saveVersion !== null)
	{
		if (int_Status == 0)
		{
			fnc_Sort(0);
		}
		
		$.jStorage.reInit()

		// jStorage.get(key, default value)

		ary_EqualData = $.jStorage.get("TohoSongSorter_ary_EqualData");
		ary_ParentData = $.jStorage.get("TohoSongSorter_ary_ParentData");
		ary_RecordData = $.jStorage.get("TohoSongSorter_ary_RecordData");
		ary_SortData = $.jStorage.get("TohoSongSorter_ary_SortData");
		ary_TempData = $.jStorage.get("TohoSongSorter_ary_TempData");
		
		back_ary_EqualData = $.jStorage.get("TohoSongSorter_back_ary_EqualData");
		back_ary_ParentData = $.jStorage.get("TohoSongSorter_back_ary_ParentData");
		back_ary_RecordData = $.jStorage.get("TohoSongSorter_back_ary_RecordData");
		back_ary_SortData = $.jStorage.get("TohoSongSorter_back_ary_SortData");
		back_int_Completed = $.jStorage.get("TohoSongSorter_back_int_Completed");
		
		back_int_LeftID = $.jStorage.get("TohoSongSorter_back_int_LeftID");
		back_int_LeftList = $.jStorage.get("TohoSongSorter_back_int_LeftList");
		back_int_RecordID = $.jStorage.get("TohoSongSorter_back_int_RecordID");
		back_int_RightID = $.jStorage.get("TohoSongSorter_back_int_RightID");
		back_int_RightList = $.jStorage.get("TohoSongSorter_back_int_RightList");
		
		back_int_Total = $.jStorage.get("TohoSongSorter_back_int_Total");
		int_Completed = $.jStorage.get("TohoSongSorter_int_Completed");
		int_Count = $.jStorage.get("TohoSongSorter_int_Count");
		int_LeftID = $.jStorage.get("TohoSongSorter_int_LeftID");
		int_LeftList = $.jStorage.get("TohoSongSorter_int_LeftList");
		
		int_RecordID = $.jStorage.get("TohoSongSorter_int_RecordID");
		int_RightID = $.jStorage.get("TohoSongSorter_int_RightID");
		int_RightList = $.jStorage.get("TohoSongSorter_int_RightList");
		int_Status = $.jStorage.get("TohoSongSorter_int_Status");
		int_Total = $.jStorage.get("TohoSongSorter_int_Total");
		
		if (saveVersion < SAVE_VERSION.InitialTidying)
		{
			// Removes the 'unused' data at the start of each entry
			for (let i = 0; i < ary_TempData.length; i++) {
				ary_TempData[i].shift();
			}
		}

		fnc_ShowData();
	}
}

// Undo previous choice
function fnc_Undo()
{
	if (int_Status == 0)
	{
		fnc_Sort(0);
		return;
	}
	
	if(int_Count > 2 && int_Completed != back_int_Completed)
	{
		ary_SortData = back_ary_SortData.slice(0);
		ary_RecordData = back_ary_RecordData.slice(0);
		int_RecordID = back_int_RecordID;
		ary_EqualData = back_ary_EqualData.slice(0);
		ary_ParentData = back_ary_ParentData.slice(0);
		
		int_Completed = back_int_Completed;
		int_Count = int_Count - 2;
		int_Total = back_int_Total;
		int_RightList = back_int_RightList;
		int_RightID = back_int_RightID;
		int_LeftList = back_int_LeftList;
		int_LeftID = back_int_LeftID;
		int_Status = (int_LeftList < 0) ? 2 : 1;

		fnc_ShowData();
	}
}

// Debugging purposes (simulates choosing Tie until completion)
function fnc_TieRest(){
	while(int_Status < 2){
		fnc_Sort(0);
	}
}


// *****************************************************************************
// * Sort (-1: left chosen, 0: tie, 1: right chosen)
function fnc_Sort(int_SelectID)
{
	back_ary_SortData = ary_SortData.slice(0);
	back_ary_RecordData = ary_RecordData.slice(0);
	back_int_RecordID = int_RecordID;
	back_ary_EqualData = ary_EqualData.slice(0);
	back_ary_ParentData = ary_ParentData.slice(0);
	
	back_int_Completed = int_Completed;
	back_int_Total = int_Total;
	back_int_RightList = int_RightList;
	back_int_RightID = int_RightID;
	back_int_LeftList = int_LeftList;
	back_int_LeftID = int_LeftID;
	
	// If we haven't started sorting yet, or we're done, don't do a sorting action
	// Instead (maybe initialise then) return 
	switch (int_Status)
	{
	case 0:
	{
		// Do sort initialisation.
		init();
	}
	case 2:
	{
		// Sorting is complete, don't do any more.
		return;
	}
	default:
	}

	// Save to ary_RecordData
	// Left count
	if (int_SelectID != 1)
	{
		fnc_CountUp(0);
		while (ary_EqualData[ary_RecordData[int_RecordID-1]] != -1)
		{
			fnc_CountUp(0);
		}
	}

	// Only in case of draw
	if (int_SelectID == 0)
	{
		ary_EqualData[ary_RecordData[int_RecordID-1]] = ary_SortData[int_RightList][int_RightID];
	}

	// Right count
	if (int_SelectID != -1)
	{
		fnc_CountUp(1);
		while (ary_EqualData[ary_RecordData[int_RecordID-1]] != -1)
		{
			fnc_CountUp(1);
		}
	}

	// 片方のリストを走査し終えた後の処理
	if (int_LeftID < ary_SortData[int_LeftList].length && int_RightID == ary_SortData[int_RightList].length)
	{
		// リストint_RightListが走査済 - リストint_LeftListの残りをコピー
		while (int_LeftID < ary_SortData[int_LeftList].length)
		{
			fnc_CountUp(0);
		}
	}
	else if (int_LeftID == ary_SortData[int_LeftList].length && int_RightID < ary_SortData[int_RightList].length)
	{
		// リストint_LeftListが走査済 - リストint_RightListの残りをコピー
		while (int_RightID < ary_SortData[int_RightList].length)
		{
			fnc_CountUp(1);
		}
	}

	//両方のリストの最後に到達した場合は
	//親リストを更新する
	if (int_LeftID == ary_SortData[int_LeftList].length && int_RightID == ary_SortData[int_RightList].length)
	{
		for (let i=0; i<ary_SortData[int_LeftList].length + ary_SortData[int_RightList].length; i++)
		{
			ary_SortData[ary_ParentData[int_LeftList]][i] = ary_RecordData[i];
		}

		ary_SortData.pop();
		ary_SortData.pop();
		int_LeftList  = int_LeftList - 2;
		int_RightList = int_RightList - 2;
		int_LeftID	= 0;
		int_RightID	= 0;

		//新しい比較を行う前にary_RecordDataを初期化
		if (int_LeftID == 0 && int_RightID == 0)
		{
			for (let i=0; i<ary_TempData.length; i++)
			{
				ary_RecordData[i] = 0;
			}
			int_RecordID = 0;
		}
	}

	// Completion check
	int_Status = (int_LeftList < 0) ? 2 : 1;

	fnc_ShowData();
}

// *****************************************************************************
// * CountUp(0: left side 1: right side)
// * Count up the selected side
function fnc_CountUp(int_Select)
{
	ary_RecordData[int_RecordID] = ary_SortData[((int_Select == 0) ? int_LeftList : int_RightList)][((int_Select == 0) ? int_LeftID : int_RightID)];

	if (int_Select == 0)
	{
		int_LeftID++;
	}
	else
	{
		int_RightID++;
	}

	int_RecordID++;
	int_Completed++;
}

function fnc_ShowResults()
{
	var int_Result = 1;

	// Create first table
	var tbl_Result = createElement('table');
	tbl_Result.classList.add('resTable');

	// Add headings
	var tbl_head_Result = createElement('thead');
	tbl_Result.appendChild(tbl_head_Result);

	let new_row = tbl_head_Result.insertRow(tbl_head_Result.rows.length);

	// Col[0]
	let new_cell = new_row.insertCell(new_row.childNodes.length);
	setClass(new_cell, 'resTableH');
	new_cell.appendChild(createText('Order'));
	// Col[1]
	new_cell = new_row.insertCell(new_row.childNodes.length);
	setClass(new_cell, 'resTableH');
	new_cell.appendChild(createText('Name'));

	// Create body
	var tbl_body_Result = createElement('tbody');
	tbl_Result.appendChild(tbl_body_Result);

	// Keep track of # of tied entries so we can give them the same rank.
	var int_Same = 1;

	var obj_SelectItem = getID("resultField");
	obj_SelectItem.innerHTML = "";
	obj_SelectItem.appendChild(tbl_Result);

	for (let i=0; i < ary_TempData.length; i++)
	{
		var rowId = i;
		new_row = tbl_body_Result.insertRow(tbl_body_Result.rows.length);

		// Col[0] - rank
		new_cell = new_row.insertCell(new_row.childNodes.length);
		setClass(new_cell, 'resTableL');
		new_cell.appendChild(createText(int_Result));
		
		popup_TrackRank[i] = int_Result; // for popup window
		
		// Col[1] - image (sometimes) + name
		new_cell = new_row.insertCell(new_row.childNodes.length);
		setClass(new_cell, 'resTableR');

		var obj_TempData = ary_TempData[ary_SortData[0][i]];

		// Image
		if (i < int_ResultRank) {
			var new_img = createElement('img');
			if (obj_TempData[TRACK_IMAGE].length > 0) {
				new_img.src = str_ImgPath + obj_TempData[TRACK_IMAGE];
				new_cell.appendChild(new_img);
				new_cell.appendChild(createElement('br'));
			}
		}

		// Name
		var textForEntry = "";
		if (!displayType)
		{
			textForEntry = obj_TempData[TRACK_NAME] + " (" + obj_TempData[TRACK_TITLE_ABBREV] + ")";
		}
		else
		{
			textForEntry = obj_TempData[TRACK_DESCRIPTION] + " (" + obj_TempData[TRACK_TITLE_ABBREV] + ")";
		}
		new_cell.appendChild(createText(textForEntry));
		popup_TrackName[i] = textForEntry; // for popup window

		// Increase rank or keep the same if a tie.
		if (i < ary_TempData.length - 1) {
			if (ary_EqualData[ary_SortData[0][i]] == ary_SortData[0][i + 1]) {
				int_Same++;
			} else {
				int_Result += int_Same;
				int_Same = 1;
			}
		}

		// Break up results into a new table after every [maxRows] results,
		// or at the transition point between image and imageless results.
		// Do not break in the middle of image results.
		//var cutoff = int_ResultRank - 1
		var cutoff = 9
		if (rowId >= cutoff &&
				rowId == cutoff ||
				(rowId - cutoff) % maxRows == 0) {

				tbl_Result = createElement('table');
				tbl_Result.classList.add('resTable');
				tbl_body_Result = createElement('tbody');
				tbl_Result.appendChild(tbl_body_Result);
				obj_SelectItem.appendChild(tbl_Result);
		}
	}

	// TODO: If want to disable sort buttons, do that here.
	getID("ranTable").style.display = 'inline';

	// swap display type for next display call
	displayType = !displayType;
}

function fnc_UpdateOptions()
{
	for (let i = 0; i < 2; i++)
	{
		var obj_SelectItem = getID((i == 0) ? "fldLeft" : "fldRight");
		var obj_YoutubeItem = getID((i == 0) ? "youLeft" : "youRight");
		var obj_TexItem = getID((i == 0) ? "texLeft" : "texRight");
		var obj_TempData = ary_TempData[ary_SortData[(i == 0)  ? int_LeftList : int_RightList][(i == 0)  ? int_LeftID : int_RightID]];
		
		if(getID('optImage').checked)
		{
			//youtube
			if(obj_TempData[TRACK_YOUTUBE_ID] != "na")
			{
				var obj_Item = createElement("iframe");
				obj_Item.width = "180";
				obj_Item.height = "180";
				obj_Item.frameBorder = "0";
				obj_Item.src = str_YouPath + obj_TempData[TRACK_YOUTUBE_ID];
				obj_SelectItem.replaceChild(obj_Item, obj_SelectItem.firstChild);
			}
			else
			{
				var obj_Item = createElement("img");
				obj_Item.src = str_ImgPath + obj_TempData[TRACK_IMAGE];
				obj_Item.title = obj_TempData[TRACK_NAME];
				obj_SelectItem.replaceChild(obj_Item, obj_SelectItem.firstChild);
			}
		}
		else
		{
			//image
			var obj_Item = createElement("img");
			obj_Item.src = str_ImgPath + obj_TempData[TRACK_IMAGE];
			obj_Item.title = obj_TempData[TRACK_NAME];
			obj_SelectItem.replaceChild(obj_Item, obj_SelectItem.firstChild);
			
			if(obj_TempData[TRACK_YOUTUBE_ID] != "na")
			{
				var obj_Item = createElement("a");
				obj_Item.href = str_YouLink + obj_TempData[TRACK_YOUTUBE_ID];
				obj_Item.target = "_blank";
				obj_Item.appendChild(createText("Listen!"));
				obj_YoutubeItem.replaceChild(obj_Item, obj_YoutubeItem.firstChild);
			}
			else
			{
				var obj_Item = createElement("span");
				obj_Item.appendChild(createText(""));
				obj_YoutubeItem.replaceChild(obj_Item, obj_YoutubeItem.firstChild);
			}
		}
		
		var obj_Item = createElement("span");
		obj_Item.id = (i == 0) ? "nameLeft" : "nameRight";
		obj_Item.appendChild(createText(obj_TempData[TRACK_NAME]));
		obj_TexItem.replaceChild(obj_Item, obj_TexItem.childNodes[0]);
		
		var obj_Item = createElement("span");
		obj_Item.id = (i == 0) ? "gameLeft" : "gameRight";
		obj_Item.appendChild(createText(obj_TempData[TRACK_TITLE_NAME]));
		obj_TexItem.replaceChild(obj_Item, obj_TexItem.childNodes[2]);
		
		var obj_Item = createElement("span");
		obj_Item.id = (i == 0) ? "detailLeft" : "detailRight";
		obj_Item.appendChild(createText(obj_TempData[TRACK_DESCRIPTION]));
		obj_TexItem.replaceChild(obj_Item, obj_TexItem.childNodes[5]);
	}

	int_Count++;
}

// *****************************************************************************
// * ShowData
// * Show progress, next battle, and results
function fnc_ShowData()
{
	// Update undo display
	setClass(getID('fldMiddleB'), int_Completed === back_int_Completed ? 'inactive' : null);

	getID("lblCount").innerHTML = int_Count + " (Possibly " + (int_Total - int_Completed) + " remaining)";
	getID("lblProgress").innerHTML = Math.floor(int_Completed * 100 / int_Total);
	refreshGauge(sGaugeID, int_Completed * 100 / int_Total);

	if (int_Status == 2)
	{
		// Sort is complete, show results
		fnc_ShowResults();
	}
	else
	{
		// Sort is incomplete, update options
		fnc_UpdateOptions();
	}
}

# touhou-song-sorter
manually merge sort your favourite touhou songs

## Developer notes

All of the song data is found at [src/fnc_data_song.js](./src/fnc_data_song.js), defined in the array `ary_CharacterData`. Each song's data is an array with a specific number of elements; for example:

```json
[1, "The Sky Where Cherry Blossoms Flutter Down", [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "hsifs.png", "3B207i_YzE0", "Hidden Star in Four Seasons", "HSiFS", "Title Screen", 0, 0]
```

The elements, in order, are as follows:

1. Nothing useful, but we just have `1` here by convention.
2. Song title.
3. A 1:1 mapping to `ary_TitleData`. If the element at index `i` is 1, then it belongs to the game/album with the title `ary_TitleData[i]`.
4. The filename within the `images/` folder for the game/album to which the song belongs.
5. YouTube video ID.
6. Game/album full title.
7. Game/album abbreviated title.
8. Where the song plays, or whose theme it is.
9. `0` if original song, `1` if arrangement.
10. `1` if a boss-only theme, `2` if a stage-only theme, `3` if both, or `0` otherwise.

### Adding new games/albums

* Add its title to `ary_TitleData`.
* Add its image to the [images](./images/) folder (180x180 preferably).

The data storage is currently suboptimal, and thus every single song's data array is required to change whenever a new game/album is added.

If we wish to add a new game, then a `0` element must be appended to the large integer array of that song, and for each song that belongs to the new game, its integer array must have the same number of items as the other songs, and the last item of that array must be `1`.

Because of the massive number of lines that must be changed in this process, manually updating them is tedious, so there are some Bash commands that can save a lot of time; however, they require the integer arrays to be in a consistent format.

How to add something:
* between the 3rd and 4th games/albums: `sed -E -i '' 's/(\[([01],){3})/\10,/g' src/fnc_data_song.js`
* between the 6th and 7th _last_ games/albums: `sed -E -i '' 's/((,[01]){6}\])/,0\1/g' src/fnc_data_song.js`
* to the end of the list of games/albums: `sed -E -i '' 's/(\[([01]+,)+[01]+)\]/\1,0]/g' src/fnc_data_song.js`

Then, finally add the new song data.

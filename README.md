# Touhou Song Sorter
A fun way to manually merge sort a looot of music to make a song ranking.

## Developer notes

All of the song data is found at [src/fnc_data_song.js](./src/fnc_data_song.js), defined in the array `ary_SongData`. Each song's data is an array with a specific number of elements; for example:

```js
["The Sky Where Cherry Blossoms Flutter Down", new Set([TITLE.HSiFS]), { title: "HSiFS", }, "3B207i_YzE0", "Title Screen", ORIGINAL_TRACK, OTHER_THEME]
```

The elements, in order, are as follows:

0. Track name.
1. A set containing IDs of the titles that the track appears in
2. An object specifying which title data to use when displaying this track.
3. YouTube video ID.
4. Where the track plays, or whose theme it is.
5. `ORIGINAL_TRACK` if this is the original release of the track, `ARRANGED_TRACK` if the track is rearranged from an earlier release.
6. `STAGE_THEME` if a stage-only theme, `BOSS_THEME` if a boss-only theme, `STAGE_AND_BOSS_THEME` if both, or `OTHER_THEME` otherwise.

### Adding new games/albums

* Add its title and related data to `TITLE`.
* Add its image to the [images](./images/) folder (180x180 preferably).
* Add its tracks to the end of `ary_SongData` in the above format
